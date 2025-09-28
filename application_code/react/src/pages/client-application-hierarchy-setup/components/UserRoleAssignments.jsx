import React from 'react';

const UserRoleAssignments = ({ roleHierarchy, onRoleUpdate }) => {
  const getRoleColor = (level) => {
    switch (level) {
      case 1:
        return 'bg-red-100 text-red-800 border-red-200';
      case 2:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 3:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 4:
        return 'bg-green-100 text-green-800 border-green-200';
      case 5:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 1:
        return '👑'; // Executive
      case 2:
        return '🏢'; // Management
      case 3:
        return '⚙️'; // Operational
      case 4:
        return '📊'; // Analyst
      case 5:
        return '👁️'; // Read-Only
      default:
        return '👤';
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-4">
        {roleHierarchy?.map((role) => (
          <div key={role?.level} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getLevelIcon(role?.level)}</span>
                <div>
                  <h3 className="font-medium text-gray-900">{role?.title}</h3>
                  <p className="text-sm text-gray-600">Level {role?.level} Access</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getRoleColor(role?.level)}`}>
                  Hierarchy Level {role?.level}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">User Details</h4>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {role?.user?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{role?.user}</p>
                    <p className="text-xs text-gray-500">{role?.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-gray-500">Cognito: Authenticated</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Application Access</h4>
                <div className="flex flex-wrap gap-1">
                  {role?.applications?.map((app) => (
                    <span 
                      key={app}
                      className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {role?.permissions?.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">{permission}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                DynamoDB Record: Synchronized
              </div>
              <button 
                onClick={() => onRoleUpdate(role?.email, role?.title)}
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Update Role
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRoleAssignments;