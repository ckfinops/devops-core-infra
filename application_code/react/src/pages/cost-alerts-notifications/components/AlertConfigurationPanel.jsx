import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AlertConfigurationPanel = ({ selectedAlert }) => {
  const [activeTab, setActiveTab] = useState('create');
  const [alertForm, setAlertForm] = useState({
    name: '',
    description: '',
    alertType: '',
    threshold: '',
    condition: '',
    resource: '',
    severity: '',
    notifications: {
      email: false,
      slack: false,
      webhook: false
    },
    escalation: {
      enabled: false,
      timeMinutes: 30,
      escalateTo: ''
    }
  });

  const alertTypes = [
    { value: 'budget', label: 'Budget Threshold' },
    { value: 'anomaly', label: 'Cost Anomaly' },
    { value: 'utilization', label: 'Resource Utilization' },
    { value: 'forecast', label: 'Forecast Alert' },
    { value: 'compliance', label: 'Compliance Violation' }
  ];

  const conditions = [
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'percentage_increase', label: 'Percentage Increase' },
    { value: 'percentage_decrease', label: 'Percentage Decrease' },
    { value: 'anomaly_detected', label: 'Anomaly Detected' }
  ];

  const resources = [
    { value: 'aws_ec2', label: 'AWS EC2' },
    { value: 'aws_s3', label: 'AWS S3' },
    { value: 'azure_vm', label: 'Azure Virtual Machines' },
    { value: 'gcp_compute', label: 'GCP Compute Engine' },
    { value: 'kubernetes', label: 'Kubernetes Cluster' },
    { value: 'saas_tools', label: 'SaaS Applications' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const escalationUsers = [
    { value: 'john.doe', label: 'John Doe (FinOps Manager)' },
    { value: 'jane.smith', label: 'Jane Smith (Engineering Lead)' },
    { value: 'mike.wilson', label: 'Mike Wilson (CFO)' },
    { value: 'sarah.johnson', label: 'Sarah Johnson (DevOps Lead)' }
  ];

  const handleInputChange = (field, value) => {
    setAlertForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type, checked) => {
    setAlertForm(prev => ({
      ...prev,
      notifications: {
        ...prev?.notifications,
        [type]: checked
      }
    }));
  };

  const handleEscalationChange = (field, value) => {
    setAlertForm(prev => ({
      ...prev,
      escalation: {
        ...prev?.escalation,
        [field]: value
      }
    }));
  };

  const handleSaveAlert = () => {
    console.log('Saving alert:', alertForm);
    // Alert save logic here
  };

  const tabs = [
    { id: 'create', label: 'Create Alert', icon: 'Plus' },
    { id: 'templates', label: 'Templates', icon: 'FileText' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="border-b border-border">
        <div className="flex items-center space-x-1 p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {activeTab === 'create' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Create New Alert</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Alert Name"
                  type="text"
                  placeholder="Enter alert name"
                  value={alertForm?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  required
                />
                
                <Input
                  label="Description"
                  type="text"
                  placeholder="Describe what this alert monitors"
                  value={alertForm?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Alert Type"
                    options={alertTypes}
                    value={alertForm?.alertType}
                    onChange={(value) => handleInputChange('alertType', value)}
                    placeholder="Select alert type"
                    required
                  />
                  
                  <Select
                    label="Resource"
                    options={resources}
                    value={alertForm?.resource}
                    onChange={(value) => handleInputChange('resource', value)}
                    placeholder="Select resource"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <Select
                    label="Condition"
                    options={conditions}
                    value={alertForm?.condition}
                    onChange={(value) => handleInputChange('condition', value)}
                    placeholder="Select condition"
                    required
                  />
                  
                  <Input
                    label="Threshold Value"
                    type="text"
                    placeholder="e.g., $5000 or 80%"
                    value={alertForm?.threshold}
                    onChange={(e) => handleInputChange('threshold', e?.target?.value)}
                    required
                  />
                  
                  <Select
                    label="Severity"
                    options={severityLevels}
                    value={alertForm?.severity}
                    onChange={(value) => handleInputChange('severity', value)}
                    placeholder="Select severity"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="text-md font-medium text-foreground mb-4">Notification Channels</h4>
              <div className="space-y-3">
                <Checkbox
                  label="Email Notifications"
                  description="Send alerts via email to configured recipients"
                  checked={alertForm?.notifications?.email}
                  onChange={(e) => handleNotificationChange('email', e?.target?.checked)}
                />
                <Checkbox
                  label="Slack Integration"
                  description="Post alerts to designated Slack channels"
                  checked={alertForm?.notifications?.slack}
                  onChange={(e) => handleNotificationChange('slack', e?.target?.checked)}
                />
                <Checkbox
                  label="Webhook Notifications"
                  description="Send HTTP POST requests to external systems"
                  checked={alertForm?.notifications?.webhook}
                  onChange={(e) => handleNotificationChange('webhook', e?.target?.checked)}
                />
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="text-md font-medium text-foreground mb-4">Escalation Rules</h4>
              <div className="space-y-4">
                <Checkbox
                  label="Enable Escalation"
                  description="Automatically escalate unacknowledged alerts"
                  checked={alertForm?.escalation?.enabled}
                  onChange={(e) => handleEscalationChange('enabled', e?.target?.checked)}
                />
                
                {alertForm?.escalation?.enabled && (
                  <div className="grid grid-cols-2 gap-4 ml-6">
                    <Input
                      label="Escalation Time (minutes)"
                      type="number"
                      placeholder="30"
                      value={alertForm?.escalation?.timeMinutes}
                      onChange={(e) => handleEscalationChange('timeMinutes', parseInt(e?.target?.value))}
                    />
                    
                    <Select
                      label="Escalate To"
                      options={escalationUsers}
                      value={alertForm?.escalation?.escalateTo}
                      onChange={(value) => handleEscalationChange('escalateTo', value)}
                      placeholder="Select user"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button variant="outline" iconName="Eye">
                Preview Alert
              </Button>
              <div className="flex items-center space-x-3">
                <Button variant="ghost">
                  Cancel
                </Button>
                <Button variant="default" onClick={handleSaveAlert} iconName="Save">
                  Save Alert
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Alert Templates</h3>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  name: "AWS Budget Threshold",
                  description: "Monitor AWS spending against monthly budgets",
                  category: "Budget Management"
                },
                {
                  name: "Cost Anomaly Detection",
                  description: "Detect unusual spending patterns across all clouds",
                  category: "Anomaly Detection"
                },
                {
                  name: "Resource Utilization",
                  description: "Alert on low resource utilization for cost optimization",
                  category: "Optimization"
                },
                {
                  name: "SaaS License Overage",
                  description: "Monitor SaaS subscription usage and overages",
                  category: "License Management"
                }
              ]?.map((template, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{template?.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{template?.description}</p>
                      <span className="inline-block px-2 py-1 bg-muted text-xs rounded mt-2">
                        {template?.category}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" iconName="Plus">
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Alert Settings</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Default Notification Settings</h4>
                <div className="space-y-2">
                  <Checkbox label="Enable email notifications by default" />
                  <Checkbox label="Enable Slack notifications by default" />
                  <Checkbox label="Auto-acknowledge resolved alerts" />
                </div>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Alert Retention</h4>
                <Select
                  label="Keep alert history for"
                  options={[
                    { value: '30', label: '30 days' },
                    { value: '90', label: '90 days' },
                    { value: '180', label: '6 months' },
                    { value: '365', label: '1 year' }
                  ]}
                  value="90"
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertConfigurationPanel;