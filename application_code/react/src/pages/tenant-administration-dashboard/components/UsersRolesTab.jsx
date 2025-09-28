import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Eye, Edit, Trash2, Plus, Search } from 'lucide-react';

const UsersRolesTab = ({ tenantUsers, onImpersonate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Mock data for demonstration
  const mockUsers = [
    {
      username: 'joel.kummari',
      email: 'joel@cloudbinary.com',
      role: 'Executive Level',
      department: 'Executive',
      status: 'Active',
      lastLogin: '2025-01-19T10:30:00Z'
    },
    {
      username: 'jessi.kummari',
      email: 'jessi@cloudbinary.com',
      role: 'Management Level',
      department: 'Management',
      status: 'Active',
      lastLogin: '2025-01-19T09:15:00Z'
    },
    {
      username: 'john.david',
      email: 'john@cloudbinary.com',
      role: 'Operational Level',
      department: 'Operations',
      status: 'Active',
      lastLogin: '2025-01-19T08:45:00Z'
    },
    {
      username: 'peter.samuel',
      email: 'peter@cloudbinary.com',
      role: 'Analyst Level',
      department: 'Analytics',
      status: 'Active',
      lastLogin: '2025-01-18T16:30:00Z'
    },
    {
      username: 'james.osteen',
      email: 'james@cloudbinary.com',
      role: 'Read-Only Access',
      department: 'Support',
      status: 'Active',
      lastLogin: '2025-01-18T14:20:00Z'
    }
  ];

  const displayUsers = tenantUsers?.length > 0 ? tenantUsers : mockUsers;

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'Executive Level', label: 'Executive Level' },
    { value: 'Management Level', label: 'Management Level' },
    { value: 'Operational Level', label: 'Operational Level' },
    { value: 'Analyst Level', label: 'Analyst Level' },
    { value: 'Read-Only Access', label: 'Read-Only Access' }
  ];

  const filteredUsers = displayUsers?.filter(user => {
    const matchesSearch = user?.username?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = roleFilter === 'all' || user?.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const formatLastLogin = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Executive Level':
        return 'bg-purple-100 text-purple-800';
      case 'Management Level':
        return 'bg-blue-100 text-blue-800';
      case 'Operational Level':
        return 'bg-green-100 text-green-800';
      case 'Analyst Level':
        return 'bg-yellow-100 text-yellow-800';
      case 'Read-Only Access':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">User & Role Management</h2>
          <p className="text-sm text-gray-600">Manage tenant users and their role assignments</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </Button>
      </div>
      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="pl-10"
          />
        </div>
        <Select
          options={roleOptions}
          value={roleFilter}
          onChange={setRoleFilter}
          className="w-48"
        />
      </div>
      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers?.map((user, index) => (
              <tr key={user?.username} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user?.username}</div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role)}`}>
                    {user?.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user?.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user?.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatLastLogin(user?.lastLogin)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onImpersonate(user?.username)}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                      title="Impersonate User"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 p-1 rounded" title="Edit User">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1 rounded" title="Delete User">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Role Hierarchy Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Client Role Hierarchy</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <div><strong>Executive Level:</strong> Full access to all features and data</div>
          <div><strong>Management Level:</strong> Management dashboard and team oversight</div>
          <div><strong>Operational Level:</strong> Daily operations and task management</div>
          <div><strong>Analyst Level:</strong> Data analysis and reporting tools</div>
          <div><strong>Read-Only Access:</strong> View-only access to assigned resources</div>
        </div>
      </div>
    </div>
  );
};

export default UsersRolesTab;