import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { AlertTriangle, CheckCircle, Info, X, Bell, Settings } from 'lucide-react';

const TenantAlerts = ({ tenantId }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 'alert-1',
      type: 'warning',
      title: 'High CPU Usage',
      message: 'CB-3 API Gateway is experiencing high CPU usage (91%)',
      timestamp: '2025-01-19T10:45:00Z',
      severity: 'High',
      acknowledged: false
    },
    {
      id: 'alert-2',
      type: 'info',
      title: 'New User Registration',
      message: 'James Osteen has been added to the tenant',
      timestamp: '2025-01-19T09:30:00Z',
      severity: 'Info',
      acknowledged: true
    },
    {
      id: 'alert-3',
      type: 'success',
      title: 'Health Check Passed',
      message: 'All cloud connections are healthy and operational',
      timestamp: '2025-01-19T08:15:00Z',
      severity: 'Low',
      acknowledged: true
    },
    {
      id: 'alert-4',
      type: 'warning',
      title: 'Budget Threshold',
      message: 'Monthly spend has reached 82% of budget limit',
      timestamp: '2025-01-19T07:20:00Z',
      severity: 'Medium',
      acknowledged: false
    }
  ]);

  const [recentActivity] = useState([
    {
      id: 'activity-1',
      user: 'joel.kummari',
      action: 'Logged in',
      timestamp: '2025-01-19T10:30:00Z',
      details: 'Executive dashboard access'
    },
    {
      id: 'activity-2',
      user: 'system',
      action: 'Health Check',
      timestamp: '2025-01-19T10:00:00Z',
      details: 'Automated infrastructure monitoring'
    },
    {
      id: 'activity-3',
      user: 'jessi.kummari',
      action: 'Report Generated',
      timestamp: '2025-01-19T09:45:00Z',
      details: 'Monthly cost optimization report'
    },
    {
      id: 'activity-4',
      user: 'john.david',
      action: 'Application Deployed',
      timestamp: '2025-01-19T09:15:00Z',
      details: 'CB-3 API Gateway v2.1.4'
    }
  ]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertBorderColor = (type) => {
    switch (type) {
      case 'warning':
        return 'border-l-yellow-500';
      case 'success':
        return 'border-l-green-500';
      case 'info':
        return 'border-l-blue-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const acknowledgeAlert = (alertId) => {
    setAlerts(alerts?.map(alert => 
      alert?.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts?.filter(alert => alert?.id !== alertId));
  };

  const unacknowledgedCount = alerts?.filter(alert => !alert?.acknowledged)?.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Tenant Alerts</h2>
          {unacknowledgedCount > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {unacknowledgedCount}
            </span>
          )}
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      {/* Active Alerts */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Active Alerts</h3>
        {alerts?.length > 0 ? (
          <div className="space-y-2">
            {alerts?.map((alert) => (
              <div
                key={alert?.id}
                className={`bg-white border-l-4 ${getAlertBorderColor(alert?.type)} p-4 rounded-r-lg shadow-sm ${
                  alert?.acknowledged ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert?.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-gray-900">{alert?.title}</h4>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert?.severity)}`}>
                          {alert?.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{alert?.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatTimestamp(alert?.timestamp)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    {!alert?.acknowledged && (
                      <button
                        onClick={() => acknowledgeAlert(alert?.id)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                        title="Acknowledge"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => dismissAlert(alert?.id)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                      title="Dismiss"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No active alerts</p>
          </div>
        )}
      </div>
      {/* Recent Activity */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Recent Activity</h3>
        <div className="space-y-2">
          {recentActivity?.map((activity) => (
            <div key={activity?.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{activity?.user}</span>
                    <span className="text-sm text-gray-600">{activity?.action}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{activity?.details}</p>
                </div>
                <span className="text-xs text-gray-400">{formatTimestamp(activity?.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Escalation Workflows */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-2">
          <Button size="sm" variant="outline" className="justify-start">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Create Incident
          </Button>
          <Button size="sm" variant="outline" className="justify-start">
            <Bell className="h-4 w-4 mr-2" />
            Escalate to Support
          </Button>
          <Button size="sm" variant="outline" className="justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Configure Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenantAlerts;