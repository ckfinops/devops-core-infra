import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';

const AzureApplicationsAssets = () => {
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

  // Mock Azure data - this would come from Azure API integration
  const azureMetrics = {
    applications: 8,
    virtualMachines: 32,
    appServices: 15,
    sqlDatabases: 6,
    totalCost: 18456.32
  };

  const azureApplications = [
    {
      id: 'app-1',
      name: 'Customer Portal',
      resourceGroup: 'rg-production-web',
      azureServices: ['App Service', 'SQL Database', 'Application Insights', 'Key Vault'],
      subscriptionAllocation: 3456.78,
      location: 'East US',
      tags: ['production', 'web-portal']
    },
    {
      id: 'app-2',
      name: 'Analytics Dashboard',
      resourceGroup: 'rg-analytics-prod',
      azureServices: ['VM', 'Cosmos DB', 'Functions', 'Service Bus'],
      subscriptionAllocation: 2234.56,
      location: 'West Europe',
      tags: ['analytics', 'dashboard']
    },
    {
      id: 'app-3',
      name: 'API Management Service',
      resourceGroup: 'rg-api-management',
      azureServices: ['API Management', 'Functions', 'Storage Account', 'Application Gateway'],
      subscriptionAllocation: 1890.12,
      location: 'Central US',
      tags: ['api', 'microservices']
    }
  ];

  const azureResources = [
    {
      id: 'resource-1',
      name: 'web-vm-prod-01',
      type: 'Virtual Machine',
      serviceTier: 'Standard_D2s_v3',
      location: 'East US',
      status: 'running',
      monthlyCost: 245.67,
      tags: ['web', 'production']
    },
    {
      id: 'resource-2',
      name: 'prod-sql-database',
      type: 'SQL Database',
      serviceTier: 'Standard S2',
      location: 'East US',
      status: 'online',
      monthlyCost: 334.56,
      tags: ['database', 'production']
    },
    {
      id: 'resource-3',
      name: 'api-function-app',
      type: 'Function App',
      serviceTier: 'Consumption Plan',
      location: 'West Europe',
      status: 'running',
      monthlyCost: 65.89,
      tags: ['serverless', 'api']
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

  return (
    <>
      <Helmet>
        <title>Azure Applications & Assets - Cloud Cost Manager</title>
        <meta name="description" content="Specialized management of applications and resources within Microsoft Azure environments" />
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
                    Azure Applications & Assets
                  </h1>
                  <p className="text-muted-foreground">
                    Specialized management of applications and resources within Microsoft Azure environments
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
                    Azure Settings
                  </Button>
                  <Button size="sm">
                    <Icon name="ExternalLink" size={16} className="mr-2" />
                    Azure Portal
                  </Button>
                </div>
              </div>
            </div>

            {/* Azure Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Package" size={20} className="text-primary" />
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Az</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">{azureMetrics?.applications}</div>
                <div className="text-sm text-muted-foreground">Azure Applications</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Server" size={20} className="text-blue-500" />
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">VM</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">{azureMetrics?.virtualMachines}</div>
                <div className="text-sm text-muted-foreground">Virtual Machines</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Globe" size={20} className="text-green-500" />
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">App</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">{azureMetrics?.appServices}</div>
                <div className="text-sm text-muted-foreground">App Services</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Database" size={20} className="text-purple-500" />
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">SQL</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">{azureMetrics?.sqlDatabases}</div>
                <div className="text-sm text-muted-foreground">SQL Databases</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="DollarSign" size={20} className="text-yellow-500" />
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Cost</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">
                  ${azureMetrics?.totalCost?.toLocaleString()}
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
                    onClick={() => handleTabChange('resources')}
                    className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'resources' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name="Server" size={16} className="mr-2 inline" />
                    Resources
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'applications' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-card-foreground">Azure Applications</h2>
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
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Resource Group</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Azure Services</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Subscription Allocation</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {azureApplications?.map((app) => (
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
                              <td className="py-4 px-4 text-card-foreground">{app?.resourceGroup}</td>
                              <td className="py-4 px-4">
                                <div className="flex flex-wrap gap-1">
                                  {app?.azureServices?.map((service, index) => (
                                    <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="py-4 px-4 font-medium text-card-foreground">
                                ${app?.subscriptionAllocation?.toLocaleString()}
                              </td>
                              <td className="py-4 px-4 text-card-foreground">{app?.location}</td>
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

                {activeTab === 'resources' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-card-foreground">Azure Resources</h2>
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
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Service Tier</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Monthly Cost</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {azureResources?.map((resource) => (
                            <tr key={resource?.id} className="border-b border-border hover:bg-muted/50">
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                  <Icon 
                                    name={resource?.type === 'Virtual Machine' ? 'Server' : resource?.type === 'SQL Database' ? 'Database' : 'Globe'} 
                                    size={16} 
                                    className={resource?.type === 'Virtual Machine' ? 'text-blue-500' : resource?.type === 'SQL Database' ? 'text-purple-500' : 'text-green-500'} 
                                  />
                                  <div>
                                    <div className="font-medium text-card-foreground">{resource?.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {resource?.tags?.map((tag, index) => (
                                        <span key={index} className="inline-block bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs mr-1">
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                  resource?.type === 'Virtual Machine' ? 'bg-blue-100 text-blue-800' :
                                  resource?.type === 'SQL Database'? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                                }`}>
                                  {resource?.type}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-card-foreground">
                                {resource?.serviceTier}
                              </td>
                              <td className="py-4 px-4 text-card-foreground">
                                {resource?.location}
                              </td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                  resource?.status === 'running' || resource?.status === 'online' ?'bg-green-100 text-green-800' :'bg-red-100 text-red-800'
                                }`}>
                                  <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                                    resource?.status === 'running' || resource?.status === 'online' ?'bg-green-500' :'bg-red-500'
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

        {/* Right Sidebar - Azure Filtering */}
        {filtersOpen && (
          <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-card border-l border-border p-6 overflow-y-auto transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Azure Filters</h3>
              <Button variant="ghost" size="sm" onClick={toggleFilters}>
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Subscriptions</label>
                <div className="space-y-2">
                  <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                    <option value="">All Subscriptions</option>
                    <option value="sub-1">Production (12345678-1234-1234)</option>
                    <option value="sub-2">Development (87654321-4321-4321)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Resource Groups</label>
                <div className="space-y-2">
                  {['rg-production-web', 'rg-analytics-prod', 'rg-api-management', 'rg-dev-testing']?.map((rg) => (
                    <label key={rg} className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary border-border rounded" />
                      <span className="ml-2 text-sm text-card-foreground">{rg}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Locations</label>
                <div className="space-y-2">
                  {['East US', 'West Europe', 'Central US', 'Southeast Asia']?.map((location) => (
                    <label key={location} className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary border-border rounded" />
                      <span className="ml-2 text-sm text-card-foreground">{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Service Categories</label>
                <div className="space-y-2">
                  {['Compute', 'Storage', 'Networking', 'Databases', 'AI + Machine Learning']?.map((category) => (
                    <label key={category} className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary border-border rounded" />
                      <span className="ml-2 text-sm text-card-foreground">{category}</span>
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

export default AzureApplicationsAssets;