import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ImpactSummaryCard from './components/ImpactSummaryCard';
import RecommendationTable from './components/RecommendationTable';
import FilterSidebar from './components/FilterSidebar';
import ImplementationPanel from './components/ImplementationPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CostOptimizationRecommendations = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterSidebarCollapsed, setFilterSidebarCollapsed] = useState(false);
  const [implementationPanelOpen, setImplementationPanelOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [filters, setFilters] = useState({
    categories: [],
    effort: [],
    risk: [],
    savingsRange: { min: 0, max: 100000 },
    impactScore: { min: 0, max: 10 }
  });

  const mockSummaryData = [
    {
      title: "Total Potential Savings",
      value: "$127,450",
      subtitle: "Monthly savings opportunity",
      icon: "DollarSign",
      trend: 12.5,
      color: "success"
    },
    {
      title: "Active Recommendations",
      value: "24",
      subtitle: "Optimization opportunities",
      icon: "Lightbulb",
      trend: -3.2,
      color: "primary"
    },
    {
      title: "Implementation Complexity",
      value: "Medium",
      subtitle: "Average effort required",
      icon: "BarChart3",
      color: "warning"
    },
    {
      title: "Projected ROI",
      value: "340%",
      subtitle: "12-month return estimate",
      icon: "TrendingUp",
      trend: 8.7,
      color: "accent"
    }
  ];

  const mockRecommendations = [
    {
      id: 1,
      type: "Rightsizing",
      title: "Downsize over-provisioned EC2 instances",
      resource: "EC2 Instances (us-east-1)",
      resourceCount: 12,
      potentialSavings: "$8,450",
      savingsPercentage: "32% reduction",
      effort: "Low",
      risk: "Low",
      confidence: 95,
      impactScore: 8.5,
      timeline: "1-2 days",
      analysis: `Analysis of CPU and memory utilization over the past 30 days shows that 12 EC2 instances in us-east-1 are consistently running at less than 20% capacity. These instances can be safely downsized to smaller instance types without impacting performance.`,
      steps: [
        "Review detailed utilization metrics for each instance",
        "Create AMI snapshots for rollback capability",
        "Schedule maintenance window with stakeholders",
        "Stop instances and change instance types",
        "Start instances and verify application functionality",
        "Monitor performance for 48 hours post-change"
      ]
    },
    {
      id: 2,
      type: "Reserved Instance",
      title: "Purchase Reserved Instances for stable workloads",
      resource: "RDS MySQL Instances",
      resourceCount: 8,
      potentialSavings: "$15,200",
      savingsPercentage: "45% reduction",
      effort: "Medium",
      risk: "Low",
      confidence: 88,
      impactScore: 9.2,
      timeline: "1 week",
      analysis: `8 RDS MySQL instances have been running consistently for over 6 months with stable usage patterns. Purchasing 1-year Reserved Instances would provide significant cost savings with minimal risk.`,
      steps: [
        "Analyze historical usage patterns",
        "Calculate optimal RI purchase strategy",
        "Get budget approval from finance team",
        "Purchase Reserved Instances through AWS console",
        "Configure automatic RI application",
        "Set up monitoring for RI utilization"
      ]
    },
    {
      id: 3,
      type: "Unused Resource",
      title: "Delete unattached EBS volumes",
      resource: "EBS Volumes (multiple regions)",
      resourceCount: 45,
      potentialSavings: "$2,340",
      savingsPercentage: "100% elimination",
      effort: "Low",
      risk: "Medium",
      confidence: 92,
      impactScore: 7.8,
      timeline: "2-3 hours",
      analysis: `45 EBS volumes across multiple regions are unattached and have been unused for over 30 days. These volumes are generating unnecessary storage costs and can be safely deleted after proper verification.`,
      steps: [
        "Generate list of unattached EBS volumes",
        "Verify volumes are not needed for recovery",
        "Create final snapshots for critical volumes",
        "Notify teams about planned deletion",
        "Delete unattached volumes",
        "Verify cost reduction in next billing cycle"
      ]
    },
    {
      id: 4,
      type: "Storage Optimization",
      title: "Migrate infrequently accessed data to IA storage",
      resource: "S3 Buckets (data-archive-*)",
      resourceCount: 23,
      potentialSavings: "$4,890",
      savingsPercentage: "60% reduction",
      effort: "Medium",
      risk: "Low",
      confidence: 85,
      impactScore: 8.1,
      timeline: "3-5 days",
      analysis: `Analysis of S3 access patterns shows that 23 buckets contain data that hasn't been accessed in over 90 days. Migrating this data to Infrequent Access storage class would significantly reduce costs.`,
      steps: [
        "Analyze S3 access patterns and object age",
        "Create lifecycle policies for automatic transition",
        "Test lifecycle policies on non-critical buckets",
        "Apply lifecycle policies to production buckets",
        "Monitor transition progress and costs",
        "Validate data accessibility after transition"
      ]
    },
    {
      id: 5,
      type: "Network Optimization",
      title: "Optimize data transfer costs",
      resource: "CloudFront Distributions",
      resourceCount: 6,
      potentialSavings: "$3,200",
      savingsPercentage: "25% reduction",
      effort: "High",
      risk: "Medium",
      confidence: 78,
      impactScore: 6.9,
      timeline: "1-2 weeks",
      analysis: `6 CloudFront distributions are configured with suboptimal caching strategies and price classes, resulting in higher data transfer costs. Optimizing these configurations could reduce bandwidth costs significantly.`,
      steps: [
        "Audit current CloudFront configurations",
        "Analyze traffic patterns and geographic distribution",
        "Optimize caching behaviors and TTL settings",
        "Adjust price classes based on traffic patterns",
        "Implement origin request policies",
        "Monitor performance and cost impact"
      ]
    }
  ];

  const handleImplement = (recommendation) => {
    setSelectedRecommendation(recommendation);
    setImplementationPanelOpen(true);
  };

  const handleViewDetails = (recommendation) => {
    setSelectedRecommendation(recommendation);
    setImplementationPanelOpen(true);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredRecommendations = mockRecommendations?.filter(rec => {
    // Filter by categories
    if (filters?.categories?.length > 0 && !filters?.categories?.includes(rec?.type)) {
      return false;
    }
    
    // Filter by effort
    if (filters?.effort?.length > 0 && !filters?.effort?.includes(rec?.effort)) {
      return false;
    }
    
    // Filter by risk
    if (filters?.risk?.length > 0 && !filters?.risk?.includes(rec?.risk)) {
      return false;
    }
    
    // Filter by savings range
    const savings = parseFloat(rec?.potentialSavings?.replace(/[$,]/g, ''));
    if (savings < filters?.savingsRange?.min || savings > filters?.savingsRange?.max) {
      return false;
    }
    
    // Filter by impact score
    if (rec?.impactScore < filters?.impactScore?.min || rec?.impactScore > filters?.impactScore?.max) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-12 lg:ml-14' : 'ml-48 lg:ml-52'}`}>
        <div className="flex">
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isCollapsed={filterSidebarCollapsed}
            onToggleCollapse={() => setFilterSidebarCollapsed(!filterSidebarCollapsed)}
          />
          
          <main className={`flex-1 transition-all duration-300 ${
            implementationPanelOpen ? 'mr-72 lg:mr-80' : 'mr-0'
          } ${filterSidebarCollapsed ? 'ml-12 lg:ml-14' : 'ml-64 lg:ml-4'}`}>
            <div className="p-4 lg:p-6 pt-20">
              {/* Page Header - Compact for 1024px */}
              <div className="mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                      Cost Optimization Recommendations
                    </h1>
                    <p className="text-muted-foreground">
                      Actionable insights to reduce infrastructure spending while maintaining performance
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                    <Button variant="outline" iconName="RefreshCw" iconPosition="left" size="sm">
                      Refresh Analysis
                    </Button>
                    <Button variant="outline" iconName="Download" iconPosition="left" size="sm">
                      Export Report
                    </Button>
                    <Button 
                      variant="default" 
                      iconName="Settings" 
                      iconPosition="left"
                      size="sm"
                      onClick={() => setImplementationPanelOpen(!implementationPanelOpen)}
                    >
                      Implementation Panel
                    </Button>
                  </div>
                </div>
              </div>

              {/* Impact Summary Cards - Responsive grid for 1024px */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {mockSummaryData?.map((card, index) => (
                  <ImpactSummaryCard
                    key={index}
                    title={card?.title}
                    value={card?.value}
                    subtitle={card?.subtitle}
                    icon={card?.icon}
                    trend={card?.trend}
                    color={card?.color}
                  />
                ))}
              </div>

              {/* Quick Actions - Compact layout */}
              <div className="bg-card border border-border rounded-lg p-4 lg:p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-2">Quick Actions</h2>
                    <p className="text-sm text-muted-foreground">
                      Fast-track high-impact, low-risk optimizations
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" iconName="Zap" iconPosition="left">
                      Auto-implement Safe Changes
                    </Button>
                    <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
                      Schedule Maintenance Window
                    </Button>
                    <Button variant="outline" size="sm" iconName="Users" iconPosition="left">
                      Request Approvals
                    </Button>
                  </div>
                </div>
              </div>

              {/* Recommendations Table */}
              <div className="mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Recommendations ({filteredRecommendations?.length})
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Prioritized by potential impact and implementation feasibility
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="SortDesc">
                      Sort by Impact
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Filter">
                      Advanced Filters
                    </Button>
                  </div>
                </div>
                
                <RecommendationTable
                  recommendations={filteredRecommendations}
                  onImplement={handleImplement}
                  onViewDetails={handleViewDetails}
                />
              </div>

              {/* Implementation Status - Compact grid */}
              <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Implementation Progress</h2>
                  <Button variant="ghost" size="sm" iconName="ExternalLink">
                    View Full History
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="CheckCircle" size={20} className="lg:w-6 lg:h-6 text-success" />
                    </div>
                    <div className="text-xl lg:text-2xl font-bold text-foreground">8</div>
                    <div className="text-sm text-muted-foreground">Completed This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Clock" size={20} className="lg:w-6 lg:h-6 text-warning" />
                    </div>
                    <div className="text-xl lg:text-2xl font-bold text-foreground">3</div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Calendar" size={20} className="lg:w-6 lg:h-6 text-primary" />
                    </div>
                    <div className="text-xl lg:text-2xl font-bold text-foreground">5</div>
                    <div className="text-sm text-muted-foreground">Scheduled</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ImplementationPanel
        isOpen={implementationPanelOpen}
        onClose={() => setImplementationPanelOpen(false)}
        selectedRecommendation={selectedRecommendation}
      />
    </div>
  );
};

export default CostOptimizationRecommendations;