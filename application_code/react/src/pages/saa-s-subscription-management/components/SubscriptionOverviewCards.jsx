import React from 'react';
import Icon from '../../../components/AppIcon';

const SubscriptionOverviewCards = ({ metrics }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'expiring': return 'text-warning bg-warning/10';
      case 'inactive': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics?.map((metric, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(metric?.status)}`}>
              <Icon name={metric?.icon} size={24} />
            </div>
            {metric?.trend && (
              <div className="flex items-center space-x-1">
                <Icon 
                  name={metric?.trendDirection === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size={16} 
                  className={metric?.trendDirection === 'up' ? 'text-success' : 'text-error'} 
                />
                <span className={`text-sm font-medium ${metric?.trendDirection === 'up' ? 'text-success' : 'text-error'}`}>
                  {metric?.trendValue}
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{metric?.title}</h3>
            <div className="text-2xl font-bold text-foreground">{metric?.value}</div>
            {metric?.subtitle && (
              <p className="text-xs text-muted-foreground">{metric?.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionOverviewCards;