import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OptimizationSidebar = () => {
  const [expandedSection, setExpandedSection] = useState('recommendations');

  // Mock optimization data
  const optimizationData = {
    recommendations: [
      {
        id: 1,
        type: 'rightsizing',
        title: 'Downsize GPU Instance',
        description: 'training-node-02 is underutilized',
        potential: 1240,
        priority: 'high',
        action: 'Reduce from A100 to V100'
      },
      {
        id: 2,
        type: 'scheduling',
        title: 'Optimize Training Schedule',
        description: 'Schedule jobs during off-peak hours',
        potential: 890,
        priority: 'medium',
        action: 'Enable auto-scheduling'
      },
      {
        id: 3,
        type: 'termination',
        title: 'Terminate Idle Resources',
        description: '3 instances running without workload',
        potential: 2100,
        priority: 'high',
        action: 'Auto-terminate after 30min idle'
      }
    ],
    alerts: [
      {
        id: 1,
        type: 'cost',
        message: 'Training job exceeded budget threshold',
        severity: 'high',
        timestamp: '2 minutes ago'
      },
      {
        id: 2,
        type: 'utilization',
        message: 'GPU cluster below 20% utilization',
        severity: 'medium',
        timestamp: '15 minutes ago'
      },
      {
        id: 3,
        type: 'efficiency',
        message: 'Model training efficiency dropped',
        severity: 'low',
        timestamp: '1 hour ago'
      }
    ],
    quickActions: [
      { id: 1, icon: 'Square', label: 'Stop All Idle Jobs', action: 'stop_idle' },
      { id: 2, icon: 'RotateCcw', label: 'Restart Failed Jobs', action: 'restart_failed' },
      { id: 3, icon: 'Zap', label: 'Auto-Scale Clusters', action: 'autoscale' },
      { id: 4, icon: 'Settings', label: 'Optimize Models', action: 'optimize_models' }
    ]
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={16} className="mr-2" />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          {optimizationData?.quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant="outline"
              size="sm"
              className="justify-start h-auto p-3"
            >
              <div className="flex flex-col items-start space-y-1">
                <Icon name={action?.icon} size={16} />
                <span className="text-xs">{action?.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-card border border-border rounded-lg">
        <div 
          className="p-6 border-b border-border cursor-pointer"
          onClick={() => toggleSection('recommendations')}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center">
              <Icon name="Target" size={16} className="mr-2" />
              Optimization Recommendations
            </h3>
            <Icon 
              name={expandedSection === 'recommendations' ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
              className="text-muted-foreground" 
            />
          </div>
        </div>

        {expandedSection === 'recommendations' && (
          <div className="p-6 space-y-4">
            {optimizationData?.recommendations?.map((rec) => (
              <div key={rec?.id} className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-foreground">{rec?.title}</h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(rec?.priority)}`}>
                        {rec?.priority}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{rec?.description}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="DollarSign" size={12} className="text-success" />
                        <span className="text-xs font-medium text-success">
                          {formatCurrency(rec?.potential)}/mo
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {rec?.action}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Dismiss
                  </Button>
                  <Button variant="primary" size="sm" className="flex-1">
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cost Alerts */}
      <div className="bg-card border border-border rounded-lg">
        <div 
          className="p-6 border-b border-border cursor-pointer"
          onClick={() => toggleSection('alerts')}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center">
              <Icon name="AlertTriangle" size={16} className="mr-2" />
              Cost Alerts
              <span className="ml-2 text-xs bg-error/10 text-error px-2 py-1 rounded-full">
                {optimizationData?.alerts?.length}
              </span>
            </h3>
            <Icon 
              name={expandedSection === 'alerts' ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
              className="text-muted-foreground" 
            />
          </div>
        </div>

        {expandedSection === 'alerts' && (
          <div className="p-6 space-y-4">
            {optimizationData?.alerts?.map((alert) => (
              <div key={alert?.id} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={
                      alert?.type === 'cost' ? 'DollarSign' :
                      alert?.type === 'utilization'? 'Activity' : 'TrendingDown'
                    } 
                    size={14} 
                    className={getSeverityColor(alert?.severity)} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{alert?.message}</p>
                  <p className="text-xs text-muted-foreground">{alert?.timestamp}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="X" size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ML Cost Insights */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={16} className="mr-2" />
          Cost Insights
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Training vs Inference</span>
            <span className="text-sm font-medium text-foreground">58% / 42%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">GPU Efficiency</span>
            <span className="text-sm font-medium text-success">73.4%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Cost per Model</span>
            <span className="text-sm font-medium text-foreground">$1,847</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Waste Reduction</span>
            <span className="text-sm font-medium text-success">+18.5%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationSidebar;