import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DevOpsTab = ({ application }) => {
  // Mock DevOps tools and configurations
  const cicdPipelines = [
    {
      name: 'Main Pipeline',
      status: 'Success',
      lastRun: '2025-01-09T08:30:00Z',
      duration: '4m 32s',
      branch: 'main',
      commit: 'a1b2c3d'
    },
    {
      name: 'Feature Branch Pipeline',
      status: 'Running',
      lastRun: '2025-01-09T10:15:00Z',
      duration: '2m 15s',
      branch: 'feature/user-dashboard',
      commit: 'e4f5g6h'
    }
  ];

  const deploymentTools = [
    {
      name: 'Jenkins',
      type: 'CI/CD',
      status: 'Active',
      version: '2.401.3',
      url: 'https://jenkins.company.com'
    },
    {
      name: 'Docker',
      type: 'Containerization',
      status: 'Active',
      version: '24.0.7',
      url: null
    },
    {
      name: 'Kubernetes',
      type: 'Orchestration',
      status: 'Active',
      version: '1.28.4',
      url: 'https://k8s.company.com'
    },
    {
      name: 'Terraform',
      type: 'Infrastructure as Code',
      status: 'Active',
      version: '1.6.6',
      url: null
    }
  ];

  const automationConfigs = [
    {
      name: 'Automated Testing',
      description: 'Unit, integration, and e2e tests',
      status: 'Enabled',
      frequency: 'On every commit'
    },
    {
      name: 'Security Scanning',
      description: 'SAST, DAST, and dependency scanning',
      status: 'Enabled',
      frequency: 'Daily'
    },
    {
      name: 'Performance Monitoring',
      description: 'Application and infrastructure monitoring',
      status: 'Enabled',
      frequency: 'Real-time'
    },
    {
      name: 'Automated Deployment',
      description: 'Auto-deploy to staging environment',
      status: 'Enabled',
      frequency: 'On successful build'
    }
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Success': 'bg-green-100 text-green-800 border-green-200',
      'Running': 'bg-blue-100 text-blue-800 border-blue-200',
      'Failed': 'bg-red-100 text-red-800 border-red-200',
      'Active': 'bg-green-100 text-green-800 border-green-200',
      'Enabled': 'bg-green-100 text-green-800 border-green-200'
    };
    
    return statusStyles?.[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* CI/CD Pipelines */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">CI/CD Pipelines</h3>
            <p className="text-sm text-muted-foreground">Continuous integration and deployment pipelines</p>
          </div>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Add Pipeline
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {cicdPipelines?.map((pipeline, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-foreground">{pipeline?.name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(pipeline?.status)}`}>
                  {pipeline?.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Branch:</span>
                  <span className="text-foreground font-mono">{pipeline?.branch}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last Run:</span>
                  <span className="text-foreground">{formatDate(pipeline?.lastRun)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="text-foreground">{pipeline?.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Commit:</span>
                  <span className="text-foreground font-mono">{pipeline?.commit}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-border">
                <Button variant="ghost" size="sm" iconName="Play">
                  Run
                </Button>
                <Button variant="ghost" size="sm" iconName="Eye">
                  Logs
                </Button>
                <Button variant="ghost" size="sm" iconName="Settings">
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment Tools */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Deployment Tools</h3>
            <p className="text-sm text-muted-foreground">Tools and services used for application deployment</p>
          </div>
          <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
            Manage Tools
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {deploymentTools?.map((tool, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Tool" size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{tool?.name}</h4>
                    <p className="text-xs text-muted-foreground">{tool?.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(tool?.status)}`}>
                  {tool?.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Version:</span>
                  <span className="text-foreground font-mono">{tool?.version}</span>
                </div>
                {tool?.url && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">URL:</span>
                    <a 
                      href={tool?.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center space-x-1"
                    >
                      <span>Access</span>
                      <Icon name="ExternalLink" size={12} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Configurations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Automation Configurations</h3>
            <p className="text-sm text-muted-foreground">Automated processes and configurations</p>
          </div>
          <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
            Configure
          </Button>
        </div>
        
        <div className="space-y-3">
          {automationConfigs?.map((config, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{config?.name}</h4>
                    <p className="text-xs text-muted-foreground">{config?.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(config?.status)}`}>
                      {config?.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{config?.frequency}</p>
                  </div>
                  <Button variant="ghost" size="sm" iconName="Settings" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent DevOps Activity</h3>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="space-y-3">
            {[
              { action: 'Pipeline executed successfully', time: '2 minutes ago', user: 'System' },
              { action: 'Security scan completed', time: '1 hour ago', user: 'Automated' },
              { action: 'Deployment to staging', time: '3 hours ago', user: 'John Smith' },
              { action: 'Docker image updated', time: '5 hours ago', user: 'CI/CD Pipeline' }
            ]?.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 py-2">
                <Icon name="Activity" size={16} className="text-muted-foreground" />
                <div className="flex-1">
                  <span className="text-sm text-foreground">{activity?.action}</span>
                  <span className="text-xs text-muted-foreground ml-2">by {activity?.user}</span>
                </div>
                <span className="text-xs text-muted-foreground">{activity?.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevOpsTab;