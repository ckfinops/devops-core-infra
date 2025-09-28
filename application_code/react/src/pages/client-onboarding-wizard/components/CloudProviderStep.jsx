import React, { useState } from 'react';
import { Cloud, CheckCircle, AlertCircle, Key, Settings } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const CloudProviderStep = ({ data, updateData }) => {
  const [testingConnection, setTestingConnection] = useState({});

  const handleProviderToggle = (provider) => {
    updateData('cloudProviders', {
      [provider]: {
        ...data?.cloudProviders?.[provider],
        enabled: !data?.cloudProviders?.[provider]?.enabled
      }
    });
  };

  const handleProviderDataChange = (provider, field, value) => {
    updateData('cloudProviders', {
      [provider]: {
        ...data?.cloudProviders?.[provider],
        [field]: value
      }
    });
  };

  const testConnection = async (provider) => {
    setTestingConnection({ ...testingConnection, [provider]: true });
    
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setTestingConnection({ ...testingConnection, [provider]: false });
    
    // For demo purposes, always return success
    alert(`${provider?.toUpperCase()} connection test successful!`);
  };

  const providers = [
    {
      id: 'aws',
      name: 'Amazon Web Services',
      icon: '🔶',
      description: 'Connect your AWS account for cost monitoring and optimization',
      fields: [
        { key: 'accountId', label: 'Account ID', placeholder: '123456789012' },
        { key: 'region', label: 'Default Region', placeholder: 'us-east-1' }
      ]
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      icon: '🔷',
      description: 'Connect your Azure subscription for comprehensive cost tracking',
      fields: [
        { key: 'subscriptionId', label: 'Subscription ID', placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
        { key: 'resourceGroup', label: 'Resource Group', placeholder: 'production-rg' }
      ]
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform',
      icon: '🟡',
      description: 'Connect your GCP project for unified cloud cost management',
      fields: [
        { key: 'projectId', label: 'Project ID', placeholder: 'my-project-123' },
        { key: 'region', label: 'Default Region', placeholder: 'us-central1' }
      ]
    }
  ];

  const enabledProvidersCount = Object.values(data?.cloudProviders)?.filter(p => p?.enabled)?.length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Cloud className="h-5 w-5 mr-2" />
          Cloud Provider Setup
        </h3>
        <p className="text-gray-600 mb-6">
          Configure secure connections to your cloud providers for automated cost discovery and monitoring.
        </p>
        
        {enabledProvidersCount > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-700">
                {enabledProvidersCount} cloud provider{enabledProvidersCount > 1 ? 's' : ''} selected
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {providers?.map((provider) => (
          <div 
            key={provider?.id}
            className={`border rounded-lg p-6 transition-all ${
              data?.cloudProviders?.[provider?.id]?.enabled 
                ? 'border-blue-300 bg-blue-50' :'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{provider?.icon}</span>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    {provider?.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {provider?.description}
                  </p>
                </div>
              </div>
              <Checkbox
                checked={data?.cloudProviders?.[provider?.id]?.enabled}
                onChange={() => handleProviderToggle(provider?.id)}
                className="mt-1"
              />
            </div>

            {data?.cloudProviders?.[provider?.id]?.enabled && (
              <div className="space-y-4 mt-4 pt-4 border-t border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider?.fields?.map((field) => (
                    <div key={field?.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field?.label}
                      </label>
                      <Input
                        value={data?.cloudProviders?.[provider?.id]?.[field?.key] || ''}
                        onChange={(e) => handleProviderDataChange(provider?.id, field?.key, e?.target?.value)}
                        placeholder={field?.placeholder}
                      />
                    </div>
                  ))}
                </div>

                {/* Credential Management */}
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Key className="h-4 w-4 mr-2" />
                    Secure Credential Management
                  </h5>
                  <p className="text-sm text-gray-600 mb-3">
                    {provider?.id === 'aws' && 'Use IAM roles and cross-account access for secure authentication.'}
                    {provider?.id === 'azure' && 'Use service principals and managed identities for secure access.'}
                    {provider?.id === 'gcp' && 'Use service accounts and IAM for secure authentication.'}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testConnection(provider?.id)}
                      disabled={testingConnection?.[provider?.id]}
                      className="flex items-center gap-2"
                    >
                      {testingConnection?.[provider?.id] ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          Testing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Test Connection
                        </>
                      )}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Advanced Config
                    </Button>
                  </div>
                </div>

                {/* Permissions Verification */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h6 className="font-medium text-yellow-800">Required Permissions</h6>
                      <p className="text-sm text-yellow-700 mt-1">
                        {provider?.id === 'aws' && 'Billing:ViewBilling, Cost:GetReservation*, CE:Get*, Organizations:List*'}
                        {provider?.id === 'azure' && 'Cost Management Reader, Billing Reader, Subscription Reader'}
                        {provider?.id === 'gcp' && 'Cloud Asset Viewer, BigQuery Data Viewer, Service Usage Consumer'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Security & Compliance Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Security & Compliance</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• All credentials are encrypted and stored securely</li>
          <li>• Connections use least-privilege access principles</li>
          <li>• Data is processed in compliance with SOC 2 and ISO 27001 standards</li>
          <li>• Connection status is monitored continuously</li>
        </ul>
      </div>
    </div>
  );
};

export default CloudProviderStep;