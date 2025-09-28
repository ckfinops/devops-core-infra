import React, { useState } from 'react';

const ApplicationUserMapping = ({ applications, roleHierarchy, onMappingUpdate }) => {
  const [selectedApp, setSelectedApp] = useState('');
  const [mappingMode, setMappingMode] = useState('view'); // 'view' or 'edit'

  const getApplicationUsers = (appId) => {
    const app = applications?.find(a => a?.id === appId);
    if (!app) return [];
    
    return roleHierarchy?.filter(role => 
      role?.applications?.includes(app?.name) || app?.users?.some(user => user?.includes(role?.user?.split(' ')?.[0]?.toLowerCase()))
    );
  };

  const getRoleAccess = (appId, role) => {
    const app = applications?.find(a => a?.id === appId);
    if (!app) return [];
    
    // Determine access level based on role hierarchy
    switch (role?.level) {
      case 1:
        return ['read', 'write', 'admin', 'delete'];
      case 2:
        return ['read', 'write', 'admin'];
      case 3:
        return ['read', 'write'];
      case 4:
        return ['read', 'execute'];
      case 5:
        return ['read'];
      default:
        return ['read'];
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Application-User Mapping</h3>
            <p className="text-sm text-gray-600 mt-1">Manage user access controls for applications</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedApp}
              onChange={(e) => setSelectedApp(e?.target?.value)}
              className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Application</option>
              {applications?.map((app) => (
                <option key={app?.id} value={app?.id}>
                  {app?.name} - {app?.category}
                </option>
              ))}
            </select>
            <button
              onClick={() => setMappingMode(mappingMode === 'view' ? 'edit' : 'view')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {mappingMode === 'view' ? 'Edit Mappings' : 'View Mode'}
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {selectedApp ? (
          <div className="space-y-6">
            {/* Application Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              {(() => {
                const app = applications?.find(a => a?.id === selectedApp);
                return app ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{app?.name}</h4>
                      <p className="text-sm text-gray-600">{app?.category} • {app?.technology}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      Owner: {app?.owner}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>

            {/* User Access Matrix */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Access Permissions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Access
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getApplicationUsers(selectedApp)?.map((role) => (
                    <tr key={role?.level} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {role?.user?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{role?.user}</div>
                            <div className="text-sm text-gray-500">{role?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {role?.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {getRoleAccess(selectedApp, role)?.map((permission) => (
                            <span 
                              key={permission}
                              className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded"
                            >
                              {permission}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2 hours ago
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {mappingMode === 'edit' ? (
                          <button
                            onClick={() => onMappingUpdate(selectedApp, role?.email, getRoleAccess(selectedApp, role))}
                            className="text-blue-600 hover:text-blue-500 font-medium"
                          >
                            Update Access
                          </button>
                        ) : (
                          <span className="text-green-600 font-medium">✓ Configured</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Automated Provisioning Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-medium text-blue-800">Automated User Provisioning Active</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Lambda functions handle user lifecycle management and permission updates
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Select an Application</h3>
              <p className="mt-1 text-sm text-gray-500">Choose an application to view and manage user access mappings.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationUserMapping;