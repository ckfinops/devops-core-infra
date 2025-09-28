import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Users, Plus, Search, UserPlus, BarChart3, Shield } from 'lucide-react';

const UserManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Mock user statistics from Cognito
  const userStats = {
    totalUsers: 145,
    activeUsers: 142,
    confirmedUsers: 140,
    unconfirmedUsers: 5,
    disabledUsers: 3
  };

  // C3Ops role statistics
  const roleStats = [
    { role: 'Super User', count: 3, percentage: 2.1 },
    { role: 'Admin', count: 12, percentage: 8.3 },
    { role: 'Read Only', count: 130, percentage: 89.6 }
  ];

  // Client distribution
  const clientDistribution = [
    { company: 'Cloud Binary', users: 45, percentage: 31.0 },
    { company: 'Tech Innovations', users: 38, percentage: 26.2 },
    { company: 'Data Solutions', users: 32, percentage: 22.1 },
    { company: 'Other Companies', users: 30, percentage: 20.7 }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'Super User', label: 'Super User' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Read Only', label: 'Read Only' }
  ];

  const handleBulkOperation = (operation) => {
    console.log(`Performing bulk operation: ${operation}`);
    // Implementation for bulk operations
  };

  const handleCreateUser = () => {
    console.log('Opening user creation modal...');
    // Implementation for creating new user
  };

  const handleRoleAssignment = () => {
    console.log('Opening role assignment workflow...');
    // Implementation for role assignment
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
          <p className="text-sm text-gray-600">Manage Cognito users with C3Ops role-based access control</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={handleRoleAssignment} className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Assign Roles</span>
          </Button>
          <Button size="sm" onClick={handleCreateUser} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
        </div>
      </div>
      {/* User Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">{userStats?.totalUsers}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-green-600">{userStats?.activeUsers}</div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{userStats?.confirmedUsers}</div>
          <div className="text-sm text-gray-600">Confirmed</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-yellow-600">{userStats?.unconfirmedUsers}</div>
          <div className="text-sm text-gray-600">Unconfirmed</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-red-600">{userStats?.disabledUsers}</div>
          <div className="text-sm text-gray-600">Disabled</div>
        </div>
      </div>
      {/* C3Ops Role Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">C3Ops Role Distribution</h3>
          </div>
          
          <div className="space-y-4">
            {roleStats?.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{stat?.role}</span>
                    <span className="text-sm text-gray-600">{stat?.count} users ({stat?.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        stat?.role === 'Super User' ? 'bg-purple-500' :
                        stat?.role === 'Admin' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${stat?.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Client Distribution</h3>
          </div>
          
          <div className="space-y-4">
            {clientDistribution?.map((client, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{client?.company}</span>
                    <span className="text-sm text-gray-600">{client?.users} users ({client?.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-indigo-500"
                      style={{ width: `${client?.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* User Management Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Management Actions</h3>
        
        <div className="flex items-center space-x-4 mb-6">
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
          <Button variant="outline" onClick={handleCreateUser} className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Bulk Import</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => handleBulkOperation('enable')}
          >
            <Users className="h-4 w-4 mr-2" />
            Bulk Enable Users
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => handleBulkOperation('disable')}
          >
            <Users className="h-4 w-4 mr-2" />
            Bulk Disable Users
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => handleBulkOperation('delete')}
          >
            <Users className="h-4 w-4 mr-2" />
            Bulk Delete Users
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => handleBulkOperation('export')}
          >
            <Users className="h-4 w-4 mr-2" />
            Export User List
          </Button>
        </div>
      </div>
      {/* Role-Based Access Control */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Role-Based Access Control Matrix</h3>
        
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client Management
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Administration
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant Dashboard
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  System Config
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Super User
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-green-600 font-bold">✓</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-green-600 font-bold">✓</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-green-600 font-bold">✓</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-green-600 font-bold">✓</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Admin
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-green-600 font-bold">✓</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-green-600 font-bold">✓</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-green-600 font-bold">✓</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-red-600 font-bold">✗</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Read Only
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-yellow-600 font-bold">👁</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-yellow-600 font-bold">👁</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-yellow-600 font-bold">👁</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-red-600 font-bold">✗</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-gray-600">Full Access</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-600 font-bold">👁</span>
            <span className="text-gray-600">Read Only Access</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-red-600 font-bold">✗</span>
            <span className="text-gray-600">No Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTab;