import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OptimizationRecommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'rightsizing', label: 'Rightsizing' },
    { value: 'reserved', label: 'Reserved Instances' },
    { value: 'storage', label: 'Storage' },
    { value: 'scheduling', label: 'Scheduling' }
  ];

  const mockRecommendations = [
    {
      id: 1,
      title: 'Rightsize EC2 Instances',
      description: 'Downsize 12 over-provisioned EC2 instances that are consistently under 30% CPU utilization',
      category: 'rightsizing',
      potentialSavings: 2840,
      effort: 'low',
      impact: 'high',
      service: 'AWS EC2',
      timeframe: '1 week',
      confidence: 95,
      icon: 'Zap',
      status: 'new'
    },
    {
      id: 2,
      title: 'Purchase Reserved Instances',
      description: 'Convert 8 on-demand instances to reserved instances for consistent workloads',
      category: 'reserved',
      potentialSavings: 1920,
      effort: 'medium',
      impact: 'high',
      service: 'AWS EC2',
      timeframe: '1 month',
      confidence: 88,
      icon: 'Shield',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Optimize Storage Classes',
      description: 'Move infrequently accessed data to cheaper storage tiers (IA, Glacier)',
      category: 'storage',
      potentialSavings: 1450,
      effort: 'low',
      impact: 'medium',
      service: 'AWS S3',
      timeframe: '2 weeks',
      confidence: 92,
      icon: 'Archive',
      status: 'new'
    },
    {
      id: 4,
      title: 'Schedule Dev/Test Resources',
      description: 'Automatically stop development environments during off-hours and weekends',
      category: 'scheduling',
      potentialSavings: 890,
      effort: 'medium',
      impact: 'medium',
      service: 'Multi-Cloud',
      timeframe: '3 days',
      confidence: 85,
      icon: 'Clock',
      status: 'new'
    },
    {
      id: 5,
      title: 'Clean Up Unused Resources',
      description: 'Remove 23 unattached EBS volumes and 15 unused load balancers',
      category: 'cleanup',
      potentialSavings: 650,
      effort: 'low',
      impact: 'low',
      service: 'AWS',
      timeframe: '1 day',
      confidence: 98,
      icon: 'Trash2',
      status: 'approved'
    }
  ];

  const filteredRecommendations = selectedCategory === 'all' 
    ? mockRecommendations 
    : mockRecommendations?.filter(rec => rec?.category === selectedCategory);

  const getEffortColor = (effort) => {
    switch (effort) {
      case 'low': return 'bg-success/10 text-success border-success/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'high': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-primary/10 text-primary border-primary/20';
      case 'in-progress': return 'bg-accent/10 text-accent border-accent/20';
      case 'approved': return 'bg-success/10 text-success border-success/20';
      case 'dismissed': return 'bg-muted/10 text-muted-foreground border-border';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return 'Plus';
      case 'in-progress': return 'Clock';
      case 'approved': return 'CheckCircle';
      case 'dismissed': return 'X';
      default: return 'Circle';
    }
  };

  const totalSavings = filteredRecommendations?.reduce((sum, rec) => sum + rec?.potentialSavings, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Optimization Recommendations</h2>
          <p className="text-sm text-muted-foreground">
            Potential savings: <span className="font-medium text-success">${totalSavings?.toLocaleString()}/month</span>
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e?.target?.value)}
            className="px-3 py-1 text-xs bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories?.map((category) => (
              <option key={category?.value} value={category?.value}>
                {category?.label}
              </option>
            ))}
          </select>
          <Button variant="ghost" size="icon">
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredRecommendations?.map((recommendation) => (
          <div key={recommendation?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-150">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={recommendation?.icon} size={18} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-sm font-medium text-foreground">{recommendation?.title}</h3>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getImpactColor(recommendation?.impact)}`}>
                    {recommendation?.impact} impact
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getStatusColor(recommendation?.status)}`}>
                    <Icon name={getStatusIcon(recommendation?.status)} size={10} className="inline mr-1" />
                    {recommendation?.status}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {recommendation?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="DollarSign" size={12} className="text-success" />
                      <span className="text-sm font-medium text-success">
                        ${recommendation?.potentialSavings?.toLocaleString()}/mo
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getEffortColor(recommendation?.effort)}`}>
                      {recommendation?.effort} effort
                    </span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Target" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{recommendation?.confidence}% confidence</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {recommendation?.timeframe}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Icon name="ArrowRight" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">High Impact: 2</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-xs text-muted-foreground">Medium Impact: 2</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <span className="text-xs text-muted-foreground">Low Impact: 1</span>
            </div>
          </div>
          
          <Button variant="primary" size="sm" iconName="Play" iconPosition="left">
            Apply All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OptimizationRecommendations;