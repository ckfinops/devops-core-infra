import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const ConnectionStatusDashboard = ({ connections, onProviderSelect }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success';
      case 'error':
        return 'text-error';
      case 'pending':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      case 'pending':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  const getProviderIcon = (provider) => {
    switch (provider) {
      case 'aws':
        return 'Cloud';
      case 'azure':
        return 'CloudSnow';
      case 'gcp':
        return 'CloudRain';
      default:
        return 'Cloud';
    }
  };

  const getProviderName = (provider) => {
    switch (provider) {
      case 'aws':
        return 'AWS';
      case 'azure':
        return 'Azure';
      case 'gcp':
        return 'GCP';
      default:
        return provider?.toUpperCase();
    }
  };

  const totalConnections = Object.values(connections)?.filter(c => c?.connected)?.length;
  const totalProviders = Object.keys(connections)?.length;

  const getConnectionHealth = () => {
    const connectedCount = Object.values(connections)?.filter(c => c?.connected)?.length;
    const errorCount = Object.values(connections)?.filter(c => c?.status === 'error')?.length;
    
    if (connectedCount === totalProviders) return { status: 'excellent', color: 'text-success' };
    if (connectedCount > 0) return { status: 'good', color: 'text-warning' };
    if (errorCount > 0) return { status: 'poor', color: 'text-error' };
    return { status: 'none', color: 'text-muted-foreground' };
  };

  const health = getConnectionHealth();

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-fit">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Connection Status</h3>
          <p className="text-sm text-muted-foreground">
            Monitor your cloud provider connections
          </p>
        </div>

        {/* Overall Health */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Overall Health</span>
            <Icon name="Activity" size={16} className={health?.color} />
          </div>
          <div className={cn("text-2xl font-bold capitalize", health?.color)}>
            {health?.status}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {totalConnections} of {totalProviders} connected
          </div>
        </div>

        {/* Provider Status List */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Providers</h4>
          
          {Object.entries(connections)?.map(([provider, connection]) => (
            <div
              key={provider}
              className={cn(
                "p-3 border rounded-lg cursor-pointer transition-all hover:shadow-sm",
                connection?.connected 
                  ? "border-success/20 bg-success/5 hover:border-success/30"
                  : connection?.status === 'error'
                  ? "border-error/20 bg-error/5 hover:border-error/30" :"border-border hover:border-primary/50"
              )}
              onClick={() => onProviderSelect?.(provider)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getProviderIcon(provider)} 
                    size={16} 
                    className="text-muted-foreground" 
                  />
                  <div>
                    <div className="font-medium text-foreground text-sm">
                      {getProviderName(provider)}
                    </div>
                    {connection?.lastSync && (
                      <div className="text-xs text-muted-foreground">
                        {connection?.lastSync?.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit'
                        })}
                      </div>
                    )}
                  </div>
                </div>
                
                <Icon
                  name={getStatusIcon(connection?.status)}
                  size={16}
                  className={getStatusColor(connection?.status)}
                />
              </div>

              {/* Account/Subscription Count */}
              {connection?.connected && (
                <div className="mt-2 pt-2 border-t border-border/50">
                  <div className="text-xs text-muted-foreground">
                    {provider === 'aws' && `${connection?.accounts?.length || 0} accounts`}
                    {provider === 'azure' && `${connection?.subscriptions?.length || 0} subscriptions`}
                    {provider === 'gcp' && `${connection?.projects?.length || 0} projects`}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Quick Actions</h4>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="RefreshCw"
              iconPosition="left"
              onClick={() => window.location?.reload()}
            >
              Refresh All
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              iconName="Settings"
              iconPosition="left"
            >
              Connection Settings
            </Button>
          </div>
        </div>

        {/* Data Freshness */}
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Data Freshness</span>
          </div>
          <div className="space-y-1">
            {Object.entries(connections)
              ?.filter(([_, connection]) => connection?.connected)
              ?.map(([provider, connection]) => (
                <div key={provider} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground capitalize">{provider}</span>
                  <span className="text-muted-foreground">
                    {connection?.lastSync ? 
                      `${Math.floor((new Date() - connection?.lastSync) / (1000 * 60))}m ago` : 
                      'Never'
                    }
                  </span>
                </div>
              ))}
          </div>
          
          {Object.values(connections)?.filter(c => c?.connected)?.length === 0 && (
            <div className="text-xs text-muted-foreground text-center py-2">
              No connections active
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={12} className="text-success" />
            <span>Secure Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatusDashboard;