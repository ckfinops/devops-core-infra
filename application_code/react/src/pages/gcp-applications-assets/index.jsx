import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';

const GCPApplicationsAssets = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('applications');
  const [connectionStatus, setConnectionStatus] = useState('connected'); // connected, disconnected, syncing
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  // Mock GCP data - this would come from GCP API integration
  const gcpMetrics = {
    applications: 8,
    computeInstances: 32,
    appEngineServices: 6,
    cloudSqlDatabases: 4,
    totalCost: 18756.45
  };

  const gcpApplications = [
    {
      id: 'gcp-app-1',
      name: 'Analytics Dashboard',
      projectId: 'analytics-prod-001',
      gcpServices: ['Compute Engine', 'Cloud SQL', 'Cloud Storage', 'Cloud CDN'],
      costAllocation: 3456.78,
      region: 'us-central1',
      tags: ['production', 'analytics', 'dashboard'],
      billingAccount: 'billing-001'
    },
    {
      id: 'gcp-app-2',
      name: 'Machine Learning Pipeline',
      projectId: 'ml-pipeline-prod',
      gcpServices: ['App Engine', 'Cloud Functions', 'BigQuery', 'Cloud AI Platform'],
      costAllocation: 2134.56,
      region: 'us-west1',
      tags: ['ml', 'ai', 'pipeline'],
      billingAccount: 'billing-001'
    },
    {
      id: 'gcp-app-3',
      name: 'Content Management System',
      projectId: 'cms-production',
      gcpServices: ['Google Kubernetes Engine', 'Cloud SQL', 'Cloud Storage'],
      costAllocation: 1567.89,
      region: 'europe-west1',
      tags: ['cms', 'kubernetes', 'content'],
      billingAccount: 'billing-002'
    }
  ];

  const gcpResources = [
    {
      id: 'gcp-resource-1',
      name: 'analytics-frontend-vm',
      type: 'Compute Engine',
      machineType: 'n2-standard-4',
      zone: 'us-central1-a',
      status: 'running',
      monthlyCost: 245.67,
      labels: ['frontend', 'production'],
      project: 'analytics-prod-001'
    },
    {
      id: 'gcp-resource-2',
      name: 'production-postgres-db',
      type: 'Cloud SQL',
      instanceType: 'db-n1-standard-2',
      region: 'us-central1',
      status: 'runnable',
      monthlyCost: 334.56,
      labels: ['database', 'postgres'],
      project: 'analytics-prod-001'
    },
    {
      id: 'gcp-resource-3',
      name: 'ml-training-cluster',
      type: 'Google Kubernetes Engine',
      nodeCount: '6 nodes',
      zone: 'us-west1-b',
      status: 'running',
      monthlyCost: 567.89,
      labels: ['ml', 'training', 'cluster'],
      project: 'ml-pipeline-prod'
    },
    {
      id: 'gcp-resource-4',
      name: 'data-transform-function',
      type: 'Cloud Functions',
      runtime: 'python39',
      region: 'us-central1',
      status: 'active',
      monthlyCost: 89.23,
      labels: ['serverless', 'data-processing'],
      project: 'ml-pipeline-prod'
    }
  ];

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success';
      case 'syncing':
        return 'text-warning';
      default:
        return 'text-error';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected & Synced';
      case 'syncing':
        return 'Syncing...';
      default:
        return 'Disconnected';
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'Compute Engine':
        return 'Server';
      case 'Cloud SQL':
        return 'Database';
      case 'Google Kubernetes Engine':
        return 'Box';
      case 'Cloud Functions':
        return 'Zap';
      default:
        return 'Cloud';
    }
  };

  const getResourceColor = (type) => {
    switch (type) {
      case 'Compute Engine':
        return 'text-blue-500';
      case 'Cloud SQL':
        return 'text-green-500';
      case 'Google Kubernetes Engine':
        return 'text-purple-500';
      case 'Cloud Functions':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  const getResourceBadgeColor = (type) => {
    switch (type) {
      case 'Compute Engine':
        return 'bg-blue-100 text-blue-800';
      case 'Cloud SQL':
        return 'bg-green-100 text-green-800';
      case 'Google Kubernetes Engine':
        return 'bg-purple-100 text-purple-800';
      case 'Cloud Functions':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>GCP Applications & Assets - Cloud Cost Manager</title>
        <meta name="description" content="Comprehensive management of applications and resources within Google Cloud Platform environments" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />
        
        <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'} ${filtersOpen ? 'mr-80' : 'mr-0'} pt-16`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    GCP Applications & Assets
                  </h1>
                  <p className="text-muted-foreground">
                    Comprehensive management of applications and resources within Google Cloud Platform environments
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 ${getConnectionStatusColor()}`}>
                    <Icon 
                      name={connectionStatus === 'connected' ? 'CheckCircle' : connectionStatus === 'syncing' ? 'RefreshCw' : 'AlertCircle'} 
                      size={16}
                      className={connectionStatus === 'syncing' ? 'animate-spin' : ''}
                    />
                    <span className="text-sm font-medium">{getConnectionStatusText()}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={toggleFilters}>
                    <Icon name={filtersOpen ? 'X' : 'Filter'} size={16} className="mr-2" />
                    {filtersOpen ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Settings" size={16} className="mr-2" />
                    GCP Settings
                  </Button>
                  <Button size="sm">
                    <Icon name="ExternalLink" size={16} className="mr-2" />
                    Cloud Console
                  </Button>
                </div>
              </div>
            </div>

            {/* GCP Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Package" size={20} className="text-primary" />
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded"></div>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">{gcpMetrics?.applications}</div>
                <div className="text-sm text-muted-foreground">GCP Applications</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Server" size={20} className="text-blue-500" />
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">CE</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">{gcpMetrics?.computeInstances}</div>
                <div className="text-sm text-muted-foreground">Compute Engine</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Globe" size={20} className="text-green-500" />
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">GAE</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">{gcpMetrics?.appEngineServices}</div>
                <div className="text-sm text-muted-foreground">App Engine</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Database" size={20} className="text-purple-500" />
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">SQL</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">{gcpMetrics?.cloudSqlDatabases}</div>
                <div className="text-sm text-muted-foreground">Cloud SQL</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="DollarSign" size={20} className="text-yellow-500" />
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Cost</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">
                  ${gcpMetrics?.totalCost?.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Monthly Cost</div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-card border border-border rounded-lg">
              <div className="border-b border-border">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => handleTabChange('applications')}
                    className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'applications' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name="Package" size={16} className="mr-2 inline" />
                    Applications
                  </button>
                  <button
                    onClick={() => handleTabChange('infrastructure')}
                    className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'infrastructure' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name="Server" size={16} className="mr-2 inline" />
                    Infrastructure
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'applications' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-card-foreground">GCP Applications</h2>
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm" onClick={toggleFilters}>
                          <Icon name="Filter" size={16} className="mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Download" size={16} className="mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Application Name</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Project ID</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">GCP Services</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cost Allocation</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Region</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {gcpApplications?.map((app) => (
                            <tr key={app?.id} className="border-b border-border hover:bg-muted/50">
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                  <Icon name="Package" size={16} className="text-primary" />
                                  <div>
                                    <div className="font-medium text-card-foreground">{app?.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {app?.tags?.map((tag, index) => (
                                        <span key={index} className="inline-block bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs mr-1">
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 font-mono text-sm text-card-foreground">{app?.projectId}</td>
                              <td className="py-4 px-4">
                                <div className="flex flex-wrap gap-1">
                                  {app?.gcpServices?.map((service, index) => (
                                    <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="py-4 px-4 font-medium text-card-foreground">
                                ${app?.costAllocation?.toLocaleString()}
                              </td>
                              <td className="py-4 px-4 text-card-foreground">{app?.region}</td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="sm">
                                    <Icon name="Eye" size={16} />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Icon name="ExternalLink" size={16} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'infrastructure' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-card-foreground">GCP Infrastructure</h2>
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm" onClick={toggleFilters}>
                          <Icon name="Filter" size={16} className="mr-2" />
                          Filter by Service
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Download" size={16} className="mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Resource Name</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Configuration</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Monthly Cost</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {gcpResources?.map((resource) => (
                            <tr key={resource?.id} className="border-b border-border hover:bg-muted/50">
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                  <Icon 
                                    name={getResourceIcon(resource?.type)} 
                                    size={16} 
                                    className={getResourceColor(resource?.type)} 
                                  />
                                  <div>
                                    <div className="font-medium text-card-foreground">{resource?.name}</div>
                                    <div className="text-sm text-muted-foreground font-mono">{resource?.project}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {resource?.labels?.map((label, index) => (
                                        <span key={index} className="inline-block bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs mr-1">
                                          {label}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs ${getResourceBadgeColor(resource?.type)}`}>
                                  {resource?.type}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-card-foreground">
                                {resource?.machineType || resource?.instanceType || resource?.nodeCount || resource?.runtime}
                              </td>
                              <td className="py-4 px-4 text-card-foreground">
                                {resource?.zone || resource?.region}
                              </td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                  resource?.status === 'running' || resource?.status === 'runnable' || resource?.status === 'active' ?'bg-green-100 text-green-800' :'bg-red-100 text-red-800'
                                }`}>
                                  <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                                    resource?.status === 'running' || resource?.status === 'runnable' || resource?.status === 'active' ?'bg-green-500' :'bg-red-500'
                                  }`}></div>
                                  {resource?.status}
                                </span>
                              </td>
                              <td className="py-4 px-4 font-medium text-card-foreground">
                                ${resource?.monthlyCost?.toLocaleString()}
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="sm">
                                    <Icon name="Eye" size={16} />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Icon name="ExternalLink" size={16} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - GCP Filtering */}
        {filtersOpen && (
          <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-card border-l border-border p-6 overflow-y-auto transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">GCP Filters</h3>
              <Button variant="ghost" size="sm" onClick={toggleFilters}>
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">GCP Regions</label>
                <div className="space-y-2">
                  {['us-central1', 'us-west1', 'us-east1', 'europe-west1', 'asia-southeast1']?.map((region) => (
                    <label key={region} className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary border-border rounded" />
                      <span className="ml-2 text-sm text-card-foreground">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Service Categories</label>
                <div className="space-y-2">
                  {['Compute Engine', 'App Engine', 'Cloud SQL', 'Cloud Storage', 'Cloud Functions', 'Google Kubernetes Engine']?.map((service) => (
                    <label key={service} className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary border-border rounded" />
                      <span className="ml-2 text-sm text-card-foreground">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Project IDs</label>
                <div className="space-y-2">
                  <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                    <option value="">All Projects</option>
                    <option value="analytics-prod-001">analytics-prod-001</option>
                    <option value="ml-pipeline-prod">ml-pipeline-prod</option>
                    <option value="cms-production">cms-production</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Billing Accounts</label>
                <div className="space-y-2">
                  <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                    <option value="">All Billing Accounts</option>
                    <option value="billing-001">Production (billing-001)</option>
                    <option value="billing-002">Development (billing-002)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Resource Labels</label>
                <div className="space-y-2">
                  {['production', 'development', 'analytics', 'ml', 'database', 'serverless']?.map((label) => (
                    <label key={label} className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary border-border rounded" />
                      <span className="ml-2 text-sm text-card-foreground">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button className="w-full mb-2">Apply Filters</Button>
                <Button variant="outline" className="w-full">Clear All</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GCPApplicationsAssets;