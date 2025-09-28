import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AlertSummaryCards from './components/AlertSummaryCards';
import ActiveAlertsList from './components/ActiveAlertsList';
import AlertConfigurationPanel from './components/AlertConfigurationPanel';
import AlertHistoryTable from './components/AlertHistoryTable';
import AlertSidebar from './components/AlertSidebar';

const CostAlertsNotifications = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSelectAlert = (alert) => {
    setSelectedAlert(alert);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleToggleSidebar} />
      <main className={`transition-all duration-300 ease-out ${
        sidebarCollapsed ? 'ml-16' : 'ml-60'
      } mt-16`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Cost Alerts & Notifications</h1>
                <p className="text-muted-foreground mt-2">
                  Proactive cost monitoring and alerting system for comprehensive financial control
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Last Updated</div>
                <div className="text-lg font-semibold text-foreground">
                  {new Date()?.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Alert Summary Cards */}
          <AlertSummaryCards />

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
            {/* Left Pane - Active Alerts */}
            <div className="xl:col-span-2">
              <ActiveAlertsList onSelectAlert={handleSelectAlert} />
            </div>

            {/* Right Pane - Alert Configuration */}
            <div className="xl:col-span-2">
              <AlertConfigurationPanel selectedAlert={selectedAlert} />
            </div>
          </div>

          {/* Bottom Section Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Alert History Table */}
            <div className="xl:col-span-3">
              <AlertHistoryTable />
            </div>

            {/* Sidebar Filters and Actions */}
            <div className="xl:col-span-1">
              <AlertSidebar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CostAlertsNotifications;