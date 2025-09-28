import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import { useCognitoAuth } from '../../contexts/CognitoAuthContext';
import { dynamoDBService } from '../../utils/dynamoDBService';
import ConnectionStatusCards from './components/ConnectionStatusCards';
import CognitoSettingsTab from './components/CognitoSettingsTab';
import LambdaIntegrationTab from './components/LambdaIntegrationTab';
import DynamoDBIntegrationTab from './components/DynamoDBIntegrationTab';
import UserManagementTab from './components/UserManagementTab';
import { Shield, Database, Zap, Users, Settings, TestTube } from 'lucide-react';
import Icon from '../../components/AppIcon';


const AWSCognitoAuthenticationSetup = () => {
  const { user } = useCognitoAuth();
  const [activeTab, setActiveTab] = useState('cognito-settings');
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'cognito-settings', label: 'Cognito Settings', icon: Shield },
    { id: 'lambda-integration', label: 'Lambda Integration', icon: Zap },
    { id: 'dynamodb-integration', label: 'DynamoDB Integration', icon: Database },
    { id: 'user-management', label: 'User Management', icon: Users }
  ];

  // Connection status data
  const [statusData, setStatusData] = useState({
    cognitoPool: {
      status: 'connected',
      userPoolId: 'us-east-1_oNkz8iV12',
      clientId: '2ov88v081o7g6lgl0t1epq1gj2',
      region: 'us-east-1',
      activeUsers: 145,
      authSuccessRate: 98.5,
      lastHealthCheck: '2025-01-19T10:30:00Z'
    },
    lambdaFunction: {
      status: 'connected',
      functionName: 'cog-preauthentication',
      runtime: 'nodejs18.x',
      lastInvocation: '2025-01-19T10:25:00Z',
      successRate: 99.2,
      avgDuration: '250ms'
    },
    dynamoDBTable: {
      status: 'connected',
      tableName: 'finops-users',
      region: 'us-east-1',
      itemCount: 45,
      readCapacity: 5,
      writeCapacity: 5,
      lastSync: '2025-01-19T10:30:00Z'
    }
  });

  useEffect(() => {
    initializeConnectionStatus();
  }, []);

  const initializeConnectionStatus = async () => {
    setLoading(true);
    try {
      // Test Cognito connection
      await testCognitoConnection();
      
      // Test DynamoDB connection
      await testDynamoDBConnection();
      
      // Test Lambda function
      await testLambdaConnection();
      
      setConnectionStatus('healthy');
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const testCognitoConnection = async () => {
    // Implementation for testing Cognito connection
    // This would typically involve making a test API call
    console.log('Testing Cognito connection...');
  };

  const testDynamoDBConnection = async () => {
    try {
      // Test DynamoDB connectivity
      await dynamoDBService?.listUsers(1);
      console.log('DynamoDB connection successful');
    } catch (error) {
      console.error('DynamoDB connection failed:', error);
      throw error;
    }
  };

  const testLambdaConnection = async () => {
    // Implementation for testing Lambda function
    console.log('Testing Lambda function...');
  };

  const handleConnectionTest = async () => {
    setLoading(true);
    await initializeConnectionStatus();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'cognito-settings':
        return <CognitoSettingsTab statusData={statusData?.cognitoPool} />;
      case 'lambda-integration':
        return <LambdaIntegrationTab statusData={statusData?.lambdaFunction} />;
      case 'dynamodb-integration':
        return <DynamoDBIntegrationTab statusData={statusData?.dynamoDBTable} />;
      case 'user-management':
        return <UserManagementTab />;
      default:
        return <CognitoSettingsTab statusData={statusData?.cognitoPool} />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar onToggleCollapse={() => {}} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Testing AWS connections...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onToggleCollapse={() => {}} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Setup Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AWS Cognito Authentication Setup</h1>
              <p className="text-sm text-gray-600 mt-1">
                Configure and manage AWS Cognito integration with User Pool ID: {statusData?.cognitoPool?.userPoolId}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleConnectionTest}
                className="flex items-center space-x-2"
              >
                <TestTube className="h-4 w-4" />
                <span>Test Connections</span>
              </Button>
              <Button size="sm" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Configure</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Connection Status Cards */}
            <div className="mb-8">
              <ConnectionStatusCards statusData={statusData} />
            </div>

            {/* Tab Navigation and Content */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {tabs?.map((tab) => {
                    const Icon = tab?.icon;
                    return (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`${
                          activeTab === tab?.id
                            ? 'border-indigo-500 text-indigo-600' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center space-x-2`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tab?.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AWSCognitoAuthenticationSetup;