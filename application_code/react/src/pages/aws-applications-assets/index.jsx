import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';

const AWSApplicationsAssets = () => {
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

  // Mock AWS data - this would come from AWS API integration
  const [awsMetrics, setAwsMetrics] = useState({
    applications: 0,
    ec2Instances: 0,
    rdsInstances: 0,
    lambdaFunctions: 0,
    totalCost: 0
  });

  const [awsApplications, setAwsApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(false);
  // For all resources API
  const [allResources, setAllResources] = useState([]);
  const [loadingAllResources, setLoadingAllResources] = useState(false);
  // Fetch all resources for all regions
  useEffect(() => {
    setLoadingAllResources(true);
    // Mock data for resources
    const mockResources = [
      {
        resourceId: 'i-0123456789abcdef0',
        type: 'EC2',
        name: 'Web Server 1',
        region: 'us-east-1',
        tags: { Environment: 'Production', Service: 'Web' },
        instanceType: 't3.medium',
        status: 'running'
      },
      {
        resourceId: 'i-0123456789abcdef1',
        type: 'RDS',
        name: 'Main Database',
        region: 'us-east-1',
        tags: { Environment: 'Production', Service: 'Database' },
        instanceType: 'db.t3.large',
        status: 'available'
      },
      {
        resourceId: 'lambda-0123456789',
        type: 'Lambda',
        name: 'Data Processor',
        region: 'us-east-1',
        tags: { Environment: 'Production', Service: 'Processing' },
        runtime: 'nodejs18.x',
        status: 'active'
      }
    ];

    // Simulate API delay
    setTimeout(() => {
      setAllResources(mockResources);
      setLoadingAllResources(false);
      
      // Update metrics based on resources
      setAwsMetrics({
        applications: 3,
        ec2Instances: mockResources.filter(r => r.type === 'EC2').length,
        rdsInstances: mockResources.filter(r => r.type === 'RDS').length,
        lambdaFunctions: mockResources.filter(r => r.type === 'Lambda').length,
        totalCost: 3456.78
      });
    }, 1000);
  }, []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newApp, setNewApp] = useState({
    name: '',
    hostingDetails: '',
    awsServices: '',
    costAllocation: '',
    region: '',
    tags: ''
  });
  const [addFeedback, setAddFeedback] = useState(null);

  useEffect(() => {
    const fetchApps = async () => {
      setLoadingApps(true);
      // Mock applications data
      const mockApps = [
        {
          id: 'app-1',
          name: 'E-commerce Platform',
          hostingDetails: 'ECS Cluster with ALB',
          awsServices: ['ECS', 'ALB', 'RDS', 'ElastiCache'],
          costAllocation: 2500.00,
          region: 'us-east-1',
          tags: ['production', 'ecommerce', 'critical']
        },
        {
          id: 'app-2',
          name: 'Analytics Platform',
          hostingDetails: 'EMR Cluster',
          awsServices: ['EMR', 'S3', 'Redshift'],
          costAllocation: 3800.00,
          region: 'us-east-1',
          tags: ['production', 'analytics', 'data']
        },
        {
          id: 'app-3',
          name: 'Customer Portal',
          hostingDetails: 'EKS Cluster',
          awsServices: ['EKS', 'RDS', 'CloudFront'],
          costAllocation: 1800.00,
          region: 'us-east-1',
          tags: ['production', 'customer-facing']
        }
      ];

      // Simulate API delay
      setTimeout(() => {
        setAwsApplications(mockApps);
        setLoadingApps(false);
      }, 800);
    };
    fetchApps();
  }, []);

  const handleAddApp = async () => {
    setAddFeedback(null);
    try {
      const payload = {
        id: `app-${Date.now()}`,
        name: newApp.name,
        hostingDetails: newApp.hostingDetails,
        awsServices: newApp.awsServices.split(',').map(s => s.trim()),
        costAllocation: parseFloat(newApp.costAllocation),
        region: newApp.region,
        tags: newApp.tags.split(',').map(t => t.trim())
      };
      
      // Simulate successful API call
      setTimeout(() => {
        setAwsApplications(prevApps => [...prevApps, payload]);
        setAddFeedback('Application added successfully!');
        setShowAddModal(false);
        setNewApp({ name: '', hostingDetails: '', awsServices: '', costAllocation: '', region: '', tags: '' });
        
        // Update metrics
        setAwsMetrics(prev => ({
          ...prev,
          applications: prev.applications + 1
        }));
      }, 500);
    } catch (err) {
      setAddFeedback('Error adding application.');
    }
  };

  const awsResources = [
    {
      id: 'resource-1',
      name: 'web-server-cluster',
      type: 'EC2',
      instanceType: 't3.large',
      availabilityZone: 'us-east-1a',
      status: 'running',
      monthlyCost: 145.67,
      tags: ['web', 'production']
    },
    {
      id: 'resource-2',
      name: 'production-database',
      type: 'RDS',
      instanceType: 'db.t3.medium',
      availabilityZone: 'us-east-1b',
      status: 'available',
      monthlyCost: 234.56,
      tags: ['database', 'production']
    },
    {
      id: 'resource-3',
      name: 'data-processing-function',
      type: 'Lambda',
      runtime: 'nodejs18.x',
      region: 'us-east-1',
      status: 'active',
      monthlyCost: 45.89,
      tags: ['serverless', 'data-processing']
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
        <title>AWS Applications & Assets - Cloud Cost Manager</title>
        <meta name="description" content="Comprehensive management of applications and infrastructure assets within Amazon Web Services environments" />
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
                    AWS Applications & Assets
                  </h1>
                  <p className="text-muted-foreground">
                    Comprehensive management of applications and infrastructure assets within Amazon Web Services
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button size="sm" variant="default" onClick={() => setShowAddModal(true)}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add Application
                  </Button>
      {/* Add Application Modal */}

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
                    AWS Settings
                  </Button>
                  <Button size="sm">
                    <Icon name="ExternalLink" size={16} className="mr-2" />
                    AWS Console
                  </Button>
                </div>
              </div>
            </div>

            {/* AWS Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Package" size={20} className="text-primary" />
                  <Icon name="Aws" size={24} className="text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">{awsMetrics?.applications}</div>
                <div className="text-sm text-muted-foreground">AWS Applications</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Server" size={20} className="text-blue-500" />
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">EC2</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">{awsMetrics?.ec2Instances}</div>
                <div className="text-sm text-muted-foreground">EC2 Instances</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Database" size={20} className="text-green-500" />
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">RDS</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">{awsMetrics?.rdsInstances}</div>
                <div className="text-sm text-muted-foreground">RDS Databases</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Zap" size={20} className="text-purple-500" />
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">λ</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">{awsMetrics?.lambdaFunctions}</div>
                <div className="text-sm text-muted-foreground">Lambda Functions</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="DollarSign" size={20} className="text-yellow-500" />
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Cost</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mb-1">
                  ${awsMetrics?.totalCost?.toLocaleString()}
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
                  <button
                    onClick={() => handleTabChange('resources')}
                    className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'resources' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name="Database" size={16} className="mr-2 inline" />
                    All AWS Resources
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'applications' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-card-foreground">AWS Applications</h2>
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
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Hosting Details</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">AWS Services</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cost Allocation</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Region</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {awsApplications?.map((app) => (
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
                              <td className="py-4 px-4 text-card-foreground">{app?.hostingDetails}</td>
                              <td className="py-4 px-4">
                                <div className="flex flex-wrap gap-1">
                                  {app?.awsServices?.map((service, index) => (
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

                {activeTab === 'resources' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-card-foreground">All AWS Resources</h2>
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm" onClick={toggleFilters}>
                          <Icon name="Filter" size={16} className="mr-2" />
                          Filter Resources
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Download" size={16} className="mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                    {loadingAllResources ? (
                      <div className="py-8 text-center text-muted-foreground">Loading resources...</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-3 px-4 text-sm font-normal text-gray-500">Resource ID</th>
                              <th className="text-left py-3 px-4 text-sm font-normal text-gray-500">Type</th>
                              <th className="text-left py-3 px-4 text-sm font-normal text-gray-500">Name</th>
                              <th className="text-left py-3 px-4 text-sm font-normal text-gray-500">Region</th>
                              <th className="text-left py-3 px-4 text-sm font-normal text-gray-500">Environment</th>
                              <th className="text-left py-3 px-4 text-sm font-normal text-gray-500">Service</th>
                              <th className="text-left py-3 px-4 text-sm font-normal text-gray-500">Instance Type</th>
                              <th className="text-left py-3 px-4 text-sm font-normal text-gray-500">Status</th>
                              <th className="text-left py-3 px-4 text-sm font-normal text-gray-500">Other Details</th>
                            </tr>
                          </thead>
                          <tbody className="text-sm">
                            {allResources.length === 0 ? (
                              <tr><td colSpan={9} className="py-6 text-center text-gray-500">No resources found.</td></tr>
                            ) : (
                              allResources.map((res, idx) => (
                                <tr key={res?.resourceId || idx} className="border-b border-border hover:bg-gray-50">
                                  <td className="py-4 px-4 text-gray-900">{res?.resourceId || res?.id || '-'}</td>
                                  <td className="py-4 px-4 text-gray-900">{res?.type || '-'}</td>
                                  <td className="py-4 px-4 text-gray-900">{res?.name || '-'}</td>
                                  <td className="py-4 px-4 text-gray-900">{res?.region || '-'}</td>
                                  <td className="py-4 px-4">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                      {res?.tags?.Environment || '-'}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                                      {res?.tags?.Service || '-'}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 text-gray-900">{res?.instanceType || '-'}</td>
                                  <td className="py-4 px-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                      res?.status === 'running' || res?.status === 'available' || res?.status === 'active'
                                        ? 'bg-green-50 text-green-700'
                                        : 'bg-red-50 text-red-700'
                                    }`}>
                                      <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                        res?.status === 'running' || res?.status === 'available' || res?.status === 'active'
                                          ? 'bg-green-400'
                                          : 'bg-red-400'
                                      }`}></div>
                                      {res?.status || '-'}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="text-xs space-y-1">
                                      {Object.entries(res).map(([key, value]) => (
                                        key !== 'resourceId' && key !== 'type' && key !== 'name' && 
                                        key !== 'region' && key !== 'tags' && key !== 'instanceType' && 
                                        key !== 'status' && (
                                          <div key={key} className="flex">
                                            <span className="font-medium text-gray-500 mr-2">{key}:</span>
                                            {typeof value === 'object' ? (
                                              <span className="text-gray-700">
                                                {Object.entries(value).map(([k, v]) => (
                                                  <div key={k} className="ml-2">
                                                    {k}: {v}
                                                  </div>
                                                ))}
                                              </span>
                                            ) : (
                                              <span className="text-gray-700">{value}</span>
                                            )}
                                          </div>
                                        )
                                      ))}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'infrastructure' && (
                  <div>
                    {/* AWS Infrastructure Section */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-card-foreground">AWS Infrastructure</h2>
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
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Instance/Config</th>
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Monthly Cost</th>
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {awsResources?.map((resource) => (
                              <tr key={resource?.id} className="border-b border-border hover:bg-muted/50">
                                <td className="py-4 px-4">
                                  <div className="flex items-center space-x-3">
                                    <Icon 
                                      name={resource?.type === 'EC2' ? 'Server' : resource?.type === 'RDS' ? 'Database' : 'Zap'} 
                                      size={16} 
                                      className={resource?.type === 'EC2' ? 'text-blue-500' : resource?.type === 'RDS' ? 'text-green-500' : 'text-purple-500'} 
                                    />
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                    resource?.type === 'EC2' ? 'bg-blue-100 text-blue-800' :
                                    resource?.type === 'RDS'? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                                  }`}>
                                    {resource?.type}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-card-foreground">
                                  {resource?.instanceType || resource?.runtime}
                                </td>
                                <td className="py-4 px-4 text-card-foreground">
                                  {resource?.availabilityZone || resource?.region}
                                </td>
                                <td className="py-4 px-4">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                    resource?.status === 'running' || resource?.status === 'available' || resource?.status === 'active' ?'bg-green-100 text-green-800' :'bg-red-100 text-red-800'
                                  }`}>
                                    <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                                      resource?.status === 'running' || resource?.status === 'available' || resource?.status === 'active' ?'bg-green-500' :'bg-red-500'
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - AWS Filtering */}
        {filtersOpen && (
          <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-card border-l border-border p-6 overflow-y-auto transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">AWS Filters</h3>
              <Button variant="ghost" size="sm" onClick={toggleFilters}>
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">AWS Regions</label>
                <div className="space-y-2">
                  {['us-east-1', 'us-west-2', 'eu-west-1', 'ap-south-1']?.map((region) => (
                    <label key={region} className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary border-border rounded" />
                      <span className="ml-2 text-sm text-card-foreground">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Service Types</label>
                <div className="space-y-2">
                  {['EC2', 'RDS', 'Lambda', 'S3', 'CloudFront']?.map((service) => (
                    <label key={service} className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary border-border rounded" />
                      <span className="ml-2 text-sm text-card-foreground">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Account IDs</label>
                <div className="space-y-2">
                  <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                    <option value="">All Accounts</option>
                    <option value="123456789012">Production (123456789012)</option>
                    <option value="234567890123">Development (234567890123)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Resource Tags</label>
                <div className="space-y-2">
                  {['production', 'development', 'web-app', 'database', 'serverless']?.map((tag) => (
                    <label key={tag} className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary border-border rounded" />
                      <span className="ml-2 text-sm text-card-foreground">{tag}</span>
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

        {/* Add Application Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Application</h2>
              <div className="space-y-3">
                <input className="w-full border p-2 rounded" placeholder="Application Name" value={newApp.name} onChange={e => setNewApp({ ...newApp, name: e.target.value })} />
                <input className="w-full border p-2 rounded" placeholder="Hosting Details" value={newApp.hostingDetails} onChange={e => setNewApp({ ...newApp, hostingDetails: e.target.value })} />
                <input className="w-full border p-2 rounded" placeholder="AWS Services (comma separated)" value={newApp.awsServices} onChange={e => setNewApp({ ...newApp, awsServices: e.target.value })} />
                <input className="w-full border p-2 rounded" placeholder="Cost Allocation" type="number" value={newApp.costAllocation} onChange={e => setNewApp({ ...newApp, costAllocation: e.target.value })} />
                <input className="w-full border p-2 rounded" placeholder="Region" value={newApp.region} onChange={e => setNewApp({ ...newApp, region: e.target.value })} />
                <input className="w-full border p-2 rounded" placeholder="Tags (comma separated)" value={newApp.tags} onChange={e => setNewApp({ ...newApp, tags: e.target.value })} />
              </div>
              {addFeedback && <div className="mt-3 text-sm text-error">{addFeedback}</div>}
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="default" size="sm" onClick={handleAddApp}>Add</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AWSApplicationsAssets;