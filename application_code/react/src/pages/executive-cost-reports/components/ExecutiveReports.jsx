import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ExecutiveReports = ({ reportType, timeFrame, onExportReport, hasData }) => {
  const [selectedReport, setSelectedReport] = useState('board-summary');
  const [scheduleConfig, setScheduleConfig] = useState({
    frequency: 'monthly',
    recipients: ['exec@company.com'],
    format: 'pdf'
  });

  const reportTemplates = [
    {
      id: 'board-summary',
      name: 'Board Summary',
      description: 'High-level cost overview for board meetings',
      icon: 'FileText',
      pages: 3,
      lastGenerated: '2 days ago'
    },
    {
      id: 'executive-briefing',
      name: 'Executive Briefing',
      description: 'Detailed cost intelligence and strategic insights',
      icon: 'BookOpen',
      pages: 12,
      lastGenerated: '1 week ago'
    },
    {
      id: 'cost-optimization',
      name: 'Optimization Report',
      description: 'Cost-saving opportunities and recommendations',
      icon: 'Zap',
      pages: 8,
      lastGenerated: '3 days ago'
    },
    {
      id: 'budget-variance',
      name: 'Budget Variance',
      description: 'Budget vs actual performance analysis',
      icon: 'Target',
      pages: 6,
      lastGenerated: '5 days ago'
    }
  ];

  const scheduledReports = [
    {
      name: 'Monthly Executive Summary',
      recipients: 3,
      nextDelivery: '2025-01-15',
      status: 'active'
    },
    {
      name: 'Quarterly Board Report',
      recipients: 8,
      nextDelivery: '2025-04-01',
      status: 'active'
    },
    {
      name: 'Weekly Cost Alerts',
      recipients: 12,
      nextDelivery: '2025-01-13',
      status: 'paused'
    }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'pptx', label: 'PowerPoint Presentation' },
    { value: 'excel', label: 'Excel Workbook' },
    { value: 'email', label: 'Email Summary' }
  ];

  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annually', label: 'Annually' }
  ];

  const handleGenerateReport = (templateId) => {
    onExportReport?.(scheduleConfig?.format);
    // Additional logic for specific report generation
    console.log(`Generating ${templateId} report`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Executive Reports</h2>
        <Button 
          variant="primary" 
          size="sm" 
          iconName="Plus" 
          iconPosition="left"
        >
          New Template
        </Button>
      </div>
      {/* Report Templates */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Report Templates</h3>
        {reportTemplates?.map((template) => (
          <div 
            key={template?.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedReport === template?.id 
                ? 'border-blue-300 bg-blue-50 shadow-sm' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
            onClick={() => setSelectedReport(template?.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedReport === template?.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Icon 
                    name={template?.icon} 
                    size={20} 
                    className={selectedReport === template?.id ? 'text-blue-600' : 'text-gray-600'}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{template?.name}</h4>
                  <p className="text-sm text-gray-600">{template?.description}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">{template?.pages} pages</span>
                    <span className="text-xs text-gray-500">Updated {template?.lastGenerated}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleGenerateReport(template?.id);
                  }}
                >
                  Generate
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  iconName="MoreVertical"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Report Configuration */}
      <div className="border-t border-gray-100 pt-6 space-y-4">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Export Configuration</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <Select
              value={scheduleConfig?.format}
              onValueChange={(value) => setScheduleConfig(prev => ({ ...prev, format: value }))}
              options={formatOptions}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
            <Select
              value={scheduleConfig?.frequency}
              onValueChange={(value) => setScheduleConfig(prev => ({ ...prev, frequency: value }))}
              options={frequencyOptions}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button 
            variant="primary" 
            iconName="Download" 
            iconPosition="left"
            onClick={() => handleGenerateReport(selectedReport)}
          >
            Generate Report
          </Button>
          <Button 
            variant="outline" 
            iconName="Calendar" 
            iconPosition="left"
          >
            Schedule Delivery
          </Button>
          <Button 
            variant="ghost" 
            iconName="Eye" 
            iconPosition="left"
          >
            Preview
          </Button>
        </div>
      </div>
      {/* Scheduled Reports */}
      <div className="border-t border-gray-100 pt-6 mt-6">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-4">Scheduled Reports</h3>
        
        <div className="space-y-3">
          {scheduledReports?.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{report?.name}</h4>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-500">{report?.recipients} recipients</span>
                  <span className="text-xs text-gray-500">Next: {report?.nextDelivery}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    report?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report?.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Edit3" />
                <Button variant="ghost" size="sm" iconName="Trash2" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {!hasData && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 mb-1">Demo Mode</h4>
              <p className="text-sm text-blue-700">
                Reports will contain demo data. Connect your cloud accounts to generate reports with real cost data.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutiveReports;