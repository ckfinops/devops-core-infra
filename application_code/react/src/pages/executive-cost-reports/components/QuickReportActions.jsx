import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickReportActions = ({ hasConnections, onScheduleReport, onExportReport }) => {
  const quickActions = [
    {
      id: 'monthly-briefing',
      title: 'Monthly Executive Briefing',
      description: 'Comprehensive monthly cost analysis and trends',
      icon: 'Calendar',
      color: 'blue',
      estimatedTime: '2 min',
      format: 'PDF + PowerPoint'
    },
    {
      id: 'board-presentation',
      title: 'Board Presentation Kit',
      description: 'High-level slides ready for board meetings',
      icon: 'Monitor',
      color: 'green',
      estimatedTime: '1 min',
      format: 'PowerPoint'
    },
    {
      id: 'budget-variance',
      title: 'Budget Variance Report',
      description: 'Current performance vs planned budget',
      icon: 'Target',
      color: 'orange',
      estimatedTime: '1 min',
      format: 'Excel + PDF'
    },
    {
      id: 'cost-optimization',
      title: 'Cost Optimization Summary',
      description: 'Actionable insights for immediate cost savings',
      icon: 'Zap',
      color: 'purple',
      estimatedTime: '3 min',
      format: 'PDF'
    },
    {
      id: 'quarterly-forecast',
      title: 'Quarterly Forecast Update',
      description: 'Updated projections and budget implications',
      icon: 'TrendingUp',
      color: 'indigo',
      estimatedTime: '2 min',
      format: 'PDF + Excel'
    },
    {
      id: 'executive-alerts',
      title: 'Executive Alert Summary',
      description: 'Critical cost anomalies requiring attention',
      icon: 'AlertTriangle',
      color: 'red',
      estimatedTime: '30 sec',
      format: 'Email + PDF'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      red: 'bg-red-50 border-red-200 text-red-800'
    };
    return colorMap?.[color] || colorMap?.blue;
  };

  const getIconColor = (color) => {
    const colorMap = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      orange: 'text-orange-600',
      purple: 'text-purple-600',
      indigo: 'text-indigo-600',
      red: 'text-red-600'
    };
    return colorMap?.[color] || colorMap?.blue;
  };

  const handleQuickAction = (actionId, format) => {
    onExportReport?.(format?.toLowerCase()?.split(' ')?.[0] || 'pdf');
    console.log(`Executing quick action: ${actionId}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Quick Report Actions</h2>
          <p className="text-sm text-gray-600 mt-1">Generate executive reports with one click</p>
        </div>
        <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
          Customize Actions
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <div 
            key={action?.id}
            className="group border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => handleQuickAction(action?.id, action?.format)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(action?.color)}`}>
                <Icon name={action?.icon} size={20} className={getIconColor(action?.color)} />
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Est. time</div>
                <div className="text-xs font-medium text-gray-700">{action?.estimatedTime}</div>
              </div>
            </div>

            <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {action?.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{action?.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {action?.format}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                iconName="ArrowRight" 
                iconPosition="right"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Generate
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Scheduled Reports Section */}
      <div className="border-t border-gray-100 pt-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Automated Delivery</h3>
          <Button 
            variant="primary" 
            size="sm" 
            iconName="Plus" 
            iconPosition="left"
            onClick={onScheduleReport}
          >
            Schedule Report
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={18} className="text-blue-600" />
                <h4 className="font-medium text-blue-900">Recurring Reports</h4>
              </div>
              <span className="text-sm text-blue-700">3 Active</span>
            </div>
            <p className="text-sm text-blue-800 mb-3">
              Automatically deliver reports to executives on schedule
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                View Schedule
              </Button>
              <Button variant="ghost" size="sm" iconName="Settings" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Bell" size={18} className="text-green-600" />
                <h4 className="font-medium text-green-900">Smart Alerts</h4>
              </div>
              <span className="text-sm text-green-700">On</span>
            </div>
            <p className="text-sm text-green-800 mb-3">
              Get notified of significant cost changes and anomalies
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Configure
              </Button>
              <Button variant="ghost" size="sm" iconName="Settings" />
            </div>
          </div>
        </div>
      </div>
      {!hasConnections && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-amber-800 mb-1">Demo Mode Active</h4>
              <p className="text-sm text-amber-700 mb-3">
                Quick actions will generate reports with sample data. Connect your cloud accounts to access real cost data and insights.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                iconName="Zap" 
                iconPosition="left"
                onClick={() => window.location.href = '/cloud-provider-connection-setup'}
              >
                Setup Data Sources
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickReportActions;