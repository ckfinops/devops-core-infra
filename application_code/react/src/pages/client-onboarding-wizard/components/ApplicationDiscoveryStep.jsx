import React, { useState } from 'react';
import { Server, Search, Plus, Trash2, CheckCircle } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ApplicationDiscoveryStep = ({ data, updateData }) => {
  const [discoveryInProgress, setDiscoveryInProgress] = useState(false);

  const handleDiscoveryMethodChange = (method) => {
    updateData('applications', {
      discoveryMethod: method
    });
  };

  const addManualApplication = () => {
    const newApp = {
      id: `app-${Date.now()}`,
      name: '',
      environment: 'production',
      provider: 'AWS',
      status: 'Active',
      description: ''
    };

    updateData('applications', {
      manualApps: [...data?.applications?.manualApps, newApp]
    });
  };

  const updateApplication = (appId, field, value) => {
    updateData('applications', {
      manualApps: data?.applications?.manualApps?.map(app =>
        app?.id === appId ? { ...app, [field]: value } : app
      )
    });
  };

  const removeApplication = (appId) => {
    updateData('applications', {
      manualApps: data?.applications?.manualApps?.filter(app => app?.id !== appId)
    });
  };

  const startAutomatedDiscovery = async () => {
    setDiscoveryInProgress(true);
    
    // Simulate discovery process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add discovered applications
    const discoveredApps = [
      {
        id: 'cb-1',
        name: 'CB-1',
        environment: 'production',
        provider: 'AWS',
        status: 'Active',
        description: 'Primary web application'
      },
      {
        id: 'cb-2',
        name: 'CB-2',
        environment: 'production',
        provider: 'Azure',
        status: 'Active',
        description: 'Data processing service'
      },
      {
        id: 'cb-3',
        name: 'CB-3',
        environment: 'production',
        provider: 'GCP',
        status: 'Active',
        description: 'Analytics platform'
      }
    ];

    updateData('applications', {
      manualApps: [...data?.applications?.manualApps, ...discoveredApps]
    });

    setDiscoveryInProgress(false);
  };

  const populateExamples = () => {
    const exampleApps = [
      {
        id: 'cb-1',
        name: 'CB-1',
        environment: 'production',
        provider: 'AWS',
        status: 'Active',
        description: 'Primary web application hosted on AWS EC2'
      },
      {
        id: 'cb-2',
        name: 'CB-2',
        environment: 'production',
        provider: 'Azure',
        status: 'Active',
        description: 'Data processing service on Azure Functions'
      },
      {
        id: 'cb-3',
        name: 'CB-3',
        environment: 'staging',
        provider: 'GCP',
        status: 'Development',
        description: 'Analytics platform on Google Cloud Run'
      },
      {
        id: 'cb-4',
        name: 'CB-4',
        environment: 'development',
        provider: 'AWS',
        status: 'Development',
        description: 'New microservice in development'
      },
      {
        id: 'cb-5',
        name: 'CB-5',
        environment: 'testing',
        provider: 'Azure',
        status: 'Testing',
        description: 'Mobile API backend in testing phase'
      }
    ];

    updateData('applications', {
      manualApps: exampleApps
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Active': 'bg-green-100 text-green-800',
      'Development': 'bg-yellow-100 text-yellow-800',
      'Testing': 'bg-blue-100 text-blue-800',
      'Inactive': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusClasses?.[status] || statusClasses?.Inactive
      }`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Server className="h-5 w-5 mr-2" />
          Application Discovery
        </h3>
        <p className="text-gray-600 mb-6">
          Discover and register applications across your cloud environments for comprehensive cost tracking.
        </p>
      </div>
      {/* Discovery Method Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Discovery Method</h4>
        <div className="space-y-3">
          <label className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="discoveryMethod"
              value="automated"
              checked={data?.applications?.discoveryMethod === 'automated'}
              onChange={(e) => handleDiscoveryMethodChange(e?.target?.value)}
              className="mt-1"
            />
            <div className="ml-3">
              <div className="font-medium text-gray-900">Automated Discovery</div>
              <div className="text-sm text-gray-600">
                Scan connected cloud accounts to automatically discover applications and resources
              </div>
            </div>
          </label>
          
          <label className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="discoveryMethod"
              value="manual"
              checked={data?.applications?.discoveryMethod === 'manual'}
              onChange={(e) => handleDiscoveryMethodChange(e?.target?.value)}
              className="mt-1"
            />
            <div className="ml-3">
              <div className="font-medium text-gray-900">Manual Registration</div>
              <div className="text-sm text-gray-600">
                Manually register applications and configure cost tracking
              </div>
            </div>
          </label>

          <label className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="discoveryMethod"
              value="hybrid"
              checked={data?.applications?.discoveryMethod === 'hybrid'}
              onChange={(e) => handleDiscoveryMethodChange(e?.target?.value)}
              className="mt-1"
            />
            <div className="ml-3">
              <div className="font-medium text-gray-900">Hybrid Approach</div>
              <div className="text-sm text-gray-600">
                Combine automated discovery with manual application registration
              </div>
            </div>
          </label>
        </div>

        {/* Automated Discovery Controls */}
        {(data?.applications?.discoveryMethod === 'automated' || data?.applications?.discoveryMethod === 'hybrid') && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h5 className="font-medium text-gray-900">Asset Discovery Configuration</h5>
                <p className="text-sm text-gray-600">
                  Configure automated scanning parameters and filters
                </p>
              </div>
              <Button
                onClick={startAutomatedDiscovery}
                disabled={discoveryInProgress}
                className="flex items-center gap-2"
              >
                {discoveryInProgress ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Start Discovery
                  </>
                )}
              </Button>
            </div>

            {discoveryInProgress && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  <span className="text-blue-700">
                    Scanning cloud resources... This may take a few minutes.
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Application Registry */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-gray-900">Application Registry</h4>
            <p className="text-sm text-gray-600">
              {data?.applications?.manualApps?.length} application{data?.applications?.manualApps?.length !== 1 ? 's' : ''} registered
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={populateExamples}
            >
              Load Examples
            </Button>
            <Button
              onClick={addManualApplication}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Application
            </Button>
          </div>
        </div>

        {data?.applications?.manualApps?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Server className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p>No applications registered yet</p>
            <p className="text-sm">Start by adding an application or running automated discovery</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.applications?.manualApps?.map((app) => (
              <div key={app?.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Application Name
                    </label>
                    <Input
                      value={app?.name}
                      onChange={(e) => updateApplication(app?.id, 'name', e?.target?.value)}
                      placeholder="CB-1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Environment
                    </label>
                    <select
                      value={app?.environment}
                      onChange={(e) => updateApplication(app?.id, 'environment', e?.target?.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="production">Production</option>
                      <option value="staging">Staging</option>
                      <option value="development">Development</option>
                      <option value="testing">Testing</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cloud Provider
                    </label>
                    <select
                      value={app?.provider}
                      onChange={(e) => updateApplication(app?.id, 'provider', e?.target?.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="AWS">AWS</option>
                      <option value="Azure">Azure</option>
                      <option value="GCP">Google Cloud</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <div className="flex items-center justify-between">
                      <select
                        value={app?.status}
                        onChange={(e) => updateApplication(app?.id, 'status', e?.target?.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mr-2"
                      >
                        <option value="Active">Active</option>
                        <option value="Development">Development</option>
                        <option value="Testing">Testing</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeApplication(app?.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Input
                    value={app?.description}
                    onChange={(e) => updateApplication(app?.id, 'description', e?.target?.value)}
                    placeholder="Brief description of the application"
                  />
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  {getStatusBadge(app?.status)}
                  <div className="text-sm text-gray-500">
                    {app?.provider} • {app?.environment}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Discovery Summary */}
      {data?.applications?.manualApps?.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <div>
              <h5 className="font-medium text-green-800">Application Discovery Complete</h5>
              <p className="text-sm text-green-700 mt-1">
                {data?.applications?.manualApps?.length} applications have been registered and will be monitored for cost optimization opportunities.
              </p>
              <div className="mt-2 text-xs text-green-600">
                Active: {data?.applications?.manualApps?.filter(app => app?.status === 'Active')?.length} • 
                Development: {data?.applications?.manualApps?.filter(app => app?.status === 'Development')?.length} • 
                Testing: {data?.applications?.manualApps?.filter(app => app?.status === 'Testing')?.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDiscoveryStep;