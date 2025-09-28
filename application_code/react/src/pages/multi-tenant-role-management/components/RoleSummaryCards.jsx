import React from 'react';

const RoleSummaryCards = ({ roleCounts }) => {
  const cards = [
    {
      title: 'Super Users',
      count: roleCounts?.superUser,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Full system access'
    },
    {
      title: 'Administrators',
      count: roleCounts?.admin,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Tenant management'
    },
    {
      title: 'Read-Only Users',
      count: roleCounts?.readOnly,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'View-only access'
    },
    {
      title: 'Total Users',
      count: roleCounts?.total,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'All active users'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards?.map((card, index) => (
        <div key={index} className={`${card?.bgColor} rounded-lg p-6 border border-gray-200`}>
          <div className="flex items-center">
            <div className={`${card?.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className={`text-2xl font-bold ${card?.textColor}`}>{card?.count}</h3>
              <p className="text-gray-600 text-sm font-medium">{card?.title}</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-3">{card?.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RoleSummaryCards;