import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { AlertTriangle, CheckCircle, Cloud, DollarSign, Settings } from 'lucide-react';

const CloudConnectionsTab = ({ tenantId }) => {
  const [connections] = useState([
    {
      id: 'aws-1',
      provider: 'AWS',
      accountId: '123456789012',
      region: 'us-east-1',
      status: 'connected',
      health: 'healthy',
      billing: 'active',
      lastSync: '2025-01-19T10:30:00Z',
      monthlySpend: 12540
    },
    {
      id: 'azure-1',
      provider: 'Azure',
      subscriptionId: 'sub-456def',
      region: 'East US',
      status: 'connected',
      health: 'healthy',
      billing: 'active',
      lastSync: '2025-01-19T10:25:00Z',
      monthlySpend: 8750
    },
    {
      id: 'gcp-1',
      provider: 'GCP',
      projectId: 'cloudbinary-prod-789',
      region: 'us-central1',
      status: 'warning',
      health: 'degraded',
      billing: 'active',
      lastSync: '2025-01-19T09:45:00Z',
      monthlySpend: 3275
    }
  ]);

  const getStatusIcon = (status, health) => {
    if (status === 'connected' && health === 'healthy') {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
  };

  const getStatusColor = (status, health) => {
    if (status === 'connected' && health === 'healthy') {
      return 'bg-green-100 text-green-800';
    }
    if (status === 'connected' && health === 'degraded') {
      return 'bg-yellow-100 text-yellow-800';
    }
    return 'bg-red-100 text-red-800';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const formatLastSync = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProviderIcon = (provider) => {
    return <Cloud className="h-6 w-6 text-gray-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Cloud Connections</h2>
          <p className="text-sm text-gray-600">Monitor cloud provider integrations and billing status</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Settings className="h-4 w-4" />
          <span>Configure Connections</span>
        </Button>
      </div>
      {/* Connection Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {connections?.map((connection) => (
          <div key={connection?.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getProviderIcon(connection?.provider)}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{connection?.provider}</h3>
                  <p className="text-sm text-gray-500">
                    {connection?.accountId || connection?.subscriptionId || connection?.projectId}
                  </p>
                </div>
              </div>
              {getStatusIcon(connection?.status, connection?.health)}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(connection?.status, connection?.health)}`}>
                  {connection?.health === 'healthy' ? 'Healthy' : 'Degraded'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Region</span>
                <span className="text-sm text-gray-900">{connection?.region}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monthly Spend</span>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(connection?.monthlySpend)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Sync</span>
                <span className="text-sm text-gray-900">{formatLastSync(connection?.lastSync)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Billing</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  connection?.billing === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {connection?.billing === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                Test Connection
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Connection Health Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Connection Health Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {connections?.filter(c => c?.status === 'connected' && c?.health === 'healthy')?.length}
            </div>
            <div className="text-sm text-gray-600">Healthy Connections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {connections?.filter(c => c?.health === 'degraded')?.length}
            </div>
            <div className="text-sm text-gray-600">Degraded Connections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(connections?.reduce((sum, c) => sum + c?.monthlySpend, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Monthly Spend</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudConnectionsTab;