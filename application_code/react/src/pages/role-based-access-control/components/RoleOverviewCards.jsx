import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleOverviewCards = ({ data, loading }) => {
  const cards = [
    {
      title: 'Total Defined Roles',
      value: data?.totalRoles?.toString() || '0',
      icon: 'Shield',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '5 Standard Roles',
      changeType: 'neutral'
    },
    {
      title: 'Permission Complexity',
      value: data?.complexityScore ? `${data?.complexityScore}%` : '0%',
      icon: 'Settings',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: 'Well Structured',
      changeType: 'positive'
    },
    {
      title: 'Custom Roles',
      value: data?.customRoles?.toString() || '0',
      icon: 'Plus',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+2 this month',
      changeType: 'positive'
    },
    {
      title: 'Compliance Status',
      value: data?.complianceStatus || 'Unknown',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-green-50',
      change: 'SOC2 + GDPR',
      changeType: 'positive'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(4)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-muted rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards?.map((card, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 ${card?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={card?.icon} size={24} className={card?.color} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-muted-foreground">{card?.title}</h3>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-2xl font-bold text-foreground">{card?.value}</div>
            {card?.change && (
              <div className="flex items-center space-x-2">
                <Icon 
                  name={card?.changeType === 'positive' ? 'CheckCircle' : card?.changeType === 'negative' ? 'XCircle' : 'Info'} 
                  size={14} 
                  className={
                    card?.changeType === 'positive' ? 'text-success' : 
                    card?.changeType === 'negative' ? 'text-error' : 'text-muted-foreground'
                  }
                />
                <span className={`text-sm font-medium ${
                  card?.changeType === 'positive' ? 'text-success' : 
                  card?.changeType === 'negative' ? 'text-error' : 'text-muted-foreground'
                }`}>
                  {card?.change}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleOverviewCards;