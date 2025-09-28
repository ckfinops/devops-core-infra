import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const ActiveAlertsList = ({ onSelectAlert }) => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const activeAlerts = [
    {
      id: 1,
      title: "AWS EC2 Budget Exceeded",
      severity: "critical",
      resource: "Production Environment",
      threshold: "$5,000/month",
      current: "$6,240",
      triggered: "2 hours ago",
      status: "active",
      description: "Monthly EC2 spending has exceeded the configured budget threshold by 24.8%",
      affectedServices: ["EC2", "EBS", "Load Balancer"],
      estimatedImpact: "$1,240"
    },
    {
      id: 2,
      title: "Azure Compute Anomaly Detected",
      severity: "high",
      resource: "Development Cluster",
      threshold: "150% of baseline",
      current: "180% above normal",
      triggered: "4 hours ago",
      status: "investigating",
      description: "Unusual spike in Azure compute costs detected in development environment",
      affectedServices: ["Virtual Machines", "App Service"],
      estimatedImpact: "$890"
    },
    {
      id: 3,
      title: "GCP Storage Cost Increase",
      severity: "medium",
      resource: "Data Lake Storage",
      threshold: "$2,000/month",
      current: "$2,450",
      triggered: "6 hours ago",
      status: "acknowledged",
      description: "Google Cloud Storage costs have increased by 22.5% compared to last month",
      affectedServices: ["Cloud Storage", "BigQuery"],
      estimatedImpact: "$450"
    },
    {
      id: 4,
      title: "Kubernetes Resource Waste",
      severity: "medium",
      resource: "Staging Cluster",
      threshold: "70% utilization",
      current: "35% utilization",
      triggered: "8 hours ago",
      status: "active",
      description: "Low resource utilization detected in Kubernetes staging cluster",
      affectedServices: ["EKS", "Container Registry"],
      estimatedImpact: "$320"
    },
    {
      id: 5,
      title: "SaaS License Overage",
      severity: "low",
      resource: "Monitoring Tools",
      threshold: "100 users",
      current: "115 users",
      triggered: "12 hours ago",
      status: "resolved",
      description: "DataDog license count has exceeded the contracted user limit",
      affectedServices: ["DataDog", "New Relic"],
      estimatedImpact: "$180"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-error bg-error/10';
      case 'investigating': return 'text-warning bg-warning/10';
      case 'acknowledged': return 'text-accent bg-accent/10';
      case 'resolved': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert?.id);
    onSelectAlert(alert);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Active Alerts</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {activeAlerts?.map((alert) => (
          <div 
            key={alert?.id}
            className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors duration-150 ${
              selectedAlert === alert?.id ? 'bg-muted/30 border-l-4 border-l-primary' : ''
            }`}
            onClick={() => handleAlertClick(alert)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert?.severity)}`}>
                  {alert?.severity?.toUpperCase()}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert?.status)}`}>
                  {alert?.status?.charAt(0)?.toUpperCase() + alert?.status?.slice(1)}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{alert?.triggered}</span>
            </div>
            
            <h3 className="font-medium text-foreground mb-2">{alert?.title}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{alert?.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Resource:</span>
                <span className="ml-2 text-foreground font-medium">{alert?.resource}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Impact:</span>
                <span className="ml-2 text-error font-medium">{alert?.estimatedImpact}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Threshold:</span>
                <span className="ml-2 text-foreground">{alert?.threshold}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Current:</span>
                <span className="ml-2 text-warning font-medium">{alert?.current}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center space-x-2">
                {alert?.affectedServices?.slice(0, 2)?.map((service, index) => (
                  <span key={index} className="px-2 py-1 bg-muted text-xs rounded">
                    {service}
                  </span>
                ))}
                {alert?.affectedServices?.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{alert?.affectedServices?.length - 2} more
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="MessageSquare">
                  Comment
                </Button>
                <Button variant="ghost" size="sm" iconName="ExternalLink">
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveAlertsList;