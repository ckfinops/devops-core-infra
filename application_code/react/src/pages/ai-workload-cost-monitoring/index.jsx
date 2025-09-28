import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricCard from '../dashboard-overview/components/MetricCard';
import CostAnalysisChart from './components/CostAnalysisChart';
import WorkloadTable from './components/WorkloadTable';
import OptimizationSidebar from './components/OptimizationSidebar';
import FilterPanel from './components/FilterPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AIWorkloadCostMonitoring = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [viewMode, setViewMode] = useState('training');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  // Mock AI workload metrics data
  const aiMetrics = [
    {
      title: 'Total AI/ML Spend',
      value: '$89,450',
      change: '+15.7%',
      changeType: 'negative',
      icon: 'Cpu',
      subtitle: 'This month'
    },
    {
      title: 'GPU Utilization',
      value: '73.4%',
      change: '+5.2%',
      changeType: 'positive',
      icon: 'Zap',
      subtitle: 'Average across clusters'
    },
    {
      title: 'Training Cost',
      value: '$52,300',
      change: '+22.1%',
      changeType: 'negative',
      icon: 'BookOpen',
      subtitle: 'vs inference: $37,150'
    },
    {
      title: 'Model Efficiency Score',
      value: '8.2/10',
      change: '+0.7',
      changeType: 'positive',
      icon: 'Award',
      subtitle: 'Performance metrics'
    }
  ];

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Auto-refresh every 10 minutes for real-time monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Workload Cost Monitoring</h1>
              <p className="text-muted-foreground">
                Specialized cost tracking and optimization for machine learning infrastructure
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Last updated: {lastUpdated?.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}</span>
              </div>
              
              {/* Time Range Selector */}
              <div className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
                {['1h', '24h', '7d', '30d']?.map((range) => (
                  <button
                    key={range}
                    onClick={() => handleTimeRangeChange(range)}
                    className={`px-3 py-1 text-xs rounded transition-colors ${
                      selectedTimeRange === range
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setFilterPanelOpen(true)}
                iconName="Filter" 
                iconPosition="left"
              >
                Filters
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                loading={isRefreshing}
                iconName="RefreshCw" 
                iconPosition="left"
              >
                Refresh
              </Button>
              
              <Button variant="primary" size="sm" iconName="Download" iconPosition="left">
                Export Report
              </Button>
            </div>
          </div>

          {/* AI-Specific Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {aiMetrics?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                subtitle={metric?.subtitle}
                trend={index === 0}
              />
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
              {[
                { id: 'training', label: 'Training Jobs', icon: 'BookOpen' },
                { id: 'inference', label: 'Inference', icon: 'Play' },
                { id: 'resources', label: 'Resources', icon: 'Server' }
              ]?.map((mode) => (
                <button
                  key={mode?.id}
                  onClick={() => handleViewModeChange(mode?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm rounded transition-colors ${
                    viewMode === mode?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={mode?.icon} size={16} />
                  <span>{mode?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Visualization Area */}
          <div className="w-full">
            <CostAnalysisChart 
              timeRange={selectedTimeRange}
              viewMode={viewMode}
            />
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Workload Table */}
            <div className="xl:col-span-3">
              <WorkloadTable viewMode={viewMode} />
            </div>
            
            {/* Optimization Sidebar */}
            <div className="xl:col-span-1">
              <OptimizationSidebar />
            </div>
          </div>

          {/* Alert Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Cost Alerts</h3>
                  <p className="text-xs text-muted-foreground">High spending detected</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-warning">3</div>
                <div className="text-xs text-muted-foreground">Active alerts requiring attention</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={20} className="text-error" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Idle Resources</h3>
                  <p className="text-xs text-muted-foreground">Unused GPU instances</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-error">7</div>
                <div className="text-xs text-muted-foreground">Instances ready for termination</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-success" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Optimization</h3>
                  <p className="text-xs text-muted-foreground">Potential savings</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-success">$12.4K</div>
                <div className="text-xs text-muted-foreground">Monthly savings opportunity</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">MLOps platform connected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">Real-time cost tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">Automated rightsizing enabled</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" iconName="Settings" iconPosition="left">
                  Configure Alerts
                </Button>
                <Button variant="ghost" size="sm" iconName="HelpCircle" iconPosition="left">
                  ML Cost Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Filter Panel */}
      <FilterPanel 
        isOpen={filterPanelOpen} 
        onClose={() => setFilterPanelOpen(false)}
        viewMode={viewMode}
      />
    </div>
  );
};

export default AIWorkloadCostMonitoring;