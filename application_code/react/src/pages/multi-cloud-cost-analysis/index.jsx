import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProviderTabs from './components/ProviderTabs';
import CostChart from './components/CostChart';
import CostBreakdownTable from './components/CostBreakdownTable';
import FilterSidebar from './components/FilterSidebar';
import AnomalyAlerts from './components/AnomalyAlerts';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MultiCloudCostAnalysis = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [activeProvider, setActiveProvider] = useState('all');
  const [filters, setFilters] = useState({
    accounts: [],
    serviceCategories: [],
    costThresholds: [],
    dateRange: { start: '', end: '' },
    tags: []
  });

  // Mock data for provider overview
  const providerData = {
    all: {
      totalSpend: 45680,
      variance: 12.5,
      activeServices: 127,
      regions: 15
    },
    aws: {
      totalSpend: 23450,
      variance: 8.3,
      activeServices: 67,
      regions: 8
    },
    azure: {
      totalSpend: 15230,
      variance: -5.2,
      activeServices: 34,
      regions: 4
    },
    gcp: {
      totalSpend: 7000,
      variance: 23.1,
      activeServices: 26,
      regions: 3
    }
  };

  // Mock data for charts
  const chartData = {
    trendData: [
      { date: '2024-08-01', aws: 22000, azure: 15000, gcp: 6500 },
      { date: '2024-08-05', aws: 23100, azure: 14800, gcp: 6800 },
      { date: '2024-08-10', aws: 22800, azure: 15200, gcp: 7200 },
      { date: '2024-08-15', aws: 24200, azure: 15600, gcp: 7400 },
      { date: '2024-08-20', aws: 23800, azure: 15100, gcp: 6900 },
      { date: '2024-08-23', aws: 23450, azure: 15230, gcp: 7000 }
    ],
    comparisonData: [
      { service: 'Compute', aws: 12000, azure: 8500, gcp: 4200 },
      { service: 'Storage', aws: 4500, azure: 3200, gcp: 1800 },
      { service: 'Database', aws: 3200, azure: 2100, gcp: 800 },
      { service: 'Networking', aws: 2100, azure: 1200, gcp: 150 },
      { service: 'AI/ML', aws: 1650, azure: 230, gcp: 50 }
    ],
    serviceDistribution: [
      { name: 'Compute', value: 24700 },
      { name: 'Storage', value: 9500 },
      { name: 'Database', value: 6100 },
      { name: 'Networking', value: 3450 },
      { name: 'AI/ML', value: 1930 }
    ]
  };

  // Mock data for cost breakdown table
  const tableData = [
    {
      service: 'EC2 Instances',
      provider: 'AWS',
      region: 'us-east-1',
      resourceType: 'Compute',
      cost: 8450.50,
      costChange: 12.3,
      usage: 2340,
      usageUnit: 'hours',
      efficiency: 78
    },
    {
      service: 'Azure Virtual Machines',
      provider: 'Azure',
      region: 'eastus',
      resourceType: 'Compute',
      cost: 6230.25,
      costChange: -5.2,
      usage: 1890,
      usageUnit: 'hours',
      efficiency: 85
    },
    {
      service: 'S3 Storage',
      provider: 'AWS',
      region: 'us-west-2',
      resourceType: 'Storage',
      cost: 3420.75,
      costChange: 8.7,
      usage: 15.6,
      usageUnit: 'TB',
      efficiency: 92
    },
    {
      service: 'Cloud SQL',
      provider: 'GCP',
      region: 'us-central1',
      resourceType: 'Database',
      cost: 2890.00,
      costChange: 15.4,
      usage: 720,
      usageUnit: 'hours',
      efficiency: 67
    },
    {
      service: 'RDS MySQL',
      provider: 'AWS',
      region: 'eu-west-1',
      resourceType: 'Database',
      cost: 2650.30,
      costChange: -2.1,
      usage: 680,
      usageUnit: 'hours',
      efficiency: 88
    },
    {
      service: 'Azure Blob Storage',
      provider: 'Azure',
      region: 'westeurope',
      resourceType: 'Storage',
      cost: 1980.45,
      costChange: 3.8,
      usage: 8.9,
      usageUnit: 'TB',
      efficiency: 94
    },
    {
      service: 'Compute Engine',
      provider: 'GCP',
      region: 'asia-southeast1',
      resourceType: 'Compute',
      cost: 1750.60,
      costChange: 22.1,
      usage: 560,
      usageUnit: 'hours',
      efficiency: 72
    },
    {
      service: 'Lambda Functions',
      provider: 'AWS',
      region: 'us-east-1',
      resourceType: 'Serverless',
      cost: 1420.80,
      costChange: 18.9,
      usage: 2.8,
      usageUnit: 'M invocations',
      efficiency: 96
    },
    {
      service: 'Azure Functions',
      provider: 'Azure',
      region: 'eastus2',
      resourceType: 'Serverless',
      cost: 890.25,
      costChange: -8.3,
      usage: 1.9,
      usageUnit: 'M invocations',
      efficiency: 91
    },
    {
      service: 'Cloud Storage',
      provider: 'GCP',
      region: 'us-west1',
      resourceType: 'Storage',
      cost: 760.40,
      costChange: 5.6,
      usage: 4.2,
      usageUnit: 'TB',
      efficiency: 89
    }
  ];

  // Mock data for anomalies
  const anomalies = [
    {
      id: 'anom-001',
      title: 'Unusual EC2 Compute Spike',
      description: 'EC2 instances in us-east-1 showing 340% increase in usage over the past 3 days',
      severity: 'Critical',
      provider: 'AWS',
      service: 'EC2',
      region: 'us-east-1',
      impactAmount: 12450,
      expectedCost: 3200,
      actualCost: 15650,
      detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      recommendations: [
        'Review auto-scaling policies for potential misconfiguration',
        'Check for runaway processes or infinite loops',
        'Consider implementing cost alerts for this service'
      ]
    },
    {
      id: 'anom-002',
      title: 'Azure Storage Cost Anomaly',
      description: 'Blob storage costs in West Europe region exceeded normal patterns by 180%',
      severity: 'High',
      provider: 'Azure',
      service: 'Blob Storage',
      region: 'westeurope',
      impactAmount: 4320,
      expectedCost: 2400,
      actualCost: 6720,
      detectedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      recommendations: [
        'Audit recent data uploads for unexpected large files',
        'Review storage tier configurations',
        'Check for data replication issues'
      ]
    },
    {
      id: 'anom-003',
      title: 'GCP ML Training Overrun',
      description: 'Machine learning training jobs consuming 250% more resources than budgeted',
      severity: 'Medium',
      provider: 'GCP',
      service: 'AI Platform',
      region: 'us-central1',
      impactAmount: 2890,
      expectedCost: 1200,
      actualCost: 4090,
      detectedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      recommendations: [
        'Review training job configurations for efficiency',
        'Consider using preemptible instances for training',
        'Implement job timeout limits'
      ]
    }
  ];

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleToggleFilterSidebar = () => {
    setFilterSidebarOpen(!filterSidebarOpen);
  };

  const handleProviderChange = (provider) => {
    setActiveProvider(provider);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to data here
    console.log('Applying filters:', newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={handleToggleSidebar} 
      />
      
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-60'
      } pt-16`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Multi-Cloud Cost Analysis</h1>
              <p className="text-muted-foreground">
                Comprehensive cost examination and comparison across AWS, Azure, and GCP environments
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-card border border-border rounded-lg px-3 py-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">Aug 1 - Aug 23, 2024</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-card border border-border rounded-lg px-3 py-2">
                <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">USD</span>
              </div>
              
              <Button
                variant="outline"
                onClick={handleToggleFilterSidebar}
                className="lg:hidden"
              >
                <Icon name="Filter" size={16} className="mr-2" />
                Filters
              </Button>
              
              <Button>
                <Icon name="Download" size={16} className="mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Provider Overview */}
          <ProviderTabs
            activeProvider={activeProvider}
            onProviderChange={handleProviderChange}
            providerData={providerData}
          />

          {/* Cost Visualization */}
          <CostChart
            data={chartData}
            activeProvider={activeProvider}
          />

          {/* Anomaly Alerts */}
          <AnomalyAlerts anomalies={anomalies} />

          {/* Detailed Breakdown */}
          <CostBreakdownTable data={tableData} />
        </div>
      </main>

      {/* Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isOpen={filterSidebarOpen}
        onToggle={handleToggleFilterSidebar}
      />
    </div>
  );
};

export default MultiCloudCostAnalysis;