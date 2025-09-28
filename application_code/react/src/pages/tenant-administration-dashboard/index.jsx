import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { useCognitoAuth } from '../../contexts/CognitoAuthContext';
import { dynamoDBService } from '../../utils/dynamoDBService';
import MetricCard from './components/MetricCard';
import UsersRolesTab from './components/UsersRolesTab';
import CloudConnectionsTab from './components/CloudConnectionsTab';
import ApplicationsAssetsTab from './components/ApplicationsAssetsTab';
import BillingUsageTab from './components/BillingUsageTab';
import SupportLogsTab from './components/SupportLogsTab';
import TenantAlerts from './components/TenantAlerts';
import { Users, Cloud, Server, DollarSign, AlertTriangle, Activity, Shield, Eye } from 'lucide-react';
import Icon from '../../components/AppIcon';


const TenantAdministrationDashboard = () => {
  const { user, userProfile } = useCognitoAuth();
  const [selectedTenant, setSelectedTenant] = useState('cloud-binary');
  const [activeTab, setActiveTab] = useState('users-roles');
  const [tenantData, setTenantData] = useState(null);
  const [tenantUsers, setTenantUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock tenant data - replace with actual AWS/DynamoDB calls
  const tenantMetrics = {
    userActivity: { value: 145, change: '+12%', trend: 'up' },
    cloudSpend: { value: '$24,567', change: '+8%', trend: 'up' },
    applicationCount: { value: 5, change: '0%', trend: 'stable' },
    supportTickets: { value: 3, change: '-25%', trend: 'down' }
  };

  const tabs = [
    { id: 'users-roles', label: 'Users & Roles', icon: Users },
    { id: 'cloud-connections', label: 'Cloud Connections', icon: Cloud },
    { id: 'applications-assets', label: 'Applications & Assets', icon: Server },
    { id: 'billing-usage', label: 'Billing & Usage', icon: DollarSign },
    { id: 'support-logs', label: 'Support & Logs', icon: Shield }
  ];

  const tenantOptions = [
    { value: 'cloud-binary', label: 'Cloud Binary' },
    { value: 'tech-innovations', label: 'Tech Innovations' },
    { value: 'data-solutions', label: 'Data Solutions' }
  ];

  useEffect(() => {
    loadTenantData();
  }, [selectedTenant]);

  const loadTenantData = async () => {
    setLoading(true);
    try {
      // Load tenant users
      const users = await dynamoDBService?.getUsersByCompany(selectedTenant);
      setTenantUsers(users);
      
      // Set tenant data based on selection
      setTenantData({
        name: selectedTenant === 'cloud-binary' ? 'Cloud Binary' : 'Other Company',
        status: 'Active',
        subscription: 'Enterprise',
        applications: ['CB-1', 'CB-2', 'CB-3', 'CB-4', 'CB-5']
      });
    } catch (error) {
      console.error('Error loading tenant data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTenantSwitch = (tenantId) => {
    setSelectedTenant(tenantId);
    setActiveTab('users-roles'); // Reset to first tab
  };

  const handleImpersonateUser = async (username) => {
    // Implementation for user impersonation
    console.log('Impersonating user:', username);
    // This would typically involve generating a temporary token
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users-roles':
        return <UsersRolesTab tenantUsers={tenantUsers} onImpersonate={handleImpersonateUser} />;
      case 'cloud-connections':
        return <CloudConnectionsTab tenantId={selectedTenant} />;
      case 'applications-assets':
        return <ApplicationsAssetsTab applications={tenantData?.applications || []} />;
      case 'billing-usage':
        return <BillingUsageTab tenantId={selectedTenant} />;
      case 'support-logs':
        return <SupportLogsTab tenantId={selectedTenant} />;
      default:
        return <UsersRolesTab tenantUsers={tenantUsers} onImpersonate={handleImpersonateUser} />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar onToggleCollapse={() => {}} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tenant dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onToggleCollapse={() => {}} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Tenant Context Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <Select
                  options={tenantOptions}
                  value={selectedTenant}
                  onChange={handleTenantSwitch}
                  placeholder="Select Tenant"
                  className="w-64"
                />
              </div>
              {tenantData && (
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    tenantData?.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {tenantData?.status}
                  </span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-600">{tenantData?.subscription} Plan</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Impersonate</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Health Check</span>
              </Button>
              <Button size="sm" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Support Access</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                  title="User Activity"
                  value={tenantMetrics?.userActivity?.value}
                  change={tenantMetrics?.userActivity?.change}
                  trend={tenantMetrics?.userActivity?.trend}
                  icon={Users}
                />
                <MetricCard
                  title="Cloud Spend"
                  value={tenantMetrics?.cloudSpend?.value}
                  change={tenantMetrics?.cloudSpend?.change}
                  trend={tenantMetrics?.cloudSpend?.trend}
                  icon={DollarSign}
                />
                <MetricCard
                  title="Applications"
                  value={tenantMetrics?.applicationCount?.value}
                  change={tenantMetrics?.applicationCount?.change}
                  trend={tenantMetrics?.applicationCount?.trend}
                  icon={Server}
                />
                <MetricCard
                  title="Support Tickets"
                  value={tenantMetrics?.supportTickets?.value}
                  change={tenantMetrics?.supportTickets?.change}
                  trend={tenantMetrics?.supportTickets?.trend}
                  icon={AlertTriangle}
                />
              </div>

              {/* Tab Navigation */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs?.map((tab) => {
                      const Icon = tab?.icon;
                      return (
                        <button
                          key={tab?.id}
                          onClick={() => setActiveTab(tab?.id)}
                          className={`${
                            activeTab === tab?.id
                              ? 'border-indigo-500 text-indigo-600' 
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center space-x-2`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{tab?.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
                
                {/* Tab Content */}
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <TenantAlerts tenantId={selectedTenant} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantAdministrationDashboard;