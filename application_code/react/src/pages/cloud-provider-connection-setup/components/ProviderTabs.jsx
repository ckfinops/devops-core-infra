import React from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const ProviderTabs = ({ activeProvider, onProviderChange, connections }) => {
  const providers = [
    {
      id: 'aws',
      name: 'AWS',
      icon: 'Cloud',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Amazon Web Services'
    },
    {
      id: 'azure',
      name: 'Azure',
      icon: 'CloudSnow',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Microsoft Azure'
    },
    {
      id: 'gcp',
      name: 'GCP',
      icon: 'CloudRain',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Google Cloud Platform'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'error':
        return { icon: 'XCircle', color: 'text-error' };
      case 'pending':
        return { icon: 'Clock', color: 'text-warning' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Cloud Providers</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={14} />
          <span>Select provider to configure</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {providers?.map((provider) => {
          const connection = connections?.[provider?.id];
          const statusInfo = getStatusIcon(connection?.status);
          const isActive = activeProvider === provider?.id;

          return (
            <div
              key={provider?.id}
              className={cn(
                "relative p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md",
                isActive
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => onProviderChange(provider?.id)}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                </div>
              )}

              <div className="flex items-center space-x-3 mb-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", provider?.bgColor)}>
                  <Icon name={provider?.icon} size={20} className={provider?.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-foreground">{provider?.name}</h3>
                    <Icon 
                      name={statusInfo?.icon} 
                      size={14} 
                      className={statusInfo?.color}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{provider?.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Status</span>
                  <span className={cn(
                    "font-medium capitalize",
                    connection?.status === 'connected' ? 'text-success' :
                    connection?.status === 'error' ? 'text-error' :
                    connection?.status === 'pending'? 'text-warning' : 'text-muted-foreground'
                  )}>
                    {connection?.status?.replace('_', ' ') || 'Not configured'}
                  </span>
                </div>

                {connection?.connected && connection?.lastSync && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Last Sync</span>
                    <span className="text-muted-foreground">
                      {connection?.lastSync?.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                )}

                {/* Account/Subscription Count */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {provider?.id === 'aws' ? 'Accounts' :
                     provider?.id === 'azure'? 'Subscriptions' : 'Projects'}
                  </span>
                  <span className="text-muted-foreground">
                    {connection?.accounts?.length || 
                     connection?.subscriptions?.length || 
                     connection?.projects?.length || 0}
                  </span>
                </div>
              </div>

              {/* Progress Indicator for Active Provider */}
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/20 rounded-b-lg">
                  <div className={cn(
                    "h-full bg-primary rounded-b-lg transition-all duration-300",
                    connection?.status === 'connected' ? 'w-full' :
                    connection?.status === 'pending'? 'w-2/3' : 'w-1/3'
                  )}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProviderTabs;