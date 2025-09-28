import React, { useState } from 'react';

const ApplicationTree = ({ applications, onApplicationUserMapping }) => {
  const [expandedApps, setExpandedApps] = useState({});

  const toggleAppExpansion = (appId) => {
    setExpandedApps(prev => ({
      ...prev,
      [appId]: !prev?.[appId]
    }));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Web Services':
        return '🌐';
      case 'Database Services':
        return '💾';
      case 'Analytics':
        return '📊';
      case 'API Gateway':
        return '🔗';
      case 'Monitoring':
        return '📈';
      default:
        return '📱';
    }
  };

  const getTechnologyColor = (technology) => {
    if (technology?.includes('React') || technology?.includes('Node')) return 'bg-blue-100 text-blue-800';
    if (technology?.includes('PostgreSQL')) return 'bg-green-100 text-green-800';
    if (technology?.includes('Python')) return 'bg-yellow-100 text-yellow-800';
    if (technology?.includes('AWS')) return 'bg-orange-100 text-orange-800';
    if (technology?.includes('CloudWatch')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      <div className="space-y-4">
        {applications?.map((app) => (
          <div key={app?.id} className="border border-gray-200 rounded-lg">
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
              onClick={() => toggleAppExpansion(app?.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getCategoryIcon(app?.category)}</span>
                <div>
                  <h3 className="font-medium text-gray-900">{app?.name}</h3>
                  <p className="text-sm text-gray-600">{app?.category}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTechnologyColor(app?.technology)}`}>
                  {app?.technology}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{app?.users?.length} users</span>
                <svg 
                  className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedApps?.[app?.id] ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {expandedApps?.[app?.id] && (
              <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Application Owner</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {app?.owner?.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-900">{app?.owner}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Access Permissions</h4>
                    <div className="flex flex-wrap gap-2">
                      {app?.permissions?.map((permission) => (
                        <span 
                          key={permission}
                          className="px-2 py-1 text-xs font-medium bg-white border border-gray-200 rounded"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Assigned Users</h4>
                    <div className="space-y-1">
                      {app?.users?.map((userEmail) => (
                        <div key={userEmail} className="flex items-center justify-between text-sm">
                          <span className="text-gray-900">{userEmail}</span>
                          <span className="text-gray-500">DynamoDB: Synced</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <button 
                      onClick={() => onApplicationUserMapping(app?.id, '', app?.permissions)}
                      className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Manage User Access
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTree;