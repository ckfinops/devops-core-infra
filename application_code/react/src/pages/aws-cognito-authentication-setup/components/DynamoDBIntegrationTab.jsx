import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Database, RefreshCw, TestTube, Eye, RefreshCw as SyncIcon, Users } from 'lucide-react';

const DynamoDBIntegrationTab = ({ statusData }) => {
  const [syncStatus, setSyncStatus] = useState('synchronized');
  const [lastSync, setLastSync] = useState('2025-01-19T10:30:00Z');

  const tableSchema = {
    tableName: 'finops-users',
    partitionKey: {
      name: 'username',
      type: 'String'
    },
    attributes: [
      { name: 'username', type: 'String', description: 'Primary key - unique username' },
      { name: 'email', type: 'String', description: 'User email address' },
      { name: 'cognitoSub', type: 'String', description: 'Cognito user pool subject ID' },
      { name: 'role', type: 'String', description: 'User role (Super User, Admin, Read Only)' },
      { name: 'company', type: 'String', description: 'Client company name' },
      { name: 'department', type: 'String', description: 'User department' },
      { name: 'status', type: 'String', description: 'Account status (active, inactive, pending)' },
      { name: 'createdAt', type: 'String', description: 'ISO timestamp of account creation' },
      { name: 'updatedAt', type: 'String', description: 'ISO timestamp of last update' },
      { name: 'lastLogin', type: 'String', description: 'ISO timestamp of last login' }
    ]
  };

  const userAttributeMappings = [
    {
      cognitoAttribute: 'sub',
      dynamoField: 'cognitoSub',
      mapped: true,
      description: 'Cognito user unique identifier'
    },
    {
      cognitoAttribute: 'email',
      dynamoField: 'email',
      mapped: true,
      description: 'User email address'
    },
    {
      cognitoAttribute: 'preferred_username',
      dynamoField: 'username',
      mapped: true,
      description: 'Username for login'
    },
    {
      cognitoAttribute: 'custom:role',
      dynamoField: 'role',
      mapped: true,
      description: 'User role assignment'
    },
    {
      cognitoAttribute: 'custom:company',
      dynamoField: 'company',
      mapped: true,
      description: 'Client company association'
    },
    {
      cognitoAttribute: 'custom:department',
      dynamoField: 'department',
      mapped: true,
      description: 'Department assignment'
    }
  ];

  const recentUsers = [
    {
      username: 'joel.kummari',
      email: 'joel@cloudbinary.com',
      role: 'Executive Level',
      company: 'Cloud Binary',
      status: 'active',
      createdAt: '2025-01-15T14:30:00Z'
    },
    {
      username: 'jessi.kummari',
      email: 'jessi@cloudbinary.com',
      role: 'Management Level',
      company: 'Cloud Binary',
      status: 'active',
      createdAt: '2025-01-16T09:15:00Z'
    },
    {
      username: 'john.david',
      email: 'john@cloudbinary.com',
      role: 'Operational Level',
      company: 'Cloud Binary',
      status: 'active',
      createdAt: '2025-01-17T11:20:00Z'
    }
  ];

  const handleTestConnection = async () => {
    console.log('Testing DynamoDB connection...');
    // Implementation for testing DynamoDB connection
  };

  const handleSyncData = async () => {
    console.log('Syncing Cognito users with DynamoDB...');
    setSyncStatus('syncing');
    // Simulate sync process
    setTimeout(() => {
      setSyncStatus('synchronized');
      setLastSync(new Date()?.toISOString());
    }, 3000);
  };

  const handleViewTable = () => {
    console.log('Opening DynamoDB table in AWS Console...');
    // Implementation to open AWS Console
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSyncStatusColor = (status) => {
    switch (status) {
      case 'synchronized':
        return 'bg-green-100 text-green-800';
      case 'syncing':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
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
          <h2 className="text-lg font-semibold text-gray-900">DynamoDB Integration</h2>
          <p className="text-sm text-gray-600">Monitor finops-users table schema and data synchronization</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={handleViewTable} className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>View Table</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleTestConnection} className="flex items-center space-x-2">
            <TestTube className="h-4 w-4" />
            <span>Test Connection</span>
          </Button>
          <Button 
            size="sm" 
            onClick={handleSyncData}
            disabled={syncStatus === 'syncing'}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            <span>Sync Data</span>
          </Button>
        </div>
      </div>
      {/* Table Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Table Information</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Table Name:</span>
              <span className="text-sm font-medium text-gray-900">{tableSchema?.tableName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Partition Key:</span>
              <span className="text-sm font-medium text-gray-900">{tableSchema?.partitionKey?.name} ({tableSchema?.partitionKey?.type})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Item Count:</span>
              <span className="text-sm font-medium text-gray-900">{statusData?.itemCount || 45}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Region:</span>
              <span className="text-sm font-medium text-gray-900">{statusData?.region || 'us-east-1'}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Read Capacity:</span>
              <span className="text-sm font-medium text-gray-900">{statusData?.readCapacity || 5} RCU</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Write Capacity:</span>
              <span className="text-sm font-medium text-gray-900">{statusData?.writeCapacity || 5} WCU</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Sync:</span>
              <span className="text-sm font-medium text-gray-900">{formatTimestamp(lastSync)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Sync Status:</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSyncStatusColor(syncStatus)}`}>
                {syncStatus === 'syncing' ? 'Syncing...' : 'Synchronized'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Schema Definition */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Table Schema</h3>
        
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attribute Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableSchema?.attributes?.map((attr, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {attr?.name}
                    {attr?.name === tableSchema?.partitionKey?.name && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        PK
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {attr?.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {attr?.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Attribute Mappings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <SyncIcon className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-medium text-gray-900">User Attribute Mappings</h3>
        </div>
        
        <div className="space-y-3">
          {userAttributeMappings?.map((mapping, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">{mapping?.cognitoAttribute}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-sm font-medium text-gray-900">{mapping?.dynamoField}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      mapping?.mapped ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {mapping?.mapped ? 'Mapped' : 'Not Mapped'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{mapping?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Users */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
        </div>
        
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers?.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user?.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                      {user?.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user?.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatTimestamp(user?.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DynamoDBIntegrationTab;