import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScenarioPlanningTable = () => {
  const [activeScenario, setActiveScenario] = useState('baseline');
  const [showComparison, setShowComparison] = useState(true);

  const scenarios = [
    {
      id: 'conservative',
      name: 'Conservative Growth',
      description: 'Minimal expansion with cost optimization focus',
      totalBudget: 2100000,
      growthRate: 5,
      riskLevel: 'low',
      confidence: 95,
      categories: {
        infrastructure: 800000,
        saas: 450000,
        personnel: 600000,
        marketing: 250000
      },
      keyAssumptions: [
        'No major new product launches',
        'Continued cost optimization initiatives',
        '5% team growth maximum'
      ]
    },
    {
      id: 'baseline',
      name: 'Baseline Scenario',
      description: 'Expected growth based on current trends',
      totalBudget: 2450000,
      growthRate: 12,
      riskLevel: 'medium',
      confidence: 85,
      categories: {
        infrastructure: 950000,
        saas: 520000,
        personnel: 720000,
        marketing: 260000
      },
      keyAssumptions: [
        'Moderate product expansion',
        'Standard market conditions',
        '15% team growth expected'
      ]
    },
    {
      id: 'aggressive',
      name: 'Aggressive Expansion',
      description: 'Rapid growth with increased investment',
      totalBudget: 3200000,
      growthRate: 25,
      riskLevel: 'high',
      confidence: 70,
      categories: {
        infrastructure: 1300000,
        saas: 680000,
        personnel: 950000,
        marketing: 270000
      },
      keyAssumptions: [
        'Major product launches planned',
        'Significant market expansion',
        '30% team growth target'
      ]
    }
  ];

  const comparisonMetrics = [
    { key: 'totalBudget', label: 'Total Budget', format: 'currency' },
    { key: 'growthRate', label: 'Growth Rate', format: 'percentage' },
    { key: 'confidence', label: 'Confidence Level', format: 'percentage' },
    { key: 'infrastructure', label: 'Infrastructure', format: 'currency', category: true },
    { key: 'saas', label: 'SaaS & Tools', format: 'currency', category: true },
    { key: 'personnel', label: 'Personnel', format: 'currency', category: true },
    { key: 'marketing', label: 'Marketing', format: 'currency', category: true }
  ];

  const formatValue = (value, format) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })?.format(value);
      case 'percentage':
        return `${value}%`;
      default:
        return value;
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'low': return 'Shield';
      case 'medium': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      default: return 'HelpCircle';
    }
  };

  const getMetricValue = (scenario, metric) => {
    if (metric?.category) {
      return scenario?.categories?.[metric?.key];
    }
    return scenario?.[metric?.key];
  };

  const calculateVariance = (baseValue, compareValue) => {
    const variance = ((compareValue - baseValue) / baseValue) * 100;
    return variance;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Scenario Planning</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Compare different budget models with what-if analysis
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant={showComparison ? "default" : "outline"}
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
            iconName="BarChart3"
          >
            {showComparison ? "Hide" : "Show"} Comparison
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Export Scenarios
          </Button>
          <Button variant="default" size="sm" iconName="Plus">
            New Scenario
          </Button>
        </div>
      </div>
      {/* Scenario Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {scenarios?.map((scenario) => (
          <div 
            key={scenario?.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              activeScenario === scenario?.id 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => setActiveScenario(scenario?.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-card-foreground">{scenario?.name}</h3>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(scenario?.riskLevel)}`}>
                <Icon name={getRiskIcon(scenario?.riskLevel)} size={12} className="inline mr-1" />
                {scenario?.riskLevel} risk
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">{scenario?.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Budget</span>
                <span className="font-semibold text-card-foreground">
                  {formatValue(scenario?.totalBudget, 'currency')}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Growth Rate</span>
                <span className="font-semibold text-card-foreground">
                  {formatValue(scenario?.growthRate, 'percentage')}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Confidence</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${scenario?.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-card-foreground">
                    {scenario?.confidence}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Detailed Comparison Table */}
      {showComparison && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                  Metric
                </th>
                {scenarios?.map((scenario) => (
                  <th key={scenario?.id} className="text-center p-3 text-sm font-medium text-muted-foreground">
                    {scenario?.name}
                  </th>
                ))}
                <th className="text-center p-3 text-sm font-medium text-muted-foreground">
                  Variance vs Baseline
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonMetrics?.map((metric, index) => {
                const baselineScenario = scenarios?.find(s => s?.id === 'baseline');
                const baselineValue = getMetricValue(baselineScenario, metric);
                
                return (
                  <tr key={metric?.key} className={`border-b border-border ${index % 2 === 0 ? 'bg-muted/20' : ''}`}>
                    <td className="p-3 text-sm font-medium text-card-foreground">
                      {metric?.label}
                    </td>
                    {scenarios?.map((scenario) => {
                      const value = getMetricValue(scenario, metric);
                      return (
                        <td key={scenario?.id} className="text-center p-3 text-sm text-card-foreground">
                          {formatValue(value, metric?.format)}
                        </td>
                      );
                    })}
                    <td className="text-center p-3 text-sm">
                      <div className="flex items-center justify-center space-x-4">
                        {scenarios?.filter(s => s?.id !== 'baseline')?.map((scenario) => {
                          const value = getMetricValue(scenario, metric);
                          const variance = calculateVariance(baselineValue, value);
                          const isPositive = variance > 0;
                          
                          return (
                            <div key={scenario?.id} className="flex items-center space-x-1">
                              <Icon 
                                name={isPositive ? "TrendingUp" : "TrendingDown"} 
                                size={14} 
                                className={isPositive ? "text-error" : "text-success"}
                              />
                              <span className={`text-sm font-medium ${isPositive ? "text-error" : "text-success"}`}>
                                {Math.abs(variance)?.toFixed(1)}%
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {/* Key Assumptions */}
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Key Assumptions - {scenarios?.find(s => s?.id === activeScenario)?.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios?.find(s => s?.id === activeScenario)?.keyAssumptions?.map((assumption, index) => (
            <div key={index} className="flex items-start space-x-2 p-3 bg-muted/30 rounded-lg">
              <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
              <span className="text-sm text-card-foreground">{assumption}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="mt-6 flex items-center justify-end space-x-3">
        <Button variant="outline" size="sm">
          Save as Draft
        </Button>
        <Button variant="outline" size="sm">
          Request Review
        </Button>
        <Button variant="default" size="sm">
          Submit for Approval
        </Button>
      </div>
    </div>
  );
};

export default ScenarioPlanningTable;