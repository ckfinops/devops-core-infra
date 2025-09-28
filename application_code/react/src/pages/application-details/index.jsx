import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import DetailsTab from './components/DetailsTab';
import ArchitectureTab from './components/ArchitectureTab';
import DevOpsTab from './components/DevOpsTab';
import InfrastructureTab from './components/InfrastructureTab';
import IntegrationsTab from './components/IntegrationsTab';
import SupportTab from './components/SupportTab';
import ApplicationSidebar from './components/ApplicationSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Add this utility function for conditional class names
const cn = (...classes) => {
  return classes?.filter(Boolean)?.join(' ');
};

const ApplicationDetails = () => {
  const [searchParams] = useSearchParams();
  const applicationId = searchParams?.get('id');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock application data - in real app would fetch based on applicationId
  useEffect(() => {
    const mockApplication = {
      id: applicationId || 1,
      name: 'Customer Portal',
      status: 'Active',
      criticality: 'High',
      version: '2.1.4',
      techStackOwner: 'John Smith',
      itOwner: 'Sarah Johnson',
      functionalOwner: 'Mike Davis',
      appType: 'Web Application',
      hostingEnv: 'AWS Production',
      lastUpdated: '2025-01-08T10:30:00Z',
      description: 'Primary customer-facing portal for account management, service requests, and billing inquiries.',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
      deploymentEnvironments: ['Development', 'Testing', 'Staging', 'Production']
    };

    setTimeout(() => {
      setApplication(mockApplication);
      setLoading(false);
    }, 1000);
  }, [applicationId]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleRightSidebarToggle = () => {
    setRightSidebarVisible(!rightSidebarVisible);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleEdit = () => {
    console.log('Edit application:', application?.id);
  };

  const handleNotifications = () => {
    console.log('Manage notifications for:', application?.id);
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: 'FileText' },
    { id: 'architecture', label: 'Application Architecture Diagrams', icon: 'Network' },
    { id: 'devops', label: 'DevOps Tools', icon: 'GitBranch' },
    { id: 'infrastructure', label: 'Cloud Infrastructure', icon: 'Cloud' },
    { id: 'integrations', label: 'Integrations', icon: 'Zap' },
    { id: 'support', label: 'Help & Support', icon: 'HelpCircle' }
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800 border-green-200',
      'Maintenance': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Inactive': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return statusStyles?.[status] || statusStyles?.['Inactive'];
  };

  const getCriticalityBadge = (criticality) => {
    const criticalityStyles = {
      'Critical': 'bg-red-100 text-red-800 border-red-200',
      'High': 'bg-orange-100 text-orange-800 border-orange-200',
      'Medium': 'bg-blue-100 text-blue-800 border-blue-200',
      'Low': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return criticalityStyles?.[criticality] || criticalityStyles?.['Low'];
  };

  const renderTabContent = () => {
    if (loading || !application) return null;

    switch (activeTab) {
      case 'details':
        return <DetailsTab application={application} />;
      case 'architecture':
        return <ArchitectureTab application={application} />;
      case 'devops':
        return <DevOpsTab application={application} />;
      case 'infrastructure':
        return <InfrastructureTab application={application} />;
      case 'integrations':
        return <IntegrationsTab application={application} />;
      case 'support':
        return <SupportTab application={application} />;
      default:
        return <DetailsTab application={application} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
        <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
          <div className="p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
      
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'} ${rightSidebarVisible ? 'mr-80' : 'mr-0'}`}>
        <div className="p-6 space-y-6">
          {/* Application Header */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Package" size={32} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h1 className="text-2xl font-bold text-foreground">{application?.name}</h1>
                    <span className={`px-3 py-1 text-sm rounded-full border ${getStatusBadge(application?.status)}`}>
                      {application?.status}
                    </span>
                    <span className={`px-3 py-1 text-sm rounded-full border ${getCriticalityBadge(application?.criticality)}`}>
                      {application?.criticality}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{application?.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">Version:</span>
                      <span>{application?.version}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">Tech Owner:</span>
                      <span>{application?.techStackOwner}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">Environment:</span>
                      <span>{application?.hostingEnv}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 lg:flex-col lg:space-x-0 lg:space-y-2 xl:flex-row xl:space-y-0 xl:space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRightSidebarToggle}
                  iconName="PanelRight" 
                  iconPosition="left"
                  className="w-full lg:w-auto"
                >
                  {rightSidebarVisible ? 'Hide Details' : 'Show Details'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNotifications}
                  iconName="Bell" 
                  iconPosition="left"
                  className="w-full lg:w-auto"
                >
                  Notifications
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={handleEdit}
                  iconName="Edit" 
                  iconPosition="left"
                  className="w-full lg:w-auto"
                >
                  Edit Application
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg">
            <div className="border-b border-border px-6">
              <nav className="flex space-x-6 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => handleTabChange(tab?.id)}
                    className={cn(
                      "flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors min-w-0",
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    )}
                  >
                    <Icon name={tab?.icon} size={16} className="flex-shrink-0" />
                    <span className="truncate">{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <ApplicationSidebar 
          application={application} 
          isVisible={rightSidebarVisible}
          onToggle={handleRightSidebarToggle}
        />
      </main>
    </div>
  );
};

export default ApplicationDetails;