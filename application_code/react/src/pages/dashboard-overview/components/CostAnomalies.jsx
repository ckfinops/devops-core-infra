import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CostAnomalies = () => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const severityLevels = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const mockAnomalies = [
    {
      id: 1,
      title: 'Unusual EC2 Spike',
      description: 'EC2 costs increased by 340% in the last 4 hours due to auto-scaling event',
      severity: 'critical',
      impact: 2840,
      service: 'AWS EC2',
      timestamp: '2025-08-23T09:15:00Z',
      status: 'investigating',
      category: 'compute',
      icon: 'AlertTriangle'
    },
    {
      id: 2,
      title: 'Storage Cost Anomaly',
      description: 'Azure Blob Storage showing 180% increase compared to baseline usage patterns',
      severity: 'high',
      impact: 1250,
      service: 'Azure Storage',
      timestamp: '2025-08-23T07:30:00Z',
      status: 'acknowledged',
      category: 'storage',
      icon: 'HardDrive'
    },
    {
      id: 3,
      title: 'AI Model Training Overrun',
      description: 'OpenAI API usage exceeded expected limits by 220% during model fine-tuning',
      severity: 'high',
      impact: 890,
      service: 'OpenAI API',
      timestamp: '2025-08-23T06:45:00Z',
      status: 'resolved',
      category: 'ai',
      icon: 'Brain'
    },
    {
      id: 4,
      title: 'Network Transfer Spike',
      description: 'GCP Cloud CDN bandwidth usage 150% above normal due to traffic surge',
      severity: 'medium',
      impact: 420,
      service: 'GCP CDN',
      timestamp: '2025-08-22T22:20:00Z',
      status: 'monitoring',
      category: 'network',
      icon: 'Globe'
    },
    {
      id: 5,
      title: 'Database Query Costs',
      description: 'BigQuery processing costs increased due to inefficient query patterns',
      severity: 'medium',
      impact: 310,
      service: 'GCP BigQuery',
      timestamp: '2025-08-22T18:15:00Z',
      status: 'resolved',
      category: 'database',
      icon: 'Database'
    }
  ];

  const filteredAnomalies = selectedSeverity === 'all' 
    ? mockAnomalies 
    : mockAnomalies?.filter(anomaly => anomaly?.severity === selectedSeverity);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error text-error-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'investigating': return 'bg-error/10 text-error border-error/20';
      case 'acknowledged': return 'bg-warning/10 text-warning border-warning/20';
      case 'monitoring': return 'bg-accent/10 text-accent border-accent/20';
      case 'resolved': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'investigating': return 'Search';
      case 'acknowledged': return 'Eye';
      case 'monitoring': return 'Activity';
      case 'resolved': return 'CheckCircle';
      default: return 'Clock';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Cost Anomalies</h2>
          <p className="text-sm text-muted-foreground">Recent unusual spending patterns</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e?.target?.value)}
            className="px-3 py-1 text-xs bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {severityLevels?.map((level) => (
              <option key={level?.value} value={level?.value}>
                {level?.label}
              </option>
            ))}
          </select>
          <Button variant="ghost" size="icon">
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredAnomalies?.map((anomaly) => (
          <div key={anomaly?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-150">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={anomaly?.icon} size={18} className="text-muted-foreground" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-sm font-medium text-foreground">{anomaly?.title}</h3>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSeverityColor(anomaly?.severity)}`}>
                    {anomaly?.severity}
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getStatusColor(anomaly?.status)}`}>
                    <Icon name={getStatusIcon(anomaly?.status)} size={10} className="inline mr-1" />
                    {anomaly?.status}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {anomaly?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="DollarSign" size={12} className="text-error" />
                      <span className="text-sm font-medium text-error">
                        +${anomaly?.impact?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Server" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{anomaly?.service}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(anomaly?.timestamp)}
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
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-xs text-muted-foreground">Critical: 1</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-xs text-muted-foreground">High: 2</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-xs text-muted-foreground">Medium: 2</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" iconName="Bell" iconPosition="left">
            Configure Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CostAnomalies;