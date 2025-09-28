import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Zap, Play, Clock, CheckCircle, AlertTriangle, Code, Activity } from 'lucide-react';

const LambdaIntegrationTab = ({ statusData }) => {
  const [executionLogs, setExecutionLogs] = useState([
    {
      id: 'log-1',
      timestamp: '2025-01-19T10:25:00Z',
      requestId: 'abc123-def456-ghi789',
      event: 'PreAuthentication_Authentication',
      duration: '245ms',
      status: 'SUCCESS',
      billedDuration: '300ms',
      memoryUsed: '64MB'
    },
    {
      id: 'log-2',
      timestamp: '2025-01-19T10:20:00Z',
      requestId: 'xyz789-uvw456-rst123',
      event: 'PreAuthentication_Authentication',
      duration: '198ms',
      status: 'SUCCESS',
      billedDuration: '200ms',
      memoryUsed: '58MB'
    },
    {
      id: 'log-3',
      timestamp: '2025-01-19T10:15:00Z',
      requestId: 'pqr456-mno789-jkl123',
      event: 'PreAuthentication_Authentication',
      duration: '312ms',
      status: 'ERROR',
      billedDuration: '400ms',
      memoryUsed: '71MB'
    }
  ]);

  const lambdaConfig = {
    functionName: 'cog-preauthentication',
    runtime: 'nodejs18.x',
    handler: 'index.handler',
    memorySize: '128 MB',
    timeout: '30 seconds',
    lastModified: '2025-01-15T14:30:00Z',
    version: '$LATEST',
    triggers: [
      { name: 'PreAuthentication', enabled: true },
      { name: 'PostAuthentication', enabled: false },
      { name: 'PreSignUp', enabled: false }
    ]
  };

  const triggerMappings = [
    {
      trigger: 'Pre Authentication',
      description: 'Executed before user authentication',
      lambdaFunction: 'cog-preauthentication',
      enabled: true,
      lastExecution: '2025-01-19T10:25:00Z'
    },
    {
      trigger: 'Post Authentication',
      description: 'Executed after successful authentication',
      lambdaFunction: 'Not Configured',
      enabled: false,
      lastExecution: 'Never'
    },
    {
      trigger: 'Pre Sign-up',
      description: 'Executed before user registration',
      lambdaFunction: 'Not Configured',
      enabled: false,
      lastExecution: 'Never'
    },
    {
      trigger: 'Post Confirmation',
      description: 'Executed after user confirms registration',
      lambdaFunction: 'Not Configured',
      enabled: false,
      lastExecution: 'Never'
    }
  ];

  const handleTestFunction = async () => {
    console.log('Testing Lambda function...');
    // Implementation for testing Lambda function
  };

  const handleViewLogs = () => {
    console.log('Opening CloudWatch logs...');
    // Implementation to open CloudWatch logs
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'ERROR':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'ERROR':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Lambda Integration</h2>
          <p className="text-sm text-gray-600">Configure cog-preauthentication function with trigger mappings</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={handleViewLogs} className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>View Logs</span>
          </Button>
          <Button size="sm" onClick={handleTestFunction} className="flex items-center space-x-2">
            <Play className="h-4 w-4" />
            <span>Test Function</span>
          </Button>
        </div>
      </div>
      {/* Function Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-medium text-gray-900">Function Configuration</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Function Name:</span>
              <span className="text-sm font-medium text-gray-900">{lambdaConfig?.functionName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Runtime:</span>
              <span className="text-sm font-medium text-gray-900">{lambdaConfig?.runtime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Handler:</span>
              <span className="text-sm font-medium text-gray-900">{lambdaConfig?.handler}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Memory Size:</span>
              <span className="text-sm font-medium text-gray-900">{lambdaConfig?.memorySize}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Timeout:</span>
              <span className="text-sm font-medium text-gray-900">{lambdaConfig?.timeout}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Version:</span>
              <span className="text-sm font-medium text-gray-900">{lambdaConfig?.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Modified:</span>
              <span className="text-sm font-medium text-gray-900">{formatTimestamp(lambdaConfig?.lastModified)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                statusData?.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {statusData?.status === 'connected' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Trigger Mappings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Trigger Mappings</h3>
        
        <div className="space-y-4">
          {triggerMappings?.map((mapping, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-sm font-medium text-gray-900">{mapping?.trigger}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      mapping?.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {mapping?.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{mapping?.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Function: {mapping?.lambdaFunction}</span>
                    <span>Last Execution: {formatTimestamp(mapping?.lastExecution)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                  {mapping?.enabled && (
                    <Button variant="outline" size="sm">
                      Test
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Execution Monitoring */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Executions</h3>
        
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Memory Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {executionLogs?.map((log) => (
                <tr key={log?.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatTimestamp(log?.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log?.requestId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log?.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log?.memoryUsed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(log?.status)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log?.status)}`}>
                        {log?.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Code className="h-3 w-3" />
                      <span>View Details</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {statusData?.successRate || 99.2}%
          </div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {statusData?.avgDuration || '250ms'}
          </div>
          <div className="text-sm text-gray-600">Avg Duration</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">
            1,247
          </div>
          <div className="text-sm text-gray-600">Total Invocations</div>
        </div>
      </div>
    </div>
  );
};

export default LambdaIntegrationTab;