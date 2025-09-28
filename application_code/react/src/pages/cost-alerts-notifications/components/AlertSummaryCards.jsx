import React from 'react';
import Icon from '../../../components/AppIcon';

const AlertSummaryCards = () => {
  const summaryData = [
    {
      id: 1,
      title: "Active Alerts",
      value: "23",
      change: "+5",
      changeType: "increase",
      icon: "AlertTriangle",
      color: "text-warning",
      bgColor: "bg-warning/10",
      description: "Currently monitoring"
    },
    {
      id: 2,
      title: "Triggered (24h)",
      value: "8",
      change: "-2",
      changeType: "decrease",
      icon: "Bell",
      color: "text-error",
      bgColor: "bg-error/10",
      description: "Alerts in last day"
    },
    {
      id: 3,
      title: "Avg Response Time",
      value: "12m",
      change: "-3m",
      changeType: "decrease",
      icon: "Clock",
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Time to resolution"
    },
    {
      id: 4,
      title: "Cost Impact Prevented",
      value: "$45,230",
      change: "+$12,400",
      changeType: "increase",
      icon: "Shield",
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Savings through alerts"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData?.map((item) => (
        <div key={item?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${item?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              item?.changeType === 'increase' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={item?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{item?.change}</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{item?.value}</h3>
            <p className="text-sm font-medium text-foreground">{item?.title}</p>
            <p className="text-xs text-muted-foreground">{item?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertSummaryCards;