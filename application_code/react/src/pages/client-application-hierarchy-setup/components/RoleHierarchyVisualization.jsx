import React from 'react';

const RoleHierarchyVisualization = ({ roleHierarchy }) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Role Hierarchy Flow</h3>
        <p className="text-sm text-gray-600 mt-1">Permission inheritance and access control visualization</p>
      </div>
      <div className="p-6">
        <div className="flex flex-col space-y-8">
          {roleHierarchy?.map((role, index) => (
            <div key={role?.level} className="flex items-center">
              {/* Role Node */}
              <div className="flex-shrink-0 w-64">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{role?.title}</h4>
                      <p className="text-blue-100 text-sm">{role?.user}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                      <span className="font-bold text-lg">{role?.level}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Line */}
              {index < roleHierarchy?.length - 1 && (
                <div className="flex-1 mx-8 relative">
                  <div className="h-px bg-gray-300 relative">
                    <div className="absolute right-0 top-0 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xs text-gray-500 bg-white px-2">inherits from</span>
                  </div>
                </div>
              )}

              {/* Permissions */}
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Access Scope</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <span className="text-xs text-gray-500">Applications:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {role?.applications?.slice(0, 3)?.map((app) => (
                          <span 
                            key={app}
                            className="px-1 py-0.5 text-xs bg-blue-100 text-blue-700 rounded"
                          >
                            {app}
                          </span>
                        ))}
                        {role?.applications?.length > 3 && (
                          <span className="px-1 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                            +{role?.applications?.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Key Permissions:</span>
                      <div className="mt-1">
                        {role?.permissions?.slice(0, 2)?.map((permission) => (
                          <div key={permission} className="flex items-center space-x-1">
                            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs text-gray-600">{permission}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Verification */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-green-800">Compliance Verified</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            Role hierarchy follows principle of least privilege and proper permission inheritance
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleHierarchyVisualization;