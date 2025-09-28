import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Server, Database, Globe, Activity, Search, Filter } from 'lucide-react';

const ApplicationsAssetsTab = ({ applications }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock application data for Cloud Binary
  const applicationData = [
    {
      id: 'CB-1',
      name: 'CB-1 Production',
      type: 'Web Application',
      environment: 'Production',
      status: 'Running',
      health: 'Healthy',
      instances: 3,
      cpu: '65%',
      memory: '78%',
      cost: 2840,
      lastDeployment: '2025-01-15T14:30:00Z'
    },
    {
      id: 'CB-2',
      name: 'CB-2 Analytics',
      type: 'Data Pipeline',
      environment: 'Production',
      status: 'Running',
      health: 'Healthy',
      instances: 2,
      cpu: '45%',
      memory: '62%',
      cost: 1950,
      lastDeployment: '2025-01-12T09:15:00Z'
    },
    {
      id: 'CB-3',
      name: 'CB-3 API Gateway',
      type: 'API Service',
      environment: 'Production',
      status: 'Running',
      health: 'Warning',
      instances: 4,
      cpu: '82%',
      memory: '91%',
      cost: 3200,
      lastDeployment: '2025-01-18T16:45:00Z'
    },
    {
      id: 'CB-4',
      name: 'CB-4 Processing',
      type: 'Background Service',
      environment: 'Production',
      status: 'Running',
      health: 'Healthy',
      instances: 2,
      cpu: '38%',
      memory: '54%',
      cost: 1620,
      lastDeployment: '2025-01-10T11:20:00Z'
    },
    {
      id: 'CB-5',
      name: 'CB-5 Staging',
      type: 'Web Application',
      environment: 'Staging',
      status: 'Stopped',
      health: 'Offline',
      instances: 1,
      cpu: '0%',
      memory: '0%',
      cost: 145,
      lastDeployment: '2025-01-16T13:10:00Z'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Running', label: 'Running' },
    { value: 'Stopped', label: 'Stopped' },
    { value: 'Error', label: 'Error' }
  ];

  const filteredApplications = applicationData?.filter(app => {
    const matchesSearch = app?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         app?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Running':
        return 'bg-green-100 text-green-800';
      case 'Stopped':
        return 'bg-gray-100 text-gray-800';
      case 'Error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'Healthy':
        return 'text-green-600';
      case 'Warning':
        return 'text-yellow-600';
      case 'Critical':
        return 'text-red-600';
      case 'Offline':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Web Application':
        return <Globe className="h-5 w-5" />;
      case 'Data Pipeline':
        return <Database className="h-5 w-5" />;
      case 'API Service':
        return <Server className="h-5 w-5" />;
      default:
        return <Server className="h-5 w-5" />;
    }
  };

  const formatCost = (cost) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(cost);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Applications & Assets</h2>
          <p className="text-sm text-gray-600">Monitor client application inventory and infrastructure</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Activity className="h-4 w-4" />
          <span>Infrastructure Discovery</span>
        </Button>
      </div>
      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="pl-10"
          />
        </div>
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          className="w-48"
        />
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </Button>
      </div>
      {/* Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredApplications?.map((app) => (
          <div key={app?.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gray-100 ${getHealthColor(app?.health)}`}>
                  {getTypeIcon(app?.type)}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{app?.name}</h3>
                  <p className="text-sm text-gray-500">{app?.type} • {app?.environment}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app?.status)}`}>
                {app?.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">Instances</div>
                <div className="text-lg font-semibold text-gray-900">{app?.instances}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Monthly Cost</div>
                <div className="text-lg font-semibold text-gray-900">{formatCost(app?.cost)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">CPU Usage</div>
                <div className="text-sm text-gray-900">{app?.cpu}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Memory Usage</div>
                <div className="text-sm text-gray-900">{app?.memory}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>Health: <span className={getHealthColor(app?.health)}>{app?.health}</span></span>
              <span>Last Deploy: {formatDate(app?.lastDeployment)}</span>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                View Details
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Manage
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {applicationData?.length}
          </div>
          <div className="text-sm text-gray-600">Total Applications</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-green-600">
            {applicationData?.filter(app => app?.status === 'Running')?.length}
          </div>
          <div className="text-sm text-gray-600">Running</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {applicationData?.reduce((sum, app) => sum + app?.instances, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Instances</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {formatCost(applicationData?.reduce((sum, app) => sum + app?.cost, 0))}
          </div>
          <div className="text-sm text-gray-600">Total Cost</div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsAssetsTab;