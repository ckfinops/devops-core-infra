import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetailsTab = ({ application }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-lg p-6 h-fit">
          <h3 className="text-lg font-semibold text-foreground mb-6">Basic Information</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground block">Application Name</label>
                <p className="text-foreground">{application?.name}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground block">Version</label>
                <p className="text-foreground">{application?.version}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground block">Description</label>
              <p className="text-foreground">{application?.description}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground block">Application Type</label>
                <p className="text-foreground">{application?.appType}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground block">Hosting Environment</label>
                <p className="text-foreground">{application?.hostingEnv}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground block">Last Updated</label>
              <p className="text-foreground">{formatDate(application?.lastUpdated)}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 h-fit">
          <h3 className="text-lg font-semibold text-foreground mb-6">Ownership Information</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground block">Tech Stack Owner</label>
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <p className="text-foreground">{application?.techStackOwner}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground block">IT Owner</label>
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <p className="text-foreground">{application?.itOwner}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground block">Functional Owner</label>
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <p className="text-foreground">{application?.functionalOwner}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Technical Specifications</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-sm font-medium text-muted-foreground block">Technology Stack</label>
            <div className="flex flex-wrap gap-2">
              {application?.techStack?.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-sm font-medium text-muted-foreground block">Deployment Environments</label>
            <div className="space-y-3">
              {application?.deploymentEnvironments?.map((env, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Server" size={16} className="text-muted-foreground" />
                  <span className="text-foreground">{env}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Business Context */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Business Context</h3>
        <div className="bg-muted/30 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground block">Business Criticality</label>
              <p className="text-foreground font-medium">{application?.criticality}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground block">User Base</label>
              <p className="text-foreground">~15,000 active users</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground block">SLA Target</label>
              <p className="text-foreground">99.9% uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border">
        <Button variant="primary" iconName="Edit" iconPosition="left">
          Edit Details
        </Button>
        <Button variant="outline" iconName="Download" iconPosition="left">
          Export Information
        </Button>
        <Button variant="ghost" iconName="History" iconPosition="left">
          View History
        </Button>
      </div>
    </div>
  );
};

export default DetailsTab;