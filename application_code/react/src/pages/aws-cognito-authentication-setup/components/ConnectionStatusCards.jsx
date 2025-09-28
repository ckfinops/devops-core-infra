import React from 'react';
import { Shield, Zap, Database, CheckCircle, AlertTriangle, Users, Activity } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const ConnectionStatusCards = ({ statusData }) => {
  const getStatusIcon = (status) => {
    return status === 'connected' 
      ? <CheckCircle className="h-5 w-5 text-green-500" />
      : <AlertTriangle className="h-5 w-5 text-red-500" />;
  };

  const getStatusColor = (status) => {
    return status === 'connected' ?'bg-green-100 text-green-800' :'bg-red-100 text-red-800';
  };

  const formatLastActivity = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const cards = [
    {
      title: 'Cognito User Pool',
      icon: Shield,
      status: statusData?.cognitoPool?.status,
      metrics: [
        { label: 'Pool ID', value: statusData?.cognitoPool?.userPoolId },
        { label: 'Active Users', value: statusData?.cognitoPool?.activeUsers },
        { label: 'Auth Success Rate', value: `${statusData?.cognitoPool?.authSuccessRate}%` },
        { label: 'Health Check', value: formatLastActivity(statusData?.cognitoPool?.lastHealthCheck) }
      ]
    },
    {
      title: 'Lambda Function',
      icon: Zap,
      status: statusData?.lambdaFunction?.status,
      metrics: [
        { label: 'Function', value: statusData?.lambdaFunction?.functionName },
        { label: 'Runtime', value: statusData?.lambdaFunction?.runtime },
        { label: 'Success Rate', value: `${statusData?.lambdaFunction?.successRate}%` },
        { label: 'Avg Duration', value: statusData?.lambdaFunction?.avgDuration }
      ]
    },
    {
      title: 'DynamoDB Table',
      icon: Database,
      status: statusData?.dynamoDBTable?.status,
      metrics: [
        { label: 'Table', value: statusData?.dynamoDBTable?.tableName },
        { label: 'Item Count', value: statusData?.dynamoDBTable?.itemCount },
        { label: 'Read/Write', value: `${statusData?.dynamoDBTable?.readCapacity}/${statusData?.dynamoDBTable?.writeCapacity}` },
        { label: 'Last Sync', value: formatLastActivity(statusData?.dynamoDBTable?.lastSync) }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {cards?.map((card, index) => {
        const Icon = card?.icon;
        return (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{card?.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(card?.status)}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(card?.status)}`}>
                  {card?.status === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {card?.metrics?.map((metric, metricIndex) => (
                <div key={metricIndex} className="flex justify-between">
                  <span className="text-sm text-gray-600">{metric?.label}:</span>
                  <span className="text-sm font-medium text-gray-900">{metric?.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Integration Status</span>
                {card?.status === 'connected' ? (
                  <div className="flex items-center text-green-600">
                    <Activity className="h-4 w-4 mr-1" />
                    <span className="text-xs">Healthy</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span className="text-xs">Error</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConnectionStatusCards;