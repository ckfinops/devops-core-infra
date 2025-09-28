import React from 'react';

const RoleMatrix = ({ 
  users, 
  onRoleUpdate, 
  selectedUsers, 
  onUserSelect, 
  tenants 
}) => {
  const handleUserSelect = (username) => {
    const isSelected = selectedUsers?.includes(username);
    if (isSelected) {
      onUserSelect(selectedUsers?.filter(u => u !== username));
    } else {
      onUserSelect([...selectedUsers, username]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers?.length === users?.length) {
      onUserSelect([]);
    } else {
      onUserSelect(users?.map(user => user?.username));
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Super User':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Admin':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Read Only':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending_verification':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedUsers?.length === users?.length && users?.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tenant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Auth
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users?.map((user) => (
            <tr key={user?.username} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedUsers?.includes(user?.username)}
                  onChange={() => handleUserSelect(user?.username)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user?.email?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.email || user?.username}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user?.department || 'No Department'}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRoleColor(user?.role)}`}>
                  {user?.role || 'Read Only'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user?.company || 'No Tenant'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user?.status)}`}>
                  {user?.status || 'active'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user?.updatedAt ? new Date(user.updatedAt)?.toLocaleDateString() : 'Never'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <select
                  value={user?.role || 'Read Only'}
                  onChange={(e) => onRoleUpdate(user?.username, e?.target?.value)}
                  className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Read Only">Read Only</option>
                  <option value="Admin">Admin</option>
                  <option value="Super User">Super User</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your filter criteria.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleMatrix;