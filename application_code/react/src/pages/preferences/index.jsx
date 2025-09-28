import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { Checkbox } from '../../components/ui/Checkbox';

const Preferences = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'english',
    currency: 'usd',
    dateFormat: 'mm-dd-yyyy',
    timeFormat: '12hour',
    notifications: {
      email: true,
      push: true,
      sms: false,
      budgetAlerts: true,
      costAnomalies: true,
      weeklyReports: false
    },
    dashboard: {
      defaultView: 'overview',
      autoRefresh: true,
      refreshInterval: '5min',
      compactMode: false
    }
  });

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handlePreferenceChange = (section, field, value) => {
    setPreferences(prev => ({
      ...prev,
      [section]: typeof prev?.[section] === 'object' 
        ? { ...prev?.[section], [field]: value }
        : value
    }));
  };

  const handleSavePreferences = () => {
    // Save preferences logic here
    console.log('Preferences saved:', preferences);
  };

  const themeOptions = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'auto', label: 'Auto (System)' }
  ];

  const currencyOptions = [
    { value: 'usd', label: 'USD ($)' },
    { value: 'eur', label: 'EUR (€)' },
    { value: 'gbp', label: 'GBP (£)' },
    { value: 'jpy', label: 'JPY (¥)' }
  ];

  const refreshOptions = [
    { value: '1min', label: '1 minute' },
    { value: '5min', label: '5 minutes' },
    { value: '10min', label: '10 minutes' },
    { value: '30min', label: '30 minutes' }
  ];

  return (
    <>
      <Helmet>
        <title>Preferences - FinOps Dashboard</title>
        <meta name="description" content="Customize your dashboard preferences and settings" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleToggleSidebar} />
        
        <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-14 xl:ml-16' : 'ml-52 xl:ml-60'}`}>
          <div className="p-4 xl:p-8 max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 xl:mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl xl:text-3xl font-bold text-foreground">Preferences</h1>
                  <p className="text-muted-foreground mt-1 xl:mt-2">
                    Customize your dashboard experience and notification settings
                  </p>
                </div>
                
                <Button variant="default" size="sm" onClick={handleSavePreferences}>
                  <Icon name="Save" size={16} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="space-y-6 xl:space-y-8">
              {/* Appearance Settings */}
              <div className="bg-card border border-border rounded-lg p-4 xl:p-6">
                <h3 className="text-lg xl:text-xl font-semibold text-card-foreground mb-4 xl:mb-6 flex items-center">
                  <Icon name="Palette" size={20} className="mr-3" />
                  Appearance
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Theme
                    </label>
                    <Select
                      value={preferences?.theme}
                      onChange={(value) => handlePreferenceChange('theme', null, value)}
                      options={themeOptions}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Currency
                    </label>
                    <Select
                      value={preferences?.currency}
                      onChange={(value) => handlePreferenceChange('currency', null, value)}
                      options={currencyOptions}
                    />
                  </div>
                </div>
              </div>

              {/* Dashboard Settings */}
              <div className="bg-card border border-border rounded-lg p-4 xl:p-6">
                <h3 className="text-lg xl:text-xl font-semibold text-card-foreground mb-4 xl:mb-6 flex items-center">
                  <Icon name="LayoutDashboard" size={20} className="mr-3" />
                  Dashboard Settings
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Default View
                    </label>
                    <Select
                      value={preferences?.dashboard?.defaultView}
                      onChange={(value) => handlePreferenceChange('dashboard', 'defaultView', value)}
                      options={[
                        { value: 'overview', label: 'Overview' },
                        { value: 'cost-analysis', label: 'Cost Analysis' },
                        { value: 'optimization', label: 'Optimization' }
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Auto Refresh Interval
                    </label>
                    <Select
                      value={preferences?.dashboard?.refreshInterval}
                      onChange={(value) => handlePreferenceChange('dashboard', 'refreshInterval', value)}
                      options={refreshOptions}
                    />
                  </div>
                </div>

                <div className="mt-4 xl:mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-card-foreground">Auto Refresh</label>
                      <p className="text-xs text-muted-foreground">Automatically refresh dashboard data</p>
                    </div>
                    <Checkbox
                      checked={preferences?.dashboard?.autoRefresh}
                      onChange={(checked) => handlePreferenceChange('dashboard', 'autoRefresh', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-card-foreground">Compact Mode</label>
                      <p className="text-xs text-muted-foreground">Reduce spacing and optimize for smaller screens</p>
                    </div>
                    <Checkbox
                      checked={preferences?.dashboard?.compactMode}
                      onChange={(checked) => handlePreferenceChange('dashboard', 'compactMode', checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-card border border-border rounded-lg p-4 xl:p-6">
                <h3 className="text-lg xl:text-xl font-semibold text-card-foreground mb-4 xl:mb-6 flex items-center">
                  <Icon name="Bell" size={20} className="mr-3" />
                  Notifications
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <label className="text-sm font-medium text-card-foreground">Email</label>
                        <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Checkbox
                        checked={preferences?.notifications?.email}
                        onChange={(checked) => handlePreferenceChange('notifications', 'email', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <label className="text-sm font-medium text-card-foreground">Push</label>
                        <p className="text-xs text-muted-foreground">Browser push notifications</p>
                      </div>
                      <Checkbox
                        checked={preferences?.notifications?.push}
                        onChange={(checked) => handlePreferenceChange('notifications', 'push', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <label className="text-sm font-medium text-card-foreground">SMS</label>
                        <p className="text-xs text-muted-foreground">Text message alerts</p>
                      </div>
                      <Checkbox
                        checked={preferences?.notifications?.sms}
                        onChange={(checked) => handlePreferenceChange('notifications', 'sms', checked)}
                      />
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 space-y-3">
                    <h4 className="text-sm font-semibold text-card-foreground">Alert Types</h4>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-card-foreground">Budget Alerts</label>
                        <p className="text-xs text-muted-foreground">When spending exceeds thresholds</p>
                      </div>
                      <Checkbox
                        checked={preferences?.notifications?.budgetAlerts}
                        onChange={(checked) => handlePreferenceChange('notifications', 'budgetAlerts', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-card-foreground">Cost Anomalies</label>
                        <p className="text-xs text-muted-foreground">Unusual spending patterns detected</p>
                      </div>
                      <Checkbox
                        checked={preferences?.notifications?.costAnomalies}
                        onChange={(checked) => handlePreferenceChange('notifications', 'costAnomalies', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-card-foreground">Weekly Reports</label>
                        <p className="text-xs text-muted-foreground">Summary of weekly spending</p>
                      </div>
                      <Checkbox
                        checked={preferences?.notifications?.weeklyReports}
                        onChange={(checked) => handlePreferenceChange('notifications', 'weeklyReports', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Preferences;