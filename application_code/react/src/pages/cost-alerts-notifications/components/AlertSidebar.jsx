import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AlertSidebar = () => {
  const [filters, setFilters] = useState({
    severity: {
      critical: true,
      high: true,
      medium: false,
      low: false
    },
    status: {
      active: true,
      investigating: true,
      acknowledged: false,
      resolved: false
    },
    alertTypes: {
      budget: true,
      anomaly: true,
      utilization: false,
      forecast: false,
      compliance: false
    },
    resources: {
      aws: true,
      azure: true,
      gcp: false,
      kubernetes: true,
      saas: false
    }
  });

  const [quickActions] = useState([
    {
      id: 1,
      title: "Bulk Acknowledge",
      description: "Acknowledge all selected alerts",
      icon: "CheckCircle",
      action: "acknowledge"
    },
    {
      id: 2,
      title: "Export Report",
      description: "Download alert summary report",
      icon: "Download",
      action: "export"
    },
    {
      id: 3,
      title: "Create Template",
      description: "Save current filters as template",
      icon: "Save",
      action: "template"
    }
  ]);

  const [alertTemplates] = useState([
    {
      id: 1,
      name: "Critical Budget Alerts",
      description: "High-priority budget threshold alerts",
      count: 5
    },
    {
      id: 2,
      name: "Cost Anomaly Detection",
      description: "Unusual spending pattern alerts",
      count: 12
    },
    {
      id: 3,
      name: "Resource Optimization",
      description: "Underutilized resource alerts",
      count: 8
    },
    {
      id: 4,
      name: "SaaS Management",
      description: "Software license and usage alerts",
      count: 3
    }
  ]);

  const handleFilterChange = (category, key, checked) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [key]: checked
      }
    }));
  };

  const handleQuickAction = (action) => {
    console.log(`Executing quick action: ${action}`);
    // Quick action logic here
  };

  const handleTemplateSelect = (template) => {
    console.log(`Applying template: ${template?.name}`);
    // Template application logic here
  };

  const clearAllFilters = () => {
    setFilters({
      severity: { critical: false, high: false, medium: false, low: false },
      status: { active: false, investigating: false, acknowledged: false, resolved: false },
      alertTypes: { budget: false, anomaly: false, utilization: false, forecast: false, compliance: false },
      resources: { aws: false, azure: false, gcp: false, kubernetes: false, saas: false }
    });
  };

  return (
    <div className="w-80 bg-card border border-border rounded-lg h-fit">
      {/* Filter Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Filters & Actions</h3>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-6">
        {/* Severity Filters */}
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="AlertTriangle" size={16} className="mr-2" />
            Severity Level
          </h4>
          <div className="space-y-2">
            {Object.entries(filters?.severity)?.map(([key, checked]) => (
              <Checkbox
                key={key}
                label={key?.charAt(0)?.toUpperCase() + key?.slice(1)}
                checked={checked}
                onChange={(e) => handleFilterChange('severity', key, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Status Filters */}
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="Activity" size={16} className="mr-2" />
            Alert Status
          </h4>
          <div className="space-y-2">
            {Object.entries(filters?.status)?.map(([key, checked]) => (
              <Checkbox
                key={key}
                label={key?.charAt(0)?.toUpperCase() + key?.slice(1)}
                checked={checked}
                onChange={(e) => handleFilterChange('status', key, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Alert Type Filters */}
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="Tag" size={16} className="mr-2" />
            Alert Types
          </h4>
          <div className="space-y-2">
            {Object.entries(filters?.alertTypes)?.map(([key, checked]) => (
              <Checkbox
                key={key}
                label={key?.charAt(0)?.toUpperCase() + key?.slice(1)}
                checked={checked}
                onChange={(e) => handleFilterChange('alertTypes', key, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Resource Filters */}
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="Server" size={16} className="mr-2" />
            Resources
          </h4>
          <div className="space-y-2">
            {Object.entries(filters?.resources)?.map(([key, checked]) => (
              <Checkbox
                key={key}
                label={key?.toUpperCase()}
                checked={checked}
                onChange={(e) => handleFilterChange('resources', key, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-border pt-6">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="Zap" size={16} className="mr-2" />
            Quick Actions
          </h4>
          <div className="space-y-2">
            {quickActions?.map((action) => (
              <button
                key={action?.id}
                onClick={() => handleQuickAction(action?.action)}
                className="w-full p-3 text-left border border-border rounded-lg hover:bg-muted/50 transition-colors duration-150"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={action?.icon} size={16} className="text-primary" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{action?.title}</div>
                    <div className="text-xs text-muted-foreground">{action?.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Alert Templates */}
        <div className="border-t border-border pt-6">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="FileText" size={16} className="mr-2" />
            Alert Templates
          </h4>
          <div className="space-y-2">
            {alertTemplates?.map((template) => (
              <button
                key={template?.id}
                onClick={() => handleTemplateSelect(template)}
                className="w-full p-3 text-left border border-border rounded-lg hover:bg-muted/50 transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-foreground">{template?.name}</div>
                    <div className="text-xs text-muted-foreground">{template?.description}</div>
                  </div>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {template?.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="border-t border-border pt-6">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="Settings" size={16} className="mr-2" />
            Preferences
          </h4>
          <div className="space-y-2">
            <Checkbox label="Real-time notifications" checked onChange={() => {}} />
            <Checkbox label="Email digest (daily)" onChange={() => {}} />
            <Checkbox label="Mobile push notifications" checked onChange={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSidebar;