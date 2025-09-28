import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationSidebar = ({ application, isVisible = false, onToggle }) => {
  const [isQuickInfoExpanded, setIsQuickInfoExpanded] = useState(false);
  
  if (!application) return null;

  const recentChanges = [
    {
      type: 'Version Update',
      description: 'Updated to v2.1.4',
      timestamp: '2 hours ago',
      user: 'John Smith'
    },
    {
      type: 'Configuration',
      description: 'Updated API endpoints',
      timestamp: '1 day ago',
      user: 'Sarah Johnson'
    },
    {
      type: 'Security',
      description: 'SSL certificate renewed',
      timestamp: '3 days ago',
      user: 'System'
    }
  ];

  const relatedApplications = [
    {
      name: 'User Management Service',
      relationship: 'Dependency',
      status: 'Active'
    },
    {
      name: 'Analytics Dashboard',
      relationship: 'Integration',
      status: 'Active'
    },
    {
      name: 'Mobile App Backend',
      relationship: 'Shared Database',
      status: 'Active'
    }
  ];

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
    <>
      {/* Overlay for mobile */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-card border-l border-border overflow-y-auto z-30 transform transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Application Details</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onToggle}
            iconName="X"
            className="h-8 w-8 p-0"
            aria-label="Close sidebar"
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Info */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer hover:bg-muted/30 p-2 -m-2 rounded"
              onClick={() => setIsQuickInfoExpanded(!isQuickInfoExpanded)}
            >
              <h3 className="text-sm font-semibold text-foreground">Quick Information</h3>
              <Icon 
                name={isQuickInfoExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-muted-foreground" 
              />
            </div>
            {isQuickInfoExpanded && (
              <div className="space-y-3 text-sm mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span className="text-foreground font-medium">{application?.version}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Environment</span>
                  <span className="text-foreground">{application?.hostingEnv}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="text-foreground">{formatDate(application?.lastUpdated)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Application Timeline */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Recent Changes</h3>
            <div className="space-y-3">
              {recentChanges?.map((change, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium text-foreground">{change?.type}</span>
                      <span className="text-xs text-muted-foreground">{change?.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{change?.description}</p>
                    <p className="text-xs text-muted-foreground">by {change?.user}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3" iconName="History" iconPosition="left">
              View Full History
            </Button>
          </div>

          {/* Related Applications */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Related Applications</h3>
            <div className="space-y-3">
              {relatedApplications?.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/30 rounded">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <Icon name="Package" size={14} className="text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{app?.name}</p>
                      <p className="text-xs text-muted-foreground">{app?.relationship}</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Metrics */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Health Metrics</h3>
            <div className="space-y-3">
              {[
                { metric: 'Uptime', value: '99.9%', status: 'good' },
                { metric: 'Response Time', value: '145ms', status: 'good' },
                { metric: 'Error Rate', value: '0.1%', status: 'good' },
                { metric: 'CPU Usage', value: '45%', status: 'warning' }
              ]?.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      metric?.status === 'good' ? 'bg-green-500' : 
                      metric?.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-xs text-muted-foreground">{metric?.metric}</span>
                  </div>
                  <span className="text-xs font-medium text-foreground">{metric?.value}</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3" iconName="BarChart3" iconPosition="left">
              View Detailed Metrics
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start" iconName="Edit" iconPosition="left">
                Edit Application
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" iconName="Copy" iconPosition="left">
                Clone Application
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" iconName="Download" iconPosition="left">
                Export Data
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" iconName="Archive" iconPosition="left">
                Archive Application
              </Button>
            </div>
          </div>

          {/* Support */}
          <div className="border-t border-border pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="HelpCircle" size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-blue-800 mb-1">Need Help?</p>
                  <p className="text-xs text-blue-700 mb-2">
                    Contact the application owners or check the documentation.
                  </p>
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    Get Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ApplicationSidebar;