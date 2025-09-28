import React from 'react';
import { Palette, Monitor, Bell, Mail, MessageSquare, Webhook } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PlatformCustomizationStep = ({ data, updateData }) => {
  const updateBranding = (field, value) => {
    updateData('customization', {
      branding: {
        ...data?.customization?.branding,
        [field]: value
      }
    });
  };

  const updateDashboard = (field, value) => {
    updateData('customization', {
      dashboard: {
        ...data?.customization?.dashboard,
        [field]: value
      }
    });
  };

  const updateNotifications = (field, value) => {
    updateData('customization', {
      notifications: {
        ...data?.customization?.notifications,
        [field]: value
      }
    });
  };

  const colorPresets = [
    { name: 'Blue', primary: '#3B82F6', secondary: '#10B981' },
    { name: 'Purple', primary: '#8B5CF6', secondary: '#F59E0B' },
    { name: 'Green', primary: '#10B981', secondary: '#3B82F6' },
    { name: 'Orange', primary: '#F97316', secondary: '#6366F1' },
    { name: 'Red', primary: '#EF4444', secondary: '#10B981' }
  ];

  const dashboardWidgets = [
    { id: 'cost-overview', name: 'Cost Overview', description: 'High-level cost metrics and trends' },
    { id: 'budget-status', name: 'Budget Status', description: 'Budget utilization and alerts' },
    { id: 'top-services', name: 'Top Services', description: 'Highest spending cloud services' },
    { id: 'recommendations', name: 'Recommendations', description: 'Cost optimization suggestions' },
    { id: 'forecasting', name: 'Cost Forecasting', description: 'Predicted spending trends' },
    { id: 'anomalies', name: 'Cost Anomalies', description: 'Unusual spending patterns' }
  ];

  const toggleWidget = (widgetId) => {
    const currentWidgets = data?.customization?.dashboard?.widgets || [];
    const updatedWidgets = currentWidgets?.includes(widgetId)
      ? currentWidgets?.filter(id => id !== widgetId)
      : [...currentWidgets, widgetId];
    
    updateDashboard('widgets', updatedWidgets);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          Platform Customization
        </h3>
        <p className="text-gray-600 mb-6">
          Customize the platform appearance, dashboard layout, and notification preferences for your organization.
        </p>
      </div>
      {/* White-Label Branding */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Palette className="h-4 w-4 mr-2" />
          White-Label Branding
        </h4>
        
        <div className="space-y-6">
          {/* Company Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Logo
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                {data?.customization?.branding?.companyLogo ? (
                  <img
                    src={data?.customization?.branding?.companyLogo}
                    alt="Company Logo"
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">Logo</span>
                )}
              </div>
              <div>
                <Button variant="outline" size="sm">Upload Logo</Button>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 200x200px, PNG or SVG
                </p>
              </div>
            </div>
          </div>

          {/* Color Scheme */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data?.customization?.branding?.primaryColor}
                  onChange={(e) => updateBranding('primaryColor', e?.target?.value)}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <Input
                  value={data?.customization?.branding?.primaryColor}
                  onChange={(e) => updateBranding('primaryColor', e?.target?.value)}
                  className="flex-1"
                  placeholder="#3B82F6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data?.customization?.branding?.secondaryColor}
                  onChange={(e) => updateBranding('secondaryColor', e?.target?.value)}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <Input
                  value={data?.customization?.branding?.secondaryColor}
                  onChange={(e) => updateBranding('secondaryColor', e?.target?.value)}
                  className="flex-1"
                  placeholder="#10B981"
                />
              </div>
            </div>
          </div>

          {/* Color Presets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Presets
            </label>
            <div className="flex gap-2">
              {colorPresets?.map((preset) => (
                <button
                  key={preset?.name}
                  onClick={() => {
                    updateBranding('primaryColor', preset?.primary);
                    updateBranding('secondaryColor', preset?.secondary);
                  }}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  title={preset?.name}
                >
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset?.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset?.secondary }}
                    />
                  </div>
                  <span className="text-xs">{preset?.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard Preferences */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Monitor className="h-4 w-4 mr-2" />
          Dashboard Preferences
        </h4>

        <div className="space-y-6">
          {/* Default View */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Dashboard View
            </label>
            <select
              value={data?.customization?.dashboard?.defaultView}
              onChange={(e) => updateDashboard('defaultView', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="overview">Cost Overview</option>
              <option value="analytics">Cost Analytics</option>
              <option value="budgets">Budget Planning</option>
              <option value="recommendations">Recommendations</option>
            </select>
          </div>

          {/* Dashboard Widgets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dashboard Widgets
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Select which widgets to display on the main dashboard
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dashboardWidgets?.map((widget) => (
                <label key={widget?.id} className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <Checkbox
                    checked={data?.customization?.dashboard?.widgets?.includes(widget?.id) || false}
                    onChange={() => toggleWidget(widget?.id)}
                    className="mt-0.5"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">{widget?.name}</div>
                    <div className="text-sm text-gray-600">{widget?.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Notification Channels */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Notification Channels
        </h4>
        
        <div className="space-y-4">
          {/* Email Notifications */}
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <Checkbox
              checked={data?.customization?.notifications?.email}
              onChange={(checked) => updateNotifications('email', checked)}
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <span className="font-medium text-gray-900">Email Notifications</span>
              </div>
              <div className="text-sm text-gray-600">
                Receive cost alerts, reports, and recommendations via email
              </div>
            </div>
          </label>

          {/* Slack Integration */}
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <Checkbox
              checked={data?.customization?.notifications?.slack}
              onChange={(checked) => updateNotifications('slack', checked)}
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 text-gray-400 mr-2" />
                <span className="font-medium text-gray-900">Slack Integration</span>
              </div>
              <div className="text-sm text-gray-600">
                Send notifications to designated Slack channels
              </div>
            </div>
          </label>

          {/* Webhook Notifications */}
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <Checkbox
              checked={data?.customization?.notifications?.webhooks}
              onChange={(checked) => updateNotifications('webhooks', checked)}
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <Webhook className="h-4 w-4 text-gray-400 mr-2" />
                <span className="font-medium text-gray-900">Webhook Integration</span>
              </div>
              <div className="text-sm text-gray-600">
                Send structured notifications to external systems
              </div>
            </div>
          </label>
        </div>

        {/* Notification Settings */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h5 className="font-medium text-gray-900 mb-3">Notification Preferences</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Threshold
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                <option value="immediate">Immediate</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Summary</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Frequency
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Preview Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Customization Preview</h4>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded mr-3"
                style={{ backgroundColor: data?.customization?.branding?.primaryColor }}
              />
              <h5 className="font-medium text-gray-900">FinOps Dashboard</h5>
            </div>
            <div
              className="px-3 py-1 rounded text-white text-sm"
              style={{ backgroundColor: data?.customization?.branding?.secondaryColor }}
            >
              Sample Badge
            </div>
          </div>
          <div className="text-sm text-gray-600">
            This is how your customized platform will look to users.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformCustomizationStep;