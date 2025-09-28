import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationsTab = ({ application }) => {
  // Mock integrations data
  const apiConnections = [
    {
      name: 'Payment Gateway API',
      type: 'External API',
      status: 'Active',
      endpoint: 'https://api.payments.com/v2',
      method: 'REST',
      authType: 'API Key',
      lastTested: '2025-01-09T10:00:00Z',
      responseTime: '245ms'
    },
    {
      name: 'Email Service API',
      type: 'External API',
      status: 'Active',
      endpoint: 'https://api.emailservice.com/v1',
      method: 'REST',
      authType: 'Bearer Token',
      lastTested: '2025-01-09T09:30:00Z',
      responseTime: '180ms'
    },
    {
      name: 'User Management Service',
      type: 'Internal API',
      status: 'Active',
      endpoint: 'https://internal.user-mgmt.com/api',
      method: 'GraphQL',
      authType: 'JWT',
      lastTested: '2025-01-09T11:15:00Z',
      responseTime: '95ms'
    }
  ];

  const dataFlows = [
    {
      name: 'Customer Data Sync',
      source: 'Customer Portal',
      destination: 'CRM System',
      frequency: 'Real-time',
      dataType: 'Customer Records',
      volume: '~1,500 records/day',
      status: 'Active'
    },
    {
      name: 'Transaction Reporting',
      source: 'Customer Portal',
      destination: 'Analytics Database',
      frequency: 'Hourly',
      dataType: 'Transaction Data',
      volume: '~5,000 records/hour',
      status: 'Active'
    },
    {
      name: 'Audit Log Export',
      source: 'Customer Portal',
      destination: 'Compliance System',
      frequency: 'Daily',
      dataType: 'Audit Logs',
      volume: '~50 MB/day',
      status: 'Active'
    }
  ];

  const systemDependencies = [
    {
      name: 'Customer Database',
      type: 'Database',
      criticality: 'Critical',
      status: 'Online',
      description: 'Primary customer data storage'
    },
    {
      name: 'Redis Cache',
      type: 'Cache',
      criticality: 'High',
      status: 'Online',
      description: 'Session and data caching'
    },
    {
      name: 'File Storage Service',
      type: 'Storage',
      criticality: 'Medium',
      status: 'Online',
      description: 'Document and media storage'
    },
    {
      name: 'Notification Queue',
      type: 'Message Queue',
      criticality: 'High',
      status: 'Online',
      description: 'Asynchronous notification processing'
    }
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800 border-green-200',
      'Online': 'bg-green-100 text-green-800 border-green-200',
      'Inactive': 'bg-red-100 text-red-800 border-red-200',
      'Offline': 'bg-red-100 text-red-800 border-red-200',
      'Warning': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    
    return statusStyles?.[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCriticalityBadge = (criticality) => {
    const criticalityStyles = {
      'Critical': 'bg-red-100 text-red-800 border-red-200',
      'High': 'bg-orange-100 text-orange-800 border-orange-200',
      'Medium': 'bg-blue-100 text-blue-800 border-blue-200',
      'Low': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return criticalityStyles?.[criticality] || criticalityStyles?.['Low'];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* API Connections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">API Connections</h3>
            <p className="text-sm text-muted-foreground">External and internal API integrations</p>
          </div>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Add Integration
          </Button>
        </div>
        
        <div className="space-y-4">
          {apiConnections?.map((api, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{api?.name}</h4>
                    <p className="text-xs text-muted-foreground">{api?.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(api?.status)}`}>
                  {api?.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div>
                    <span className="text-muted-foreground">Endpoint:</span>
                    <p className="text-foreground font-mono text-xs break-all">{api?.endpoint}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Method:</span>
                    <span className="text-foreground">{api?.method}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Auth Type:</span>
                    <span className="text-foreground">{api?.authType}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last Tested:</span>
                    <span className="text-foreground">{formatDate(api?.lastTested)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="text-foreground">{api?.responseTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-border">
                <Button variant="ghost" size="sm" iconName="TestTube">
                  Test
                </Button>
                <Button variant="ghost" size="sm" iconName="Eye">
                  Logs
                </Button>
                <Button variant="ghost" size="sm" iconName="Settings">
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Flows */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Data Flows</h3>
            <p className="text-sm text-muted-foreground">Data exchange patterns and synchronization</p>
          </div>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Add Data Flow
          </Button>
        </div>
        
        <div className="space-y-4">
          {dataFlows?.map((flow, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon name="ArrowRight" size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{flow?.name}</h4>
                    <p className="text-xs text-muted-foreground">{flow?.source} → {flow?.destination}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(flow?.status)}`}>
                  {flow?.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Frequency:</span>
                  <p className="text-foreground mt-1">{flow?.frequency}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Data Type:</span>
                  <p className="text-foreground mt-1">{flow?.dataType}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Volume:</span>
                  <p className="text-foreground mt-1">{flow?.volume}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Dependencies */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">System Dependencies</h3>
            <p className="text-sm text-muted-foreground">Critical system components and services</p>
          </div>
          <Button variant="outline" size="sm" iconName="Network" iconPosition="left">
            View Dependency Map
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {systemDependencies?.map((dependency, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icon name="Box" size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{dependency?.name}</h4>
                    <p className="text-xs text-muted-foreground">{dependency?.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full border ${getCriticalityBadge(dependency?.criticality)}`}>
                    {dependency?.criticality}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(dependency?.status)}`}>
                    {dependency?.status}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">{dependency?.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Health */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Integration Health</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {[
            { metric: 'API Success Rate', value: '99.2%', status: 'Excellent', color: 'text-green-600' },
            { metric: 'Avg Response Time', value: '173ms', status: 'Good', color: 'text-blue-600' },
            { metric: 'Data Sync Errors', value: '2', status: 'Low', color: 'text-orange-600' },
            { metric: 'Dependencies Up', value: '4/4', status: 'All Online', color: 'text-green-600' }
          ]?.map((metric, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4 text-center">
              <h4 className="text-sm font-medium text-foreground mb-2">{metric?.metric}</h4>
              <p className={`text-2xl font-bold ${metric?.color} mb-1`}>{metric?.value}</p>
              <p className="text-xs text-muted-foreground">{metric?.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center space-x-4 pt-4 border-t border-border">
        <Button variant="primary" iconName="TestTube" iconPosition="left">
          Test All Integrations
        </Button>
        <Button variant="outline" iconName="BarChart3" iconPosition="left">
          View Metrics
        </Button>
        <Button variant="outline" iconName="AlertTriangle" iconPosition="left">
          Set Alerts
        </Button>
        <Button variant="ghost" iconName="FileText" iconPosition="left">
          Documentation
        </Button>
      </div>
    </div>
  );
};

export default IntegrationsTab;