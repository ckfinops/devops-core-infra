import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BudgetOverviewCards from './components/BudgetOverviewCards';
import ForecastingChart from './components/ForecastingChart';
import BudgetBreakdownTree from './components/BudgetBredownTree';
import ScenarioPlanningTable from './components/ScenarioPlanningTable';
import BudgetAlerts from './components/BudgetAlerts';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BudgetPlanningForecasting = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('overview');

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const viewOptions = [
    { id: 'overview', label: 'Budget Overview', icon: 'LayoutDashboard' },
    { id: 'forecasting', label: 'Forecasting', icon: 'TrendingUp' },
    { id: 'breakdown', label: 'Budget Breakdown', icon: 'TreePine' },
    { id: 'scenarios', label: 'Scenario Planning', icon: 'GitBranch' },
    { id: 'alerts', label: 'Budget Alerts', icon: 'Bell' }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-8">
            <BudgetOverviewCards />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <ForecastingChart />
              <BudgetBreakdownTree />
            </div>
          </div>
        );
      case 'forecasting':
        return <ForecastingChart />;
      case 'breakdown':
        return <BudgetBreakdownTree />;
      case 'scenarios':
        return <ScenarioPlanningTable />;
      case 'alerts':
        return <BudgetAlerts />;
      default:
        return (
          <div className="space-y-8">
            <BudgetOverviewCards />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <ForecastingChart />
              <BudgetBreakdownTree />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Budget Planning & Forecasting - FinOps Dashboard</title>
        <meta name="description" content="Create accurate cost projections and maintain budget control across all technology spending categories with sophisticated financial planning tools." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleToggleSidebar} />
        
        <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-14 xl:ml-16' : 'ml-52 xl:ml-60'}`}>
          <div className="p-4 xl:p-8">
            {/* Page Header - Optimized for 1024px */}
            <div className="mb-6 xl:mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div>
                  <h1 className="text-2xl xl:text-3xl font-bold text-foreground">Budget Planning & Forecasting</h1>
                  <p className="text-muted-foreground mt-1 xl:mt-2">
                    Create accurate cost projections and maintain budget control across all technology spending
                  </p>
                </div>
                
                <div className="flex items-center flex-wrap gap-2 xl:space-x-3">
                  <Button variant="outline" size="sm" iconName="Download">
                    Export Report
                  </Button>
                  <Button variant="outline" size="sm" iconName="RefreshCw">
                    Refresh Data
                  </Button>
                  <Button variant="default" size="sm" iconName="Settings">
                    Budget Settings
                  </Button>
                </div>
              </div>

              {/* View Navigation - Responsive for 1024px */}
              <div className="flex items-center flex-wrap gap-1 mt-4 xl:mt-6 p-1 bg-muted rounded-lg w-full lg:w-fit">
                {viewOptions?.map((option) => (
                  <Button
                    key={option?.id}
                    variant={activeView === option?.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveView(option?.id)}
                    iconName={option?.icon}
                    className="relative text-xs xl:text-sm px-2 xl:px-3 py-1.5 xl:py-2"
                  >
                    {option?.label}
                    {option?.id === 'alerts' && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Stats Bar - Optimized grid for 1024px */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 xl:gap-4 mb-6 xl:mb-8 p-3 xl:p-4 bg-card border border-border rounded-lg">
              <div className="text-center">
                <div className="text-lg xl:text-2xl font-bold text-card-foreground">$2.45M</div>
                <div className="text-xs xl:text-sm text-muted-foreground">Total Budget FY24</div>
              </div>
              <div className="text-center">
                <div className="text-lg xl:text-2xl font-bold text-success">68.3%</div>
                <div className="text-xs xl:text-sm text-muted-foreground">Budget Utilized</div>
              </div>
              <div className="text-center">
                <div className="text-lg xl:text-2xl font-bold text-warning">$45K</div>
                <div className="text-xs xl:text-sm text-muted-foreground">Projected Variance</div>
              </div>
              <div className="text-center">
                <div className="text-lg xl:text-2xl font-bold text-primary">94.7%</div>
                <div className="text-xs xl:text-sm text-muted-foreground">Forecast Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-lg xl:text-2xl font-bold text-error">5</div>
                <div className="text-xs xl:text-sm text-muted-foreground">Active Alerts</div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6 xl:space-y-8">
              {renderActiveView()}
            </div>

            {/* Collaborative Features - Responsive layout for 1024px */}
            <div className="mt-6 xl:mt-8 p-4 xl:p-6 bg-card border border-border rounded-lg">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 space-y-2 lg:space-y-0">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">Collaboration & Approvals</h3>
                  <p className="text-sm text-muted-foreground">
                    Track budget planning progress and approval workflows
                  </p>
                </div>
                <Button variant="outline" size="sm" iconName="MessageSquare">
                  View Comments
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xl:gap-6">
                <div className="text-center p-3 xl:p-4 bg-muted/30 rounded-lg">
                  <Icon name="Clock" size={20} className="xl:w-6 xl:h-6 text-warning mx-auto mb-2" />
                  <div className="font-semibold text-card-foreground text-sm xl:text-base">3 Pending Reviews</div>
                  <div className="text-xs xl:text-sm text-muted-foreground">Awaiting department approval</div>
                </div>
                
                <div className="text-center p-3 xl:p-4 bg-muted/30 rounded-lg">
                  <Icon name="Users" size={20} className="xl:w-6 xl:h-6 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-card-foreground text-sm xl:text-base">8 Stakeholders</div>
                  <div className="text-xs xl:text-sm text-muted-foreground">Involved in planning process</div>
                </div>
                
                <div className="text-center p-3 xl:p-4 bg-muted/30 rounded-lg">
                  <Icon name="CheckCircle" size={20} className="xl:w-6 xl:h-6 text-success mx-auto mb-2" />
                  <div className="font-semibold text-card-foreground text-sm xl:text-base">12 Approved</div>
                  <div className="text-xs xl:text-sm text-muted-foreground">Budget allocations finalized</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BudgetPlanningForecasting;