import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OptimizationRecommendations = () => {
  const [activeTab, setActiveTab] = useState('rightsizing');

  // Mock recommendations data
  const recommendations = {
    rightsizing: [
      {
        id: 1,
        type: 'downsize',
        application: 'Figma Professional',
        currentLicenses: 25,
        recommendedLicenses: 15,
        monthlySavings: 1440,
        confidence: 'High',
        reason: 'Only 12 users active in last 3 months',
        impact: 'High'
      },
      {
        id: 2,
        type: 'downsize',
        application: 'Adobe Creative Suite',
        currentLicenses: 50,
        recommendedLicenses: 35,
        monthlySavings: 900,
        confidence: 'Medium',
        reason: 'Low utilization during off-season',
        impact: 'Medium'
      }
    ],
    consolidation: [
      {
        id: 3,
        type: 'duplicate',
        applications: ['Zoom Pro', 'Microsoft Teams', 'Google Meet'],
        recommendation: 'Consolidate to Microsoft Teams',
        monthlySavings: 2400,
        confidence: 'High',
        reason: 'Overlapping video conferencing tools',
        impact: 'High'
      },
      {
        id: 4,
        type: 'alternative',
        application: 'Slack Enterprise',
        alternative: 'Microsoft Teams',
        monthlySavings: 1800,
        confidence: 'Medium',
        reason: 'Already have Teams license',
        impact: 'Medium'
      }
    ],
    contracts: [
      {
        id: 5,
        type: 'renewal',
        application: 'Salesforce',
        renewalDate: '2024-12-15',
        currentCost: 11250,
        negotiationPotential: 1125,
        confidence: 'High',
        reason: 'Volume discount available',
        impact: 'High'
      },
      {
        id: 6,
        type: 'upgrade',
        application: 'Jira Software',
        currentPlan: 'Standard',
        recommendedPlan: 'Premium',
        additionalCost: 420,
        benefits: 'Advanced reporting, automation',
        confidence: 'Medium',
        impact: 'Medium'
      }
    ]
  };

  const tabs = [
    { id: 'rightsizing', label: 'License Rightsizing', icon: 'Users' },
    { id: 'consolidation', label: 'App Consolidation', icon: 'GitMerge' },
    { id: 'contracts', label: 'Contract Optimization', icon: 'FileText' }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Low': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'High': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatSavings = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const renderRecommendationCard = (recommendation) => {
    return (
      <div key={recommendation?.id} className="bg-muted/30 rounded-lg p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium text-foreground">
                {recommendation?.application || recommendation?.applications?.join(', ')}
              </h4>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getImpactColor(recommendation?.impact)}`}>
                {recommendation?.impact} Impact
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground">{recommendation?.reason}</p>
            
            <div className="flex items-center space-x-4">
              {recommendation?.monthlySavings && (
                <div className="flex items-center space-x-1">
                  <Icon name="DollarSign" size={14} className="text-success" />
                  <span className="text-sm font-medium text-success">
                    {formatSavings(recommendation?.monthlySavings)}/mo savings
                  </span>
                </div>
              )}
              
              <div className="flex items-center space-x-1">
                <Icon name="Target" size={14} className={getConfidenceColor(recommendation?.confidence)} />
                <span className={`text-sm ${getConfidenceColor(recommendation?.confidence)}`}>
                  {recommendation?.confidence} confidence
                </span>
              </div>
            </div>

            {recommendation?.type === 'downsize' && (
              <div className="text-xs text-muted-foreground">
                Reduce from {recommendation?.currentLicenses} to {recommendation?.recommendedLicenses} licenses
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Dismiss
            </Button>
            <Button variant="primary" size="sm">
              Implement
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Optimization Recommendations</h2>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh Analysis
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        <div className="space-y-4">
          {recommendations?.[activeTab]?.map(renderRecommendationCard)}
        </div>

        {recommendations?.[activeTab]?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-2">All optimized!</h3>
            <p className="text-xs text-muted-foreground">
              No {tabs?.find(t => t?.id === activeTab)?.label?.toLowerCase()} recommendations at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizationRecommendations;