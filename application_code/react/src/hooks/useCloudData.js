import { useState, useEffect, useCallback } from 'react';
import cloudDataService from '../utils/cloudDataService';

export const useCloudData = (refreshInterval = 300000) => { // 5 minutes default
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connections, setConnections] = useState({
    aws: { connected: false, error: null, status: 'not_configured' },
    azure: { connected: false, error: null, status: 'not_configured' },
    gcp: { connected: false, error: null, status: 'not_configured' }
  });

  const fetchConnectionStatus = useCallback(async () => {
    try {
      const status = await cloudDataService?.getConnectionStatus();
      setConnections(status);
      return status;
    } catch (err) {
      console.error('Failed to fetch connection status:', err);
      const fallbackStatus = {
        aws: { connected: false, status: 'not_configured', error: null },
        azure: { connected: false, status: 'not_configured', error: null },
        gcp: { connected: false, status: 'not_configured', error: null }
      };
      setConnections(fallbackStatus);
      return fallbackStatus;
    }
  }, []);

  const fetchCloudData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const connectionStatus = await fetchConnectionStatus();
      const hasActiveConnections = Object.values(connectionStatus)?.some(conn => conn?.connected === true);
      
      if (!hasActiveConnections && cloudDataService?.isDevMode) {
        const mockData = cloudDataService?.getMockData();
        const processedData = {
          ...mockData,
          connections: connectionStatus,
          lastUpdated: new Date()?.toISOString(),
          isDemo: true,
          message: 'Demo data - Connect cloud providers to see real cost data'
        };
        
        setData(processedData);
        setLoading(false);
        return;
      }

      // Always show demo data in development for testing
      const mockData = cloudDataService?.getMockData();
      const processedData = {
        ...mockData,
        connections: connectionStatus,
        lastUpdated: new Date()?.toISOString(),
        isDemo: true,
        message: hasActiveConnections ? 'Connected provider data (demo mode)' : 'Demo data - connect providers for real data'
      };
      
      setData(processedData);
    } catch (err) {
      console.error('Failed to fetch cloud data:', err);
      
      // Always fall back to mock data to prevent display issues
      const mockData = cloudDataService?.getMockData();
      setData({
        ...mockData,
        connections: connections,
        lastUpdated: new Date()?.toISOString(),
        isDemo: true,
        error: 'Using demo data due to connection issues'
      });
    } finally {
      setLoading(false);
    }
  }, [fetchConnectionStatus, connections]);

  const refreshData = useCallback(() => {
    fetchCloudData();
  }, [fetchCloudData]);

  // Initial load
  useEffect(() => {
    fetchCloudData();
  }, [fetchCloudData]);

  // Auto-refresh - only in production or when connections exist
  useEffect(() => {
    if (refreshInterval > 0 && !cloudDataService?.isDevMode) {
      const hasConnections = Object.values(connections)?.some(conn => conn?.connected);
      if (hasConnections) {
        const interval = setInterval(fetchCloudData, refreshInterval);
        return () => clearInterval(interval);
      }
    }
  }, [fetchCloudData, refreshInterval, connections]);

  return {
    data,
    loading,
    error,
    connections,
    refreshData: fetchCloudData,
    fetchConnectionStatus,
    isDemo: data?.isDemo || false
  };
};

// Helper functions to format data
const formatKeyMetrics = (costData, connectionStatus = {}) => {
  if (!costData || !costData?.success) {
    return [
      {
        title: 'Total Monthly Spend',
        value: 'Connect Providers',
        change: null,
        changeType: 'neutral',
        icon: 'AlertCircle',
        subtitle: 'Connect cloud providers to see data'
      },
      {
        title: 'Month-over-Month',
        value: 'Connect Providers',
        change: null,
        changeType: 'neutral',
        icon: 'AlertCircle',
        subtitle: 'Data unavailable'
      },
      {
        title: 'Budget Utilization',
        value: 'Connect Providers',
        change: null,
        changeType: 'neutral',
        icon: 'AlertCircle',
        subtitle: 'Data unavailable'
      },
      {
        title: 'Cost Savings',
        value: 'Connect Providers',
        change: null,
        changeType: 'neutral',
        icon: 'AlertCircle',
        subtitle: 'Data unavailable'
      }
    ];
  }

  const { aws, azure, gcp } = costData?.data || {};
  const awsTotal = aws?.data?.totalCost || 0;
  const azureTotal = azure?.data?.totalCost || 0;
  const gcpTotal = gcp?.data?.totalCost || 0;
  const totalCost = awsTotal + azureTotal + gcpTotal;
  
  const awsPrevious = aws?.data?.previousTotal || 0;
  const azurePrevious = azure?.data?.previousTotal || 0;
  const gcpPrevious = gcp?.data?.previousTotal || 0;
  const previousTotal = awsPrevious + azurePrevious + gcpPrevious;
  
  const monthOverMonth = previousTotal > 0 ? ((totalCost - previousTotal) / previousTotal) * 100 : 0;
  const budgetUtilization = 78.9; // This would come from your budget API
  const costSavings = 8940; // This would come from your optimization API

  // Determine subtitle based on connection status and data source
  const connectedCount = Object.values(connectionStatus || {})?.filter(conn => conn?.connected)?.length;
  const subtitle = costData?.source === 'mock' && connectedCount > 0 ? 
    `Connected: ${connectedCount} provider${connectedCount > 1 ? 's' : ''} (demo data)` :
    costData?.source === 'api'? 'Live data from connected providers': 'Across all services';

  return [
    {
      title: 'Total Monthly Spend',
      value: `$${totalCost?.toLocaleString()}`,
      change: `${monthOverMonth >= 0 ? '+' : ''}${monthOverMonth?.toFixed(1)}%`,
      changeType: monthOverMonth >= 0 ? 'negative' : 'positive',
      icon: 'DollarSign',
      subtitle: subtitle
    },
    {
      title: 'Month-over-Month',
      value: `${monthOverMonth >= 0 ? '+' : ''}$${Math.abs(totalCost - previousTotal)?.toLocaleString()}`,
      change: `${monthOverMonth >= 0 ? '+' : ''}${monthOverMonth?.toFixed(1)}%`,
      changeType: monthOverMonth >= 0 ? 'negative' : 'positive',
      icon: 'TrendingUp',
      subtitle: 'vs last month'
    },
    {
      title: 'Budget Utilization',
      value: `${budgetUtilization?.toFixed(1)}%`,
      change: '-2.1%',
      changeType: 'positive',
      icon: 'Target',
      subtitle: 'of monthly budget'
    },
    {
      title: 'Cost Savings',
      value: `$${costSavings?.toLocaleString()}`,
      change: '+15.3%',
      changeType: 'positive',
      icon: 'PiggyBank',
      subtitle: 'This month'
    }
  ];
};

const formatCostTrends = (costData) => {
  if (!costData || !costData?.success) {
    return [];
  }

  // Transform the API data into chart-friendly format
  const { aws, azure, gcp } = costData?.data || {};
  
  // Get daily breakdown data
  const awsDaily = aws?.data?.dailyBreakdown || [];
  const azureDaily = azure?.data?.dailyBreakdown || [];
  const gcpDaily = gcp?.data?.dailyBreakdown || [];

  // Merge daily data from all providers
  const chartData = [];
  const dateSet = new Set([
    ...awsDaily?.map(d => d?.date),
    ...azureDaily?.map(d => d?.date),
    ...gcpDaily?.map(d => d?.date)
  ]);

  Array.from(dateSet)?.sort()?.forEach(date => {
    const awsCost = awsDaily?.find(d => d?.date === date)?.cost || 0;
    const azureCost = azureDaily?.find(d => d?.date === date)?.cost || 0;
    const gcpCost = gcpDaily?.find(d => d?.date === date)?.cost || 0;
    const total = awsCost + azureCost + gcpCost;

    chartData?.push({
      date,
      all: total,
      aws: awsCost,
      azure: azureCost,
      gcp: gcpCost,
      compute: total * 0.45, // Estimated breakdown
      storage: total * 0.25,
      network: total * 0.15,
      ai: total * 0.15
    });
  });

  return chartData?.slice(-30); // Return last 30 days
};

export default useCloudData;