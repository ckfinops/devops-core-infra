import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetOverviewCards = () => {
  const budgetMetrics = [
    {
      id: 1,
      title: "Total Allocated Budget",
      value: "$2,450,000",
      period: "FY 2024",
      change: "+12.5%",
      changeType: "positive",
      icon: "DollarSign",
      color: "bg-primary"
    },
    {
      id: 2,
      title: "Current Spend",
      value: "68.3%",
      period: "of budget",
      change: "+2.1%",
      changeType: "neutral",
      icon: "TrendingUp",
      color: "bg-secondary"
    },
    {
      id: 3,
      title: "Projected Variance",
      value: "-$45,200",
      period: "Under budget",
      change: "Improved",
      changeType: "positive",
      icon: "Target",
      color: "bg-success"
    },
    {
      id: 4,
      title: "Forecast Accuracy",
      value: "94.7%",
      period: "Last 6 months",
      change: "+1.8%",
      changeType: "positive",
      icon: "Activity",
      color: "bg-accent"
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {budgetMetrics?.map((metric) => (
        <div key={metric?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${metric?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={metric?.icon} size={24} color="white" />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor(metric?.changeType)}`}>
              <Icon name={getChangeIcon(metric?.changeType)} size={16} />
              <span className="font-medium">{metric?.change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{metric?.title}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-card-foreground">{metric?.value}</span>
              <span className="text-sm text-muted-foreground">{metric?.period}</span>
            </div>
          </div>

          {/* Progress indicator for current spend */}
          {metric?.id === 2 && (
            <div className="mt-4">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-secondary h-2 rounded-full transition-all duration-300" 
                  style={{ width: '68.3%' }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BudgetOverviewCards;