import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCards = ({ data }) => {
  const cards = [
    {
      title: 'Total Applications',
      value: data?.totalApplications || 0,
      icon: 'Package',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: null
    },
    {
      title: 'Active Applications',
      value: data?.activeApplications || 0,
      icon: 'CheckCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: '+5% from last month'
    },
    {
      title: 'Critical Applications',
      value: data?.criticalApplications || 0,
      icon: 'AlertTriangle',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      trend: null
    },
    {
      title: 'Recently Updated',
      value: data?.recentlyUpdated || 0,
      icon: 'Clock',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      trend: 'Last 3 days'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards?.map((card, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className={`${card?.bgColor} ${card?.color} p-3 rounded-lg`}>
              <Icon name={card?.icon} size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{card?.title}</p>
              <p className="text-2xl font-bold text-foreground">{card?.value}</p>
              {card?.trend && (
                <p className="text-xs text-muted-foreground mt-1">{card?.trend}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;