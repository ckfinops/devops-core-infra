import React, { useState } from 'react';
import { Users, Plus, Trash2, Mail, UserCheck, Shield } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserHierarchyStep = ({ data, updateData }) => {
  const [activeRole, setActiveRole] = useState('executive');

  const roleDefinitions = {
    executive: {
      title: 'Executive Level',
      description: 'C-level executives and senior leadership',
      permissions: ['Executive reports', 'Budget approval', 'Strategic planning'],
      icon: Shield,
      color: 'purple',
      example: 'Joel Kummari'
    },
    management: {
      title: 'Management Level',
      description: 'Department heads and team managers',
      permissions: ['Team management', 'Department budgets', 'Operational reports'],
      icon: UserCheck,
      color: 'blue',
      example: 'Jessi Kummari'
    },
    operational: {
      title: 'Operational Level',
      description: 'Technical leads and operational staff',
      permissions: ['Resource management', 'Technical implementation', 'Day-to-day operations'],
      icon: Users,
      color: 'green',
      example: 'John David'
    },
    analyst: {
      title: 'Analyst Level',
      description: 'Data analysts and cost optimization specialists',
      permissions: ['Data analysis', 'Report generation', 'Cost recommendations'],
      icon: Users,
      color: 'yellow',
      example: 'Peter Samuel'
    },
    readonly: {
      title: 'Read-Only Access',
      description: 'View-only access to dashboards and reports',
      permissions: ['View dashboards', 'Access reports', 'Basic monitoring'],
      icon: Users,
      color: 'gray',
      example: 'James Osteen'
    }
  };

  const addUser = (role) => {
    const newUser = {
      id: `user-${Date.now()}`,
      name: '',
      email: '',
      title: '',
      isNew: true
    };

    updateData('userHierarchy', {
      [role]: [...data?.userHierarchy?.[role], newUser]
    });
  };

  const updateUser = (role, userId, field, value) => {
    updateData('userHierarchy', {
      [role]: data?.userHierarchy?.[role]?.map(user =>
        user?.id === userId ? { ...user, [field]: value, isNew: false } : user
      )
    });
  };

  const removeUser = (role, userId) => {
    updateData('userHierarchy', {
      [role]: data?.userHierarchy?.[role]?.filter(user => user?.id !== userId)
    });
  };

  const populateExample = (role) => {
    const roleData = roleDefinitions?.[role];
    const exampleUser = {
      id: `example-${role}-${Date.now()}`,
      name: roleData?.example,
      email: `${roleData?.example?.toLowerCase()?.replace(' ', '.')}@cloudbinary.com`,
      title: roleData?.title,
      isNew: false
    };

    updateData('userHierarchy', {
      [role]: [...data?.userHierarchy?.[role], exampleUser]
    });
  };

  const getColorClasses = (color) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      gray: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors?.[color] || colors?.gray;
  };

  const totalUsers = Object.values(data?.userHierarchy)?.reduce((sum, users) => sum + users?.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2" />
          User Hierarchy Configuration
        </h3>
        <p className="text-gray-600 mb-6">
          Define the organizational structure and assign initial users to their respective roles.
        </p>
        
        {totalUsers > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-green-700">
                {totalUsers} user{totalUsers > 1 ? 's' : ''} configured across all roles
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  Object.keys(roleDefinitions)?.forEach(role => {
                    populateExample(role);
                  });
                }}
              >
                Auto-populate with examples
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Role Selection */}
        <div className="lg:col-span-1">
          <h4 className="font-medium text-gray-900 mb-4">Role Levels</h4>
          <div className="space-y-2">
            {Object.entries(roleDefinitions)?.map(([key, role]) => (
              <button
                key={key}
                onClick={() => setActiveRole(key)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  activeRole === key 
                    ? getColorClasses(role?.color) 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{role?.title}</div>
                    <div className="text-sm opacity-75">
                      {data?.userHierarchy?.[key]?.length} user{data?.userHierarchy?.[key]?.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <role.icon className="h-4 w-4" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Role Configuration */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  {roleDefinitions?.[activeRole]?.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {roleDefinitions?.[activeRole]?.description}
                </p>
              </div>
              <Button 
                onClick={() => addUser(activeRole)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add User
              </Button>
            </div>

            {/* Permissions */}
            <div className="mb-6">
              <h5 className="font-medium text-gray-900 mb-2">Permissions</h5>
              <div className="flex flex-wrap gap-2">
                {roleDefinitions?.[activeRole]?.permissions?.map((permission, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>

            {/* Users List */}
            <div className="space-y-4">
              {data?.userHierarchy?.[activeRole]?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p>No users assigned to this role yet</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => populateExample(activeRole)}
                    className="mt-2"
                  >
                    Add example user
                  </Button>
                </div>
              ) : (
                data?.userHierarchy?.[activeRole]?.map((user, index) => (
                  <div key={user?.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <Input
                          value={user?.name}
                          onChange={(e) => updateUser(activeRole, user?.id, 'name', e?.target?.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="email"
                            value={user?.email}
                            onChange={(e) => updateUser(activeRole, user?.id, 'email', e?.target?.value)}
                            placeholder="john@company.com"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex items-end">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title
                          </label>
                          <Input
                            value={user?.title}
                            onChange={(e) => updateUser(activeRole, user?.id, 'title', e?.target?.value)}
                            placeholder="Job Title"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeUser(activeRole, user?.id)}
                          className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Bulk Import Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-2">Bulk User Import</h4>
        <p className="text-gray-600 text-sm mb-4">
          Import users from CSV file or integrate with your existing identity provider.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            Import from CSV
          </Button>
          <Button variant="outline" size="sm">
            Connect Identity Provider
          </Button>
          <Button variant="outline" size="sm">
            Send Invitations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserHierarchyStep;