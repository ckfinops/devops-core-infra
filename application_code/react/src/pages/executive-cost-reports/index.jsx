import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ExecutiveSummaryCards from './components/ExecutiveSummaryCards';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import ExecutiveReports from './components/ExecutiveReports';
import StrategicForecast from './components/StrategicForecast';
import QuickReportActions from './components/QuickReportActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { useCloudData } from '../../hooks/useCloudData';

const ExecutiveCostReports = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timeFrame, setTimeFrame] = useState('quarterly');
  const [reportType, setReportType] = useState('comprehensive');
  const [selectedMetrics, setSelectedMetrics] = useState(['cost-efficiency', 'roi', 'forecast']);
  const { data, loading, error, connections, refreshData } = useCloudData();

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleRefresh = async () => {
    refreshData();
  };

  const handleExportReport = (format) => {
    // Executive report export logic
    console.log(`Exporting executive report in ${format} format`);
  };

  const handleScheduleReport = () => {
    // Schedule report delivery logic
    console.log('Scheduling executive report delivery');
  };

  // Check if any cloud providers are connected
  const hasConnectedProviders = Object.values(connections || {})?.some(conn => conn?.connected);
  
  const timeFrameOptions = [
    { value: 'monthly', label: 'Monthly View' },
    { value: 'quarterly', label: 'Quarterly View' },
    { value: 'annual', label: 'Annual View' },
    { value: 'ytd', label: 'Year to Date' }
  ];

  const reportTypeOptions = [
    { value: 'comprehensive', label: 'Comprehensive Report' },
    { value: 'executive-summary', label: 'Executive Summary' },
    { value: 'board-ready', label: 'Board Presentation' },
    { value: 'cost-optimization', label: 'Cost Optimization Focus' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
        <div className="p-6 space-y-6">
          {/* Executive Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Executive Cost Reports</h1>
              <p className="text-lg text-muted-foreground">
                Strategic cost intelligence and board-ready financial insights
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-3 lg:space-y-0 lg:space-x-4">
              {/* Executive Controls */}
              <div className="flex items-center space-x-3">
                <Select
                  value={timeFrame}
                  onValueChange={setTimeFrame}
                  options={timeFrameOptions}
                  className="w-48"
                />
                <Select
                  value={reportType}
                  onValueChange={setReportType}
                  options={reportTypeOptions}
                  className="w-56"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>Updated: {data?.lastUpdated ? 
                    new Date(data.lastUpdated)?.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit', 
                      minute: '2-digit'
                    }) : 'Never'
                  }</span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  loading={loading}
                  iconName="RefreshCw" 
                  iconPosition="left"
                >
                  Refresh Data
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    iconName="FileText" 
                    iconPosition="left"
                    onClick={() => handleExportReport('pdf')}
                  >
                    Export PDF
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="Calendar" 
                    iconPosition="left"
                    onClick={handleScheduleReport}
                  >
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Status Alert for Executives */}
          {!hasConnectedProviders && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Icon name="AlertTriangle" size={24} className="text-orange-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">
                    Executive Alert: No Data Sources Connected
                  </h3>
                  <p className="text-orange-700 mb-4">
                    Cloud cost data is essential for executive reporting and strategic decision-making. 
                    Connect your organization's cloud accounts to enable comprehensive cost intelligence.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <Button 
                      variant="primary" 
                      size="default" 
                      iconName="Zap" 
                      iconPosition="left"
                      onClick={() => window.location.href = '/cloud-provider-connection-setup'}
                    >
                      Setup Enterprise Connections
                    </Button>
                    <Button 
                      variant="outline" 
                      size="default" 
                      iconName="Phone" 
                      iconPosition="left"
                    >
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Icon name="AlertCircle" size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800 mb-1">
                    Data Availability Issue
                  </h3>
                  <p className="text-sm text-red-700 mb-3">
                    {error}. This may affect the accuracy of executive reports.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="RefreshCw" 
                    iconPosition="left"
                    onClick={handleRefresh}
                  >
                    Retry Connection
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Executive Summary Cards */}
          <ExecutiveSummaryCards 
            data={data?.executiveSummary} 
            timeFrame={timeFrame}
            hasData={hasConnectedProviders}
            loading={loading}
          />

          {/* Executive Dashboard */}
          <ExecutiveDashboard 
            data={data?.executiveDashboard}
            timeFrame={timeFrame}
            selectedMetrics={selectedMetrics}
            onMetricsChange={setSelectedMetrics}
            hasData={hasConnectedProviders}
          />

          {/* Two Column Layout - Reports and Forecast */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Executive Reports Generator */}
            <div className="xl:col-span-1">
              <ExecutiveReports 
                reportType={reportType}
                timeFrame={timeFrame}
                onExportReport={handleExportReport}
                hasData={hasConnectedProviders}
              />
            </div>
            
            {/* Strategic Forecast */}
            <div className="xl:col-span-1">
              <StrategicForecast 
                data={data?.forecast}
                timeFrame={timeFrame}
                hasData={hasConnectedProviders}
              />
            </div>
          </div>

          {/* Quick Report Actions */}
          <QuickReportActions 
            hasConnections={hasConnectedProviders}
            onScheduleReport={handleScheduleReport}
            onExportReport={handleExportReport}
          />

          {/* Executive Footer */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-100 border border-gray-200 rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${hasConnectedProviders ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="text-sm font-medium text-gray-700">
                    {hasConnectedProviders ? 'Live Executive Data' : 'Demo Mode - Connect for Real Data'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={18} className="text-green-600" />
                  <span className="text-sm text-gray-600">Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={18} className="text-blue-600" />
                  <span className="text-sm text-gray-600">SOC2 Type II Certified</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <span className="text-xs text-gray-500">
                  Executive Dashboard v2.1 - Last Updated {new Date()?.toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-3">
                  <Icon name="LifeBuoy" size={16} className="text-gray-500" />
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    Executive Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExecutiveCostReports;