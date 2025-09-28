import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetAlerts = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedAlerts, setSelectedAlerts] = useState([]);

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'AWS Infrastructure Budget Alert',
      message: 'Current spend has reached 85% of allocated budget for Q4 2024',
      category: 'Infrastructure',
      department: 'Engineering',
      currentSpend: 425000,
      budgetLimit: 500000,
      threshold: 85,
      timeRemaining: '23 days',
      status: 'active',
      createdAt: '2024-08-20T10:30:00Z',
      actions: ['Increase Budget', 'Optimize Resources', 'Review Spend']
    },
    {
      id: 2,
      type: 'error',
      title: 'SaaS Subscription Overspend',
      message: 'GitHub Enterprise costs exceeded monthly budget by $2,400',
      category: 'SaaS',
      department: 'Engineering',
      currentSpend: 12400,
      budgetLimit: 10000,
      threshold: 100,
      timeRemaining: 'Overdue',
      status: 'critical',
      createdAt: '2024-08-19T14:15:00Z',
      actions: ['Review Licenses', 'Downgrade Plan', 'Request Budget Increase']
    },
    {
      id: 3,
      type: 'info',
      title: 'Budget Variance Notification',
      message: 'Marketing department is 15% under budget - consider reallocating funds',
      category: 'Marketing',
      department: 'Marketing',
      currentSpend: 212500,
      budgetLimit: 250000,
      threshold: 85,
      timeRemaining: '45 days',
      status: 'info',
      createdAt: '2024-08-18T09:45:00Z',
      actions: ['Reallocate Budget', 'Increase Spend', 'Keep Current']
    },
    {
      id: 4,
      type: 'success',
      title: 'Cost Optimization Success',
      message: 'Azure rightsizing recommendations saved $8,500 this month',
      category: 'Infrastructure',
      department: 'Engineering',
      currentSpend: 0,
      budgetLimit: 0,
      threshold: 0,
      timeRemaining: 'Completed',
      status: 'resolved',
      createdAt: '2024-08-17T16:20:00Z',
      actions: ['View Details', 'Apply Similar Optimizations']
    }
  ];

  const alertRules = [
    {
      id: 1,
      name: 'Infrastructure Budget Threshold',
      description: 'Alert when infrastructure spend exceeds 80% of budget',
      threshold: 80,
      frequency: 'Daily',
      recipients: ['engineering@company.com', 'finops@company.com'],
      enabled: true,
      categories: ['AWS', 'Azure', 'GCP']
    },
    {
      id: 2,
      name: 'SaaS Overspend Alert',
      description: 'Immediate alert when any SaaS subscription exceeds budget',
      threshold: 100,
      frequency: 'Immediate',
      recipients: ['procurement@company.com', 'finops@company.com'],
      enabled: true,
      categories: ['SaaS', 'Tools']
    },
    {
      id: 3,
      name: 'Department Variance Alert',
      description: 'Weekly alert for departments with >20% budget variance',
      threshold: 20,
      frequency: 'Weekly',
      recipients: ['cfo@company.com', 'department-heads@company.com'],
      enabled: false,
      categories: ['All Departments']
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      case 'success': return 'CheckCircle';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return 'text-error bg-error/10 border-error/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      case 'success': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'critical': return 'bg-error text-error-foreground';
      case 'active': return 'bg-warning text-warning-foreground';
      case 'info': return 'bg-primary text-primary-foreground';
      case 'resolved': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSelectAlert = (alertId) => {
    setSelectedAlerts(prev => 
      prev?.includes(alertId) 
        ? prev?.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on alerts:`, selectedAlerts);
    setSelectedAlerts([]);
  };

  const filteredAlerts = alerts?.filter(alert => {
    switch (activeTab) {
      case 'active': return ['active', 'critical']?.includes(alert?.status);
      case 'resolved': return alert?.status === 'resolved';
      case 'all': return true;
      default: return true;
    }
  });

  return (
    <div className="space-y-6">
      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertCircle" size={20} className="text-error" />
            </div>
            <div>
              <div className="text-2xl font-bold text-card-foreground">2</div>
              <div className="text-sm text-muted-foreground">Critical Alerts</div>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold text-card-foreground">3</div>
              <div className="text-sm text-muted-foreground">Active Warnings</div>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-card-foreground">12</div>
              <div className="text-sm text-muted-foreground">Resolved Today</div>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingDown" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-card-foreground">$45K</div>
              <div className="text-sm text-muted-foreground">Potential Savings</div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Alert Management */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">Budget Alerts</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Automated monitoring and notification management
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" iconName="Settings">
                Alert Rules
              </Button>
              <Button variant="default" size="sm" iconName="Plus">
                New Alert
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-1 mt-6">
            {[
              { id: 'active', label: 'Active', count: 5 },
              { id: 'resolved', label: 'Resolved', count: 12 },
              { id: 'all', label: 'All', count: 17 }
            ]?.map((tab) => (
              <Button
                key={tab?.id}
                variant={activeTab === tab?.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab?.id)}
                className="relative"
              >
                {tab?.label}
                <span className="ml-2 px-2 py-0.5 text-xs bg-muted rounded-full">
                  {tab?.count}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedAlerts?.length > 0 && (
          <div className="p-4 bg-muted/30 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-card-foreground">
                {selectedAlerts?.length} alert{selectedAlerts?.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('acknowledge')}>
                  Acknowledge
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('resolve')}>
                  Resolve
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('snooze')}>
                  Snooze
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Alert List */}
        <div className="divide-y divide-border">
          {filteredAlerts?.map((alert) => (
            <div key={alert?.id} className="p-6 hover:bg-muted/20 transition-colors duration-150">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedAlerts?.includes(alert?.id)}
                  onChange={() => handleSelectAlert(alert?.id)}
                  className="mt-1"
                />
                
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getAlertColor(alert?.type)}`}>
                  <Icon name={getAlertIcon(alert?.type)} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-card-foreground">{alert?.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(alert?.status)}`}>
                      {alert?.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {alert?.department} • {alert?.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{alert?.message}</p>
                  
                  {alert?.currentSpend > 0 && (
                    <div className="flex items-center space-x-6 mb-3">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Current: </span>
                        <span className="font-medium text-card-foreground">
                          {formatCurrency(alert?.currentSpend)}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Budget: </span>
                        <span className="font-medium text-card-foreground">
                          {formatCurrency(alert?.budgetLimit)}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Time Remaining: </span>
                        <span className="font-medium text-card-foreground">
                          {alert?.timeRemaining}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {alert?.actions?.slice(0, 2)?.map((action, index) => (
                        <Button key={index} variant="outline" size="sm">
                          {action}
                        </Button>
                      ))}
                      {alert?.actions?.length > 2 && (
                        <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                          More
                        </Button>
                      )}
                    </div>
                    
                    <span className="text-xs text-muted-foreground">
                      {formatDate(alert?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetAlerts;