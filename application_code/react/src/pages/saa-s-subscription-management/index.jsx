import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricCard from '../dashboard-overview/components/MetricCard';

import SubscriptionInventoryTable from './components/SubscriptionInventoryTable';
import SubscriptionAnalytics from './components/SubscriptionAnalytics';
import OptimizationRecommendations from './components/OptimizationRecommendations';
import FilterSidebar from './components/FilterSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SaaSSubscriptionManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

  // Mock subscription metrics data
  const subscriptionMetrics = [
    {
      title: 'Total SaaS Spend',
      value: '$324,890',
      change: '+8.3%',
      changeType: 'negative',
      icon: 'CreditCard',
      subtitle: 'Monthly recurring'
    },
    {
      title: 'Active Subscriptions',
      value: '247',
      change: '+12',
      changeType: 'neutral',
      icon: 'Package',
      subtitle: 'Across organization'
    },
    {
      title: 'Unused Licenses',
      value: '1,284',
      change: '-5.2%',
      changeType: 'positive',
      icon: 'UserX',
      subtitle: 'Potential savings'
    },
    {
      title: 'Optimization Savings',
      value: '$47,230',
      change: '+22.4%',
      changeType: 'positive',
      icon: 'TrendingUp',
      subtitle: 'This quarter'
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

  const handleSubscriptionSelect = (subscription) => {
    setSelectedSubscription(subscription);
  };

  const handleFilterToggle = () => {
    setFilterSidebarOpen(!filterSidebarOpen);
  };

  // Auto-refresh every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30 * 60 * 1000);

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
              <h1 className="text-2xl font-bold text-foreground">SaaS Subscription Management</h1>
              <p className="text-muted-foreground">
                Comprehensive oversight and optimization of software-as-a-service spending
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
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleFilterToggle}
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
              
              <Button variant="primary" size="sm" iconName="Plus" iconPosition="left">
                Add Subscription
              </Button>
            </div>
          </div>

          {/* Subscription Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {subscriptionMetrics?.map((metric, index) => (
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

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Pane - Subscription Inventory */}
            <div className="xl:col-span-2">
              <SubscriptionInventoryTable
                onSubscriptionSelect={handleSubscriptionSelect}
                selectedSubscription={selectedSubscription}
              />
            </div>
            
            {/* Right Pane - Subscription Analytics */}
            <div className="xl:col-span-1">
              <SubscriptionAnalytics selectedSubscription={selectedSubscription} />
            </div>
          </div>

          {/* Optimization Recommendations */}
          <div className="w-full">
            <OptimizationRecommendations />
          </div>

          {/* Footer Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">License tracking active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">Vendor integrations secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">Identity provider synced</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" iconName="FileText" iconPosition="left">
                  Contract Analysis
                </Button>
                <Button variant="ghost" size="sm" iconName="Bell" iconPosition="left">
                  Renewal Alerts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Filter Sidebar */}
      <FilterSidebar 
        isOpen={filterSidebarOpen} 
        onClose={() => setFilterSidebarOpen(false)} 
      />
    </div>
  );
};

export default SaaSSubscriptionManagement;