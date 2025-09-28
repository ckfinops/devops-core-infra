import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Cost Analysis',
      description: 'Deep dive into spending patterns',
      icon: 'BarChart3',
      color: 'bg-blue-500',
      path: '/multi-cloud-cost-analysis',
      badge: null
    },
    {
      id: 2,
      title: 'Set Budget Alert',
      description: 'Configure spending notifications',
      icon: 'Bell',
      color: 'bg-orange-500',
      path: '/cost-alerts-notifications',
      badge: '3 active'
    },
    {
      id: 3,
      title: 'View Forecasts',
      description: 'Check budget projections',
      icon: 'TrendingUp',
      color: 'bg-green-500',
      path: '/budget-planning-forecasting',
      badge: null
    },
    {
      id: 4,
      title: 'Optimize Costs',
      description: 'Review recommendations',
      icon: 'Zap',
      color: 'bg-purple-500',
      path: '/cost-optimization-recommendations',
      badge: '5 new'
    }
  ];

  const handleActionClick = (path) => {
    window.location.href = path;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action?.path)}
            className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/30 hover:border-primary/20 transition-all duration-150 text-left group"
          >
            <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-150`}>
              <Icon name={action?.icon} size={20} color="white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-150">
                  {action?.title}
                </h3>
                {action?.badge && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {action?.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {action?.description}
              </p>
            </div>
            
            <Icon 
              name="ArrowRight" 
              size={16} 
              className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-150" 
            />
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date()?.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;