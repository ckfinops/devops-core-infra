import React from 'react';
import { Building2, Users, DollarSign, TrendingUp } from 'lucide-react';

const ClientOverviewCards = ({ clients = [] }) => {
  const totalClients = clients?.length;
  const activeClients = clients?.filter(c => c?.status === 'Active')?.length;
  const totalUsers = clients?.reduce((sum, client) => sum + (client?.activeUsers || 0), 0);
  const totalRevenue = clients?.reduce((sum, client) => sum + (client?.monthlySpend || 0), 0);
  const revenueGrowth = 12.5; // Demo growth percentage

  const cards = [
    {
      title: 'Total Active Clients',
      value: activeClients,
      total: totalClients,
      icon: Building2,
      color: 'blue',
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      title: 'Licensed Users',
      value: totalUsers,
      icon: Users,
      color: 'green',
      change: '+12.3%',
      changeType: 'positive'
    },
    {
      title: 'Monthly Revenue',
      value: `$${totalRevenue?.toLocaleString()}`,
      icon: DollarSign,
      color: 'yellow',
      change: `+${revenueGrowth}%`,
      changeType: 'positive'
    },
    {
      title: 'Pipeline Value',
      value: '$125K',
      icon: TrendingUp,
      color: 'purple',
      change: '+5.8%',
      changeType: 'positive'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      yellow: 'bg-yellow-50 text-yellow-600',
      purple: 'bg-purple-50 text-purple-600'
    };
    return colors?.[color] || colors?.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards?.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${getColorClasses(card?.color)}`}>
              <card.icon className="h-6 w-6" />
            </div>
            <div className={`text-sm font-medium ${
              card?.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {card?.change}
            </div>
          </div>
          <div className="mb-2">
            <div className="text-2xl font-bold text-gray-900">
              {card?.value}
              {card?.total && (
                <span className="text-sm font-normal text-gray-500 ml-1">
                  / {card?.total}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600">{card?.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientOverviewCards;