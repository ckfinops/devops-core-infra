import axios from 'axios';

class CloudDataService {
  constructor() {
    this.baseURL = import.meta.env?.VITE_API_BASE_URL || 'https://api.your-finops-service.com';
    this.retryCount = 3;
    this.retryDelay = 1000;
    this.isDevMode = import.meta.env?.DEV || !import.meta.env?.VITE_API_BASE_URL?.includes('api.');
    this.hasApiConnection = false;
    this.connectionCache = null;
    this.connectionCacheTime = null;
  }

  // Test API connectivity on first call
  async testApiConnection() {
    if (this.isDevMode) {
      return false;
    }

    try {
      const response = await axios?.get(`${this.baseURL}/health`, { timeout: 5000 });
      this.hasApiConnection = true;
      return true;
    } catch (error) {
      this.hasApiConnection = false;
      console.info('API not available, using development mode with mock data');
      return false;
    }
  }

  // Enhanced connection status with connection state persistence
  async getConnectionStatus() {
    // Cache connection status for 30 seconds to reduce API calls
    const now = Date.now();
    if (this.connectionCache && this.connectionCacheTime && (now - this.connectionCacheTime < 30000)) {
      return this.connectionCache;
    }

    // In dev mode or when API is unavailable, check localStorage for simulated connections
    if (this.isDevMode || !this.hasApiConnection) {
      if (!this.hasApiConnection && !this.isDevMode) {
        await this.testApiConnection();
      }
      
      // Check localStorage for simulated connection status (for demo purposes)
      const storedConnections = localStorage.getItem('finops-cloud-connections');
      if (storedConnections) {
        try {
          const connections = JSON.parse(storedConnections);
          this.connectionCache = connections;
          this.connectionCacheTime = now;
          return connections;
        } catch (error) {
          console.warn('Invalid stored connections data');
        }
      }
      
      const defaultStatus = {
        aws: { 
          connected: false, 
          status: 'not_configured',
          error: null,
          message: 'Ready to configure',
          lastSync: null
        },
        azure: { 
          connected: false, 
          status: 'not_configured',
          error: null,
          message: 'Ready to configure',
          lastSync: null
        },
        gcp: { 
          connected: false, 
          status: 'not_configured',
          error: null,
          message: 'Ready to configure',
          lastSync: null
        }
      };
      
      this.connectionCache = defaultStatus;
      this.connectionCacheTime = now;
      return defaultStatus;
    }

    try {
      const response = await axios?.get(`${this.baseURL}/connections/status`);
      const connectionData = response?.data;
      this.connectionCache = connectionData;
      this.connectionCacheTime = now;
      return connectionData;
    } catch (error) {
      console.error('Failed to get connection status:', error);
      const errorStatus = {
        aws: { connected: false, error: 'Connection check failed', status: 'error' },
        azure: { connected: false, error: 'Connection check failed', status: 'error' },
        gcp: { connected: false, error: 'Connection check failed', status: 'error' }
      };
      this.connectionCache = errorStatus;
      this.connectionCacheTime = now;
      return errorStatus;
    }
  }

  // Store connection status locally (for demo purposes)
  setConnectionStatus(provider, connectionData) {
    try {
      const storedConnections = localStorage.getItem('finops-cloud-connections');
      const connections = storedConnections ? JSON.parse(storedConnections) : {};
      
      connections[provider] = {
        ...connectionData,
        lastSync: new Date()?.toISOString()
      };
      
      localStorage.setItem('finops-cloud-connections', JSON.stringify(connections));
      
      // Clear cache to force refresh
      this.connectionCache = null;
      this.connectionCacheTime = null;
      
      return true;
    } catch (error) {
      console.error('Failed to store connection status:', error);
      return false;
    }
  }

  async getAWSCostData(options = {}) {
    const { timeRange = '30d', granularity = 'DAILY' } = options;
    
    // Check if AWS is actually connected
    const connectionStatus = await this.getConnectionStatus();
    const awsConnected = connectionStatus?.aws?.connected;
    
    // Return mock data in dev mode or if AWS is not connected
    if (this.isDevMode || !this.hasApiConnection || !awsConnected) {
      return this.getMockAWSCostData();
    }
    
    try {
      const response = await axios?.get(`${this.baseURL}/aws/costs`, {
        params: {
          timeRange,
          granularity,
          groupBy: ['SERVICE'],
          metrics: ['BlendedCost', 'UnblendedCost']
        },
        timeout: 30000
      });

      return {
        success: true,
        data: response?.data,
        timestamp: new Date()?.toISOString(),
        source: 'api'
      };
    } catch (error) {
      console.error('AWS cost data fetch failed:', error);
      return {
        success: false,
        error: error?.response?.data?.message || error?.message || 'Failed to fetch AWS data',
        data: null,
        source: 'error'
      };
    }
  }

  async getMultiCloudCostData(options = {}) {
    const { timeRange = '30d' } = options;
    
    // Check which providers are actually connected
    const connectionStatus = await this.getConnectionStatus();
    const awsConnected = connectionStatus?.aws?.connected;
    const azureConnected = connectionStatus?.azure?.connected;
    const gcpConnected = connectionStatus?.gcp?.connected;
    
    // Return mock data in dev mode or when no providers are connected
    if (this.isDevMode || !this.hasApiConnection || (!awsConnected && !azureConnected && !gcpConnected)) {
      return this.getMockMultiCloudData();
    }
    
    try {
      // Only fetch data from connected providers
      const promises = [];
      if (awsConnected) promises?.push(this.getAWSCostData({ timeRange }));
      if (azureConnected) promises?.push(this.getAzureCostData({ timeRange }));
      if (gcpConnected) promises?.push(this.getGCPCostData({ timeRange }));

      const results = await Promise.allSettled(promises);

      return {
        success: true,
        data: {
          aws: awsConnected && results?.[0]?.status === 'fulfilled' ? results?.[0]?.value : null,
          azure: azureConnected && results?.[1]?.status === 'fulfilled' ? results?.[1]?.value : null,
          gcp: gcpConnected && results?.[2]?.status === 'fulfilled' ? results?.[2]?.value : null
        },
        timestamp: new Date()?.toISOString(),
        source: 'api'
      };
    } catch (error) {
      console.error('Multi-cloud data fetch failed:', error);
      return {
        success: false,
        error: 'Failed to fetch multi-cloud data',
        data: null,
        source: 'error'
      };
    }
  }

  async getAzureCostData(options = {}) {
    const { timeRange = '30d' } = options;
    
    if (this.isDevMode || !this.hasApiConnection) {
      return this.getMockAzureCostData();
    }
    
    try {
      const response = await axios?.get(`${this.baseURL}/azure/costs`, {
        params: { timeRange },
        timeout: 30000
      });

      return {
        success: true,
        data: response?.data,
        timestamp: new Date()?.toISOString()
      };
    } catch (error) {
      console.error('Azure cost data fetch failed:', error);
      return {
        success: false,
        error: error?.response?.data?.message || error?.message || 'Failed to fetch Azure data',
        data: null
      };
    }
  }

  async getGCPCostData(options = {}) {
    const { timeRange = '30d' } = options;
    
    if (this.isDevMode || !this.hasApiConnection) {
      return this.getMockGCPCostData();
    }
    
    try {
      const response = await axios?.get(`${this.baseURL}/gcp/costs`, {
        params: { timeRange },
        timeout: 30000
      });

      return {
        success: true,
        data: response?.data,
        timestamp: new Date()?.toISOString()
      };
    } catch (error) {
      console.error('GCP cost data fetch failed:', error);
      return {
        success: false,
        error: error?.response?.data?.message || error?.message || 'Failed to fetch GCP data',
        data: null
      };
    }
  }

  async getCostAnomalies() {
    if (this.isDevMode || !this.hasApiConnection) {
      return this.getMockAnomalies();
    }

    try {
      const response = await axios?.get(`${this.baseURL}/anomalies`, {
        timeout: 15000
      });

      return {
        success: true,
        data: response?.data,
        timestamp: new Date()?.toISOString()
      };
    } catch (error) {
      console.error('Cost anomalies fetch failed:', error);
      return {
        success: false,
        error: 'Failed to fetch cost anomalies',
        data: []
      };
    }
  }

  async getOptimizationRecommendations() {
    if (this.isDevMode || !this.hasApiConnection) {
      return this.getMockRecommendations();
    }

    try {
      const response = await axios?.get(`${this.baseURL}/recommendations`, {
        timeout: 15000
      });

      return {
        success: true,
        data: response?.data,
        timestamp: new Date()?.toISOString()
      };
    } catch (error) {
      console.error('Recommendations fetch failed:', error);
      return {
        success: false,
        error: 'Failed to fetch recommendations',
        data: []
      };
    }
  }

  // Enhanced mock data methods with connection-aware data
  getMockAWSCostData() {
    return {
      success: true,
      data: {
        totalCost: 12543.67,
        previousTotal: 11234.50,
        dailyBreakdown: this.generateMockDailyData(12543.67),
        serviceBreakdown: [
          { service: 'EC2', cost: 4532.12, region: 'us-east-1' },
          { service: 'RDS', cost: 2341.89, region: 'us-west-2' },
          { service: 'S3', cost: 1876.44, region: 'us-east-1' },
          { service: 'Lambda', cost: 987.65, region: 'us-east-1' },
          { service: 'CloudWatch', cost: 543.21, region: 'global' }
        ]
      },
      timestamp: new Date()?.toISOString(),
      source: 'mock'
    };
  }

  getMockAzureCostData() {
    return {
      success: true,
      data: {
        totalCost: 8765.43,
        previousTotal: 8234.12,
        dailyBreakdown: this.generateMockDailyData(8765.43),
        serviceBreakdown: [
          { service: 'Virtual Machines', cost: 3234.12, region: 'East US' },
          { service: 'Storage', cost: 1876.44, region: 'West US 2' },
          { service: 'SQL Database', cost: 2123.87, region: 'East US' },
          { service: 'App Service', cost: 765.43, region: 'Central US' },
          { service: 'Monitor', cost: 234.56, region: 'global' }
        ]
      },
      timestamp: new Date()?.toISOString(),
      source: 'mock'
    };
  }

  getMockGCPCostData() {
    return {
      success: true,
      data: {
        totalCost: 6789.23,
        previousTotal: 6123.45,
        dailyBreakdown: this.generateMockDailyData(6789.23),
        serviceBreakdown: [
          { service: 'Compute Engine', cost: 2456.78, region: 'us-central1' },
          { service: 'Cloud Storage', cost: 1543.21, region: 'us-east1' },
          { service: 'BigQuery', cost: 1789.24, region: 'us-central1' },
          { service: 'Cloud Functions', cost: 567.89, region: 'us-east1' },
          { service: 'Monitoring', cost: 123.45, region: 'global' }
        ]
      },
      timestamp: new Date()?.toISOString(),
      source: 'mock'
    };
  }

  getMockMultiCloudData() {
    return {
      success: true,
      data: {
        aws: this.getMockAWSCostData(),
        azure: this.getMockAzureCostData(),
        gcp: this.getMockGCPCostData()
      },
      timestamp: new Date()?.toISOString(),
      source: 'mock'
    };
  }

  getMockAnomalies() {
    return {
      success: true,
      data: [
        {
          id: '1',
          service: 'AWS EC2',
          anomalyType: 'cost_spike',
          description: 'Unusual cost increase in us-east-1',
          impact: 'high',
          detectedAt: new Date(Date.now() - 3600000)?.toISOString(),
          estimatedCost: 1234.56,
          severity: 'high'
        },
        {
          id: '2',
          service: 'Azure Storage',
          anomalyType: 'usage_spike',
          description: 'Storage usage 300% above normal',
          impact: 'medium',
          detectedAt: new Date(Date.now() - 7200000)?.toISOString(),
          estimatedCost: 567.89,
          severity: 'medium'
        },
        {
          id: '3',
          service: 'GCP BigQuery',
          anomalyType: 'unexpected_usage',
          description: 'Unexpected query spike during off-hours',
          impact: 'low',
          detectedAt: new Date(Date.now() - 10800000)?.toISOString(),
          estimatedCost: 234.56,
          severity: 'low'
        }
      ],
      timestamp: new Date()?.toISOString(),
      source: 'mock'
    };
  }

  getMockRecommendations() {
    return {
      success: true,
      data: [
        {
          id: '1',
          type: 'rightsizing',
          provider: 'AWS',
          title: 'Rightsize EC2 instances',
          description: 'Reduce instance sizes for underutilized resources in us-east-1',
          potentialSavings: 2340.67,
          priority: 'high',
          implementationEffort: 'low',
          category: 'compute'
        },
        {
          id: '2',
          type: 'reserved_instances',
          provider: 'Azure',
          title: 'Purchase Reserved Instances',
          description: 'Convert pay-as-you-go to reserved pricing for Virtual Machines',
          potentialSavings: 1876.43,
          priority: 'medium',
          implementationEffort: 'medium',
          category: 'compute'
        },
        {
          id: '3',
          type: 'storage_optimization',
          provider: 'GCP',
          title: 'Optimize Cloud Storage',
          description: 'Move infrequently accessed data to cheaper storage classes',
          potentialSavings: 987.65,
          priority: 'medium',
          implementationEffort: 'low',
          category: 'storage'
        }
      ],
      timestamp: new Date()?.toISOString(),
      source: 'mock'
    };
  }

  generateMockDailyData(totalCost, days = 30) {
    const dailyData = [];
    const baseDaily = totalCost / days;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date?.setDate(date?.getDate() - i);
      const variance = (Math.random() - 0.5) * 0.3; // ±15% variance
      const cost = baseDaily * (1 + variance);
      
      dailyData?.push({
        date: date?.toISOString()?.split('T')?.[0],
        cost: Math.round(cost * 100) / 100
      });
    }
    
    return dailyData;
  }

  // Utility method to get mock data when connections are not available
  getMockData() {
    return {
      keyMetrics: [
        {
          title: 'Total Monthly Spend',
          value: '$28,098',
          change: '+12.5%',
          changeType: 'negative',
          icon: 'DollarSign',
          subtitle: 'Demo data - connect providers for real data'
        },
        {
          title: 'Month-over-Month',
          value: '+$3,086',
          change: '+12.5%',
          changeType: 'negative',
          icon: 'TrendingUp',
          subtitle: 'Demo data'
        },
        {
          title: 'Budget Utilization',
          value: '78.9%',
          change: '-2.1%',
          changeType: 'positive',
          icon: 'Target',
          subtitle: 'Demo data'
        },
        {
          title: 'Cost Savings',
          value: '$8,940',
          change: '+15.3%',
          changeType: 'positive',
          icon: 'PiggyBank',
          subtitle: 'Demo data'
        }
      ],
      costTrends: this.generateMockDailyData(28098, 30)?.map((item, index) => ({
        ...item,
        all: item?.cost,
        aws: item?.cost * 0.45,
        azure: item?.cost * 0.32,
        gcp: item?.cost * 0.23,
        compute: item?.cost * 0.45,
        storage: item?.cost * 0.25,
        network: item?.cost * 0.15,
        ai: item?.cost * 0.15
      })),
      anomalies: this.getMockAnomalies()?.data,
      recommendations: this.getMockRecommendations()?.data
    };
  }

  formatCostData(rawData) {
    if (!rawData || !rawData?.data) return null;

    return {
      totalCost: rawData?.data?.totalCost || 0,
      dailyBreakdown: rawData?.data?.dailyBreakdown || [],
      serviceBreakdown: rawData?.data?.serviceBreakdown || [],
      previousPeriodComparison: rawData?.data?.previousPeriodComparison || null
    };
  }
}

export default new CloudDataService();