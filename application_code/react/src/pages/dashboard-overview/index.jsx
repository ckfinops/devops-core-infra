import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricCard from './components/MetricCard';
import CostTrendChart from './components/CostTrendChart';
import TopSpendingServices from './components/TopSpendingServices';
import CostAnomalies from './components/CostAnomalies';
import OptimizationRecommendations from './components/OptimizationRecommendations';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useCloudData } from '../../hooks/useCloudData';

const DashboardOverview = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { data, loading, error, connections, refreshData } = useCloudData();

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleRefresh = async () => {
    refreshData();
  };

  // Enhanced connection check with fallback logic
  const hasConnectedProviders = Object.values(connections || {})?.some(conn => conn?.connected);
  const connectedCount = Object.values(connections || {})?.filter(conn => conn?.connected)?.length || 0;
  const totalProviders = Object.keys(connections || {})?.length || 3;

  // Enhanced error boundary to prevent total failure
  if (error && !data) {
    return (
      <div className="min-h-screen bg-background max-w-1024 mx-auto">
        <Header />
        <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
        <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16 laptop:ml-18' : 'ml-56 laptop:ml-58'}`}>
          <div className="p-4 laptop:p-6 space-y-4 laptop:space-y-6 max-w-1024">
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center space-y-4">
                <Icon name="AlertCircle" size={48} className="text-error mx-auto" />
                <h2 className="text-xl font-semibold text-foreground">Dashboard Loading Error</h2>
                <p className="text-muted-foreground max-w-md">
                  There was an issue loading the dashboard. Please try refreshing the page.
                </p>
                <Button onClick={handleRefresh} iconName="RefreshCw" iconPosition="left">
                  Retry Loading
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16 laptop:ml-18' : 'ml-56 laptop:ml-58'}`}>
        {/* Container optimized for 1024px screens */}
        <div className="p-4 laptop:p-5 space-y-4 laptop:space-y-6 max-w-full">
          {/* Page Header - Optimized for 1024px */}
          <div className="flex flex-col laptop:flex-row laptop:items-center laptop:justify-between space-y-3 laptop:space-y-0">
            <div>
              <h1 className="text-xl laptop:text-2xl font-bold text-foreground">Dashboard Overview</h1>
              <p className="text-sm laptop:text-base text-muted-foreground">
                Comprehensive cost visibility across your multi-cloud infrastructure
              </p>
            </div>
            
            <div className="flex items-center space-x-3 laptop:space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span className="text-xs laptop:text-sm">Last updated: {data?.lastUpdated ? 
                  new Date(data.lastUpdated)?.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  }) : 'Never'
                }</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                loading={loading}
                iconName="RefreshCw" 
                iconPosition="left"
                className="text-xs laptop:text-sm"
              >
                Refresh
              </Button>
              
              <Button 
                variant="primary" 
                size="sm" 
                iconName="Download" 
                iconPosition="left"
                className="text-xs laptop:text-sm"
              >
                Export
              </Button>
            </div>
          </div>

          {/* Loading State with better UX */}
          {loading && !data && (
            <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-4 gap-4 laptop:gap-5">
              {[...Array(4)]?.map((_, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4 laptop:p-5 animate-pulse">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 laptop:w-10 laptop:h-10 bg-muted rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-3 laptop:h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-2 laptop:h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-6 laptop:h-8 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-3 laptop:h-4 bg-muted rounded w-3/4"></div>
                </div>
              ))}
            </div>
          )}

          {/* Key Metrics Cards - Optimized for 1024px */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-4 gap-4 laptop:gap-5">
              {(data?.keyMetrics || [
                {
                  title: 'Total Monthly Spend',
                  value: '$28,098',
                  change: '+12.5%',
                  changeType: 'negative',
                  icon: 'DollarSign',
                  subtitle: 'Demo data - connect providers for real data'
                },
                {
                  title: 'Month-over-Month',
                  value: '+$3,086',
                  change: '+12.5%',
                  changeType: 'negative',
                  icon: 'TrendingUp',
                  subtitle: 'vs last month'
                },
                {
                  title: 'Budget Utilization',
                  value: '78.9%',
                  change: '-2.1%',
                  changeType: 'positive',
                  icon: 'Target',
                  subtitle: 'of monthly budget'
                },
                {
                  title: 'Cost Savings',
                  value: '$8,940',
                  change: '+15.3%',
                  changeType: 'positive',
                  icon: 'PiggyBank',
                  subtitle: 'This month'
                }
              ])?.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  subtitle={metric?.subtitle}
                  trend={index === 0 && hasConnectedProviders}
                />
              ))}
            </div>
          )}

          {/* Cost Trend Chart - Optimized for 1024px */}
          {!loading && (
            <div className="w-full">
              <CostTrendChart 
                data={data?.costTrends || []} 
                hasData={hasConnectedProviders || (data?.costTrends && data?.costTrends?.length > 0)} 
              />
            </div>
          )}

          {/* Three Column Layout - Adjusted for 1024px screens */}
          <div className="grid grid-cols-1 laptop:grid-cols-3 gap-4 laptop:gap-5">
            {/* Left Column - Top Spending Services */}
            <div className="laptop:col-span-1">
              <TopSpendingServices data={data?.serviceBreakdown} hasData={hasConnectedProviders} />
            </div>
            
            {/* Center Column - Cost Anomalies */}
            <div className="laptop:col-span-1">
              <CostAnomalies data={data?.anomalies} hasData={hasConnectedProviders} />
            </div>
            
            {/* Right Column - Optimization Recommendations */}
            <div className="laptop:col-span-1">
              <OptimizationRecommendations data={data?.recommendations} hasData={hasConnectedProviders} />
            </div>
          </div>

          {/* Quick Actions - Full width for 1024px */}
          <div className="w-full">
            <QuickActions hasConnections={hasConnectedProviders} />
          </div>

          {/* Footer Summary - Optimized for 1024px */}
          <div className="bg-card border border-border rounded-lg p-4 laptop:p-5">
            <div className="flex flex-col laptop:flex-row laptop:items-center laptop:justify-between space-y-3 laptop:space-y-0">
              <div className="flex items-center space-x-4 laptop:space-x-6">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 laptop:w-3 laptop:h-3 rounded-full ${hasConnectedProviders ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
                  <span className="text-xs laptop:text-sm text-muted-foreground">
                    {hasConnectedProviders ? 'Data syncing active' : 'No active connections'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={14} className="text-success" />
                  <span className="text-xs laptop:text-sm text-muted-foreground">SOC2 Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={14} className="text-success" />
                  <span className="text-xs laptop:text-sm text-muted-foreground">Enterprise Security</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 laptop:space-x-4">
                <span className="text-xs text-muted-foreground">
                  © {new Date()?.getFullYear()} FinOps Dashboard. All rights reserved.
                </span>
                <div className="flex items-center space-x-2">
                  <Icon name="HelpCircle" size={14} className="text-muted-foreground" />
                  <Button variant="ghost" size="sm" className="text-xs laptop:text-sm">
                    Help & Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;