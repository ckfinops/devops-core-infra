import React from 'react';
import Icon from '../../../components/AppIcon';

const SubscriptionAnalytics = ({ selectedSubscription }) => {
  // Mock analytics data
  const analyticsData = {
    usagePatterns: [
      { period: 'This Month', activeUsers: 142, totalLicenses: 150, utilizationRate: 95 },
      { period: 'Last Month', activeUsers: 138, totalLicenses: 150, utilizationRate: 92 },
      { period: '3 Months Ago', activeUsers: 134, totalLicenses: 150, utilizationRate: 89 },
    ],
    adoptionRates: {
      newUsers: 8,
      returningUsers: 134,
      churnedUsers: 4
    },
    costTrends: [
      { month: 'Jan', cost: 10500 },
      { month: 'Feb', cost: 10800 },
      { month: 'Mar', cost: 11250 },
      { month: 'Apr', cost: 11250 },
      { month: 'May', cost: 11400 },
    ]
  };

  if (!selectedSubscription) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 h-96 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto">
            <Icon name="BarChart3" size={32} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Subscription Analytics</h3>
            <p className="text-xs text-muted-foreground">
              Select a subscription from the table to view detailed analytics
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selected Subscription Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Package" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{selectedSubscription?.applicationName}</h3>
            <p className="text-sm text-muted-foreground">{selectedSubscription?.vendor}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground">Monthly Cost</div>
            <div className="text-lg font-semibold text-foreground">
              ${selectedSubscription?.totalCost?.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Utilization</div>
            <div className="text-lg font-semibold text-foreground">
              {selectedSubscription?.utilizationRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Usage Patterns */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Activity" size={16} className="mr-2" />
          Usage Patterns
        </h4>
        
        <div className="space-y-3">
          {analyticsData?.usagePatterns?.map((pattern, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <div className="text-sm font-medium text-foreground">{pattern?.period}</div>
                <div className="text-xs text-muted-foreground">
                  {pattern?.activeUsers}/{pattern?.totalLicenses} active users
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{pattern?.utilizationRate}%</div>
                <div className="w-16 h-2 bg-muted rounded-full">
                  <div 
                    className="h-2 bg-primary rounded-full" 
                    style={{ width: `${pattern?.utilizationRate}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Adoption */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Users" size={16} className="mr-2" />
          User Adoption (This Month)
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-foreground">New Users</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {analyticsData?.adoptionRates?.newUsers}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-foreground">Returning Users</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {analyticsData?.adoptionRates?.returningUsers}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-sm text-foreground">Churned Users</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {analyticsData?.adoptionRates?.churnedUsers}
            </span>
          </div>
        </div>
      </div>

      {/* Cost Trends */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
          <Icon name="TrendingUp" size={16} className="mr-2" />
          Cost Trends
        </h4>
        
        <div className="space-y-2">
          {analyticsData?.costTrends?.map((trend, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <span className="text-xs text-muted-foreground">{trend?.month}</span>
              <span className="text-sm font-medium text-foreground">
                ${trend?.cost?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Trend</span>
            <div className="flex items-center space-x-1">
              <Icon name="TrendingUp" size={14} className="text-error" />
              <span className="text-sm font-medium text-error">+8.3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAnalytics;