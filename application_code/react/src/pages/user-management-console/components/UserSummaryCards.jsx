import React from 'react';
import Icon from '../../../components/AppIcon';

const UserSummaryCards = ({ data, loading }) => {
  const cards = [
    {
      title: 'Total Active Users',
      value: data?.activeUsers?.toString() || '0',
      icon: 'Users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+5.2%',
      changeType: 'positive'
    },
    {
      title: 'Users by Role Level',
      value: '5 Levels',
      icon: 'UserCheck',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      subtitle: 'Executive to Read-Only'
    },
    {
      title: 'Pending Invitations',
      value: data?.pendingInvitations?.toString() || '0',
      icon: 'Mail',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '3 new',
      changeType: 'neutral'
    },
    {
      title: 'Recent Access Activity',
      value: data?.recentAccess?.toString() || '0',
      icon: 'Activity',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      subtitle: 'Last 24 hours'
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
              {card?.subtitle && (
                <p className="text-xs text-muted-foreground/70">{card?.subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-2xl font-bold text-foreground">{card?.value}</div>
            {card?.change && (
              <div className="flex items-center space-x-2">
                <Icon 
                  name={card?.changeType === 'positive' ? 'TrendingUp' : card?.changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
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

export default UserSummaryCards;