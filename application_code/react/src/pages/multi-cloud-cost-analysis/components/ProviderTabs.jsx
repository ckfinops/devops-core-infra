import React from 'react';
import Icon from '../../../components/AppIcon';

const ProviderTabs = ({ activeProvider, onProviderChange, providerData }) => {
  const providers = [
    {
      id: 'all',
      name: 'All Providers',
      icon: 'Cloud',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'aws',
      name: 'AWS',
      icon: 'Server',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      id: 'azure',
      name: 'Azure',
      icon: 'Database',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'gcp',
      name: 'GCP',
      icon: 'HardDrive',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getVarianceColor = (variance) => {
    if (variance > 0) return 'text-error';
    if (variance < 0) return 'text-success';
    return 'text-muted-foreground';
  };

  const getVarianceIcon = (variance) => {
    if (variance > 0) return 'TrendingUp';
    if (variance < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Cloud Provider Analysis</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span>Last 30 days</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {providers?.map((provider) => {
          const data = providerData?.[provider?.id];
          const isActive = activeProvider === provider?.id;
          
          return (
            <button
              key={provider?.id}
              onClick={() => onProviderChange(provider?.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                isActive
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${provider?.bgColor}`}>
                    <Icon name={provider?.icon} size={20} className={provider?.color} />
                  </div>
                  <span className="font-medium text-foreground">{provider?.name}</span>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    {formatCurrency(data?.totalSpend)}
                  </span>
                  <div className={`flex items-center space-x-1 text-sm ${getVarianceColor(data?.variance)}`}>
                    <Icon name={getVarianceIcon(data?.variance)} size={14} />
                    <span>{Math.abs(data?.variance)}%</span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  vs. previous period
                </div>

                {provider?.id !== 'all' && (
                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Active Services</span>
                      <span className="font-medium">{data?.activeServices}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Regions</span>
                      <span className="font-medium">{data?.regions}</span>
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProviderTabs;