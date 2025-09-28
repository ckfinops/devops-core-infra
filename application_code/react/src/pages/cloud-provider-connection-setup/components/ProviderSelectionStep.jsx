import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProviderSelectionStep = ({ connections, onProviderSelect }) => {
  const providers = [
    {
      id: 'aws',
      name: 'Amazon Web Services',
      description: 'Connect your AWS accounts for comprehensive cost analysis and optimization',
      logo: 'Cloud',
      color: 'bg-orange-100 border-orange-200 text-orange-700',
      features: [
        'IAM Role-based authentication',
        'Cross-account access support',
        'Cost and Usage Report integration',
        'EC2, S3, RDS, and 150+ services'
      ],
      connectionMethods: ['IAM Role', 'Access Keys', 'Cross-Account Role']
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      description: 'Integrate with Azure subscriptions for detailed cost monitoring and control',
      logo: 'Cloud',
      color: 'bg-blue-100 border-blue-200 text-blue-700',
      features: [
        'Service Principal authentication',
        'Managed Identity support',
        'Cost Management API integration',
        'Virtual Machines, Storage, Databases'
      ],
      connectionMethods: ['Service Principal', 'Managed Identity']
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform',
      description: 'Connect GCP projects for unified multi-cloud cost optimization',
      logo: 'Cloud',
      color: 'bg-green-100 border-green-200 text-green-700',
      features: [
        'Service Account authentication',
        'OAuth 2.0 flow support',
        'Billing API integration',
        'Compute Engine, Cloud Storage, BigQuery'
      ],
      connectionMethods: ['Service Account', 'OAuth Flow']
    }
  ];

  const getConnectionStatus = (providerId) => {
    const connection = connections?.[providerId];
    if (connection?.status === 'connected') {
      return {
        status: 'Connected',
        accounts: connection?.accounts?.length,
        color: 'text-success',
        icon: 'CheckCircle'
      };
    }
    return {
      status: 'Not Connected',
      accounts: 0,
      color: 'text-muted-foreground',
      icon: 'AlertCircle'
    };
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">Select Cloud Provider</h2>
          <p className="text-muted-foreground">
            Choose a cloud provider to set up a new connection or manage existing ones
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {providers?.map((provider) => {
            const status = getConnectionStatus(provider?.id);
            
            return (
              <div
                key={provider?.id}
                className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Provider Logo */}
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg border ${provider?.color}`}>
                      <Icon name={provider?.logo} size={24} />
                    </div>

                    {/* Provider Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{provider?.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Icon name={status?.icon} size={16} className={status?.color} />
                          <span className={`text-sm ${status?.color}`}>
                            {status?.status}
                            {status?.accounts > 0 && ` (${status?.accounts} account${status?.accounts > 1 ? 's' : ''})`}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{provider?.description}</p>

                      {/* Features */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        {provider?.features?.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Connection Methods */}
                      <div className="flex flex-wrap gap-2">
                        {provider?.connectionMethods?.map((method, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button
                      onClick={() => onProviderSelect(provider?.id)}
                      size="sm"
                    >
                      <Icon name="Plus" size={14} className="mr-2" />
                      Connect
                    </Button>
                    
                    {status?.accounts > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Handle manage existing connections
                          console.log(`Managing ${provider?.id} connections`);
                        }}
                      >
                        <Icon name="Settings" size={14} className="mr-2" />
                        Manage
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {Object.values(connections)?.filter(c => c?.status === 'connected')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Connected Providers</div>
          </div>
          
          <div className="bg-background border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {Object.values(connections)?.reduce((sum, provider) => sum + provider?.accounts?.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Accounts</div>
          </div>
          
          <div className="bg-background border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {Object.values(connections)?.flatMap(provider => provider?.accounts)?.filter(account => account?.healthStatus === 'healthy')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Healthy Connections</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderSelectionStep;