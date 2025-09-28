import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

import RoleOverviewCards from './components/RoleOverviewCards';
import RoleHierarchyTree from './components/RoleHierarchyTree';
import PermissionMatrix from './components/PermissionMatrix';
import PermissionTestingPanel from './components/PermissionTestingPanel';
import CustomRoleModal from './components/CustomRoleModal';

const RoleBasedAccessControl = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Executive Level');
  const [showCustomRoleModal, setShowCustomRoleModal] = useState(false);
  const [testingMode, setTestingMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [roleData, setRoleData] = useState([]);
  const [permissionData, setPermissionData] = useState([]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleCreateCustomRole = () => {
    setShowCustomRoleModal(true);
  };

  const handleTestPermissions = () => {
    setTestingMode(!testingMode);
  };

  // Mock role data
  useEffect(() => {
    const mockRoles = [
      {
        id: 1,
        name: 'Executive Level',
        level: 1,
        users: 3,
        description: 'Full administrative access with strategic oversight',
        parent: null,
        permissions: {
          'cost_analysis': { view: true, edit: true, delete: true, admin: true },
          'budget_management': { view: true, edit: true, delete: true, admin: true },
          'optimization_recommendations': { view: true, edit: true, delete: true, admin: true },
          'user_management': { view: true, edit: true, delete: true, admin: true },
          'system_configuration': { view: true, edit: true, delete: true, admin: true }
        },
        conditions: ['ip_restriction', 'time_based', 'mfa_required']
      },
      {
        id: 2,
        name: 'Management Level',
        level: 2,
        users: 8,
        description: 'Team management and operational oversight',
        parent: 'Executive Level',
        permissions: {
          'cost_analysis': { view: true, edit: true, delete: false, admin: false },
          'budget_management': { view: true, edit: true, delete: false, admin: false },
          'optimization_recommendations': { view: true, edit: true, delete: false, admin: false },
          'user_management': { view: true, edit: false, delete: false, admin: false },
          'system_configuration': { view: true, edit: false, delete: false, admin: false }
        },
        conditions: ['time_based']
      },
      {
        id: 3,
        name: 'Operational Level',
        level: 3,
        users: 15,
        description: 'Hands-on technical operations and implementation',
        parent: 'Management Level',
        permissions: {
          'cost_analysis': { view: true, edit: true, delete: false, admin: false },
          'budget_management': { view: true, edit: false, delete: false, admin: false },
          'optimization_recommendations': { view: true, edit: true, delete: false, admin: false },
          'user_management': { view: false, edit: false, delete: false, admin: false },
          'system_configuration': { view: true, edit: false, delete: false, admin: false }
        },
        conditions: []
      },
      {
        id: 4,
        name: 'Analyst Level',
        level: 4,
        users: 12,
        description: 'Data analysis and reporting capabilities',
        parent: 'Operational Level',
        permissions: {
          'cost_analysis': { view: true, edit: false, delete: false, admin: false },
          'budget_management': { view: true, edit: false, delete: false, admin: false },
          'optimization_recommendations': { view: true, edit: false, delete: false, admin: false },
          'user_management': { view: false, edit: false, delete: false, admin: false },
          'system_configuration': { view: false, edit: false, delete: false, admin: false }
        },
        conditions: []
      },
      {
        id: 5,
        name: 'Read-Only Access',
        level: 5,
        users: 25,
        description: 'View-only access to dashboards and reports',
        parent: 'Analyst Level',
        permissions: {
          'cost_analysis': { view: true, edit: false, delete: false, admin: false },
          'budget_management': { view: true, edit: false, delete: false, admin: false },
          'optimization_recommendations': { view: true, edit: false, delete: false, admin: false },
          'user_management': { view: false, edit: false, delete: false, admin: false },
          'system_configuration': { view: false, edit: false, delete: false, admin: false }
        },
        conditions: []
      }
    ];

    const mockPermissions = [
      {
        category: 'Cost Management',
        features: [
          { name: 'cost_analysis', label: 'Cost Analysis', description: 'View and analyze cost data across cloud providers' },
          { name: 'budget_management', label: 'Budget Management', description: 'Create, edit, and manage budgets and forecasts' },
          { name: 'optimization_recommendations', label: 'Optimization Recommendations', description: 'Access cost optimization suggestions' }
        ]
      },
      {
        category: 'Administration',
        features: [
          { name: 'user_management', label: 'User Management', description: 'Manage user accounts, roles, and permissions' },
          { name: 'system_configuration', label: 'System Configuration', description: 'Configure system settings and integrations' }
        ]
      }
    ];

    setTimeout(() => {
      setRoleData(mockRoles);
      setPermissionData(mockPermissions);
      setLoading(false);
    }, 1000);
  }, []);

  const overviewData = {
    totalRoles: roleData?.length || 0,
    customRoles: 2,
    complexityScore: 75,
    complianceStatus: 'Compliant'
  };

  const selectedRoleData = roleData?.find(role => role?.name === selectedRole);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Role-Based Access Control</h1>
              <p className="text-muted-foreground">
                Granular permission management and role definition for hierarchical access system
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant={testingMode ? "primary" : "outline"}
                size="sm" 
                iconName="Play" 
                iconPosition="left"
                onClick={handleTestPermissions}
              >
                {testingMode ? "Exit Testing" : "Test Permissions"}
              </Button>
              
              <Button 
                variant="primary" 
                size="sm" 
                iconName="Plus" 
                iconPosition="left"
                onClick={handleCreateCustomRole}
              >
                Create Custom Role
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                iconName="Download" 
                iconPosition="left"
              >
                Export Configuration
              </Button>
            </div>
          </div>

          {/* Testing Mode Banner */}
          {testingMode && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Play" size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-orange-800 mb-1">
                    Permission Testing Mode Active
                  </h3>
                  <p className="text-sm text-orange-700">
                    Preview user experience for different role combinations. Changes made in testing mode will not be saved.
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  iconName="X" 
                  onClick={() => setTestingMode(false)}
                />
              </div>
            </div>
          )}

          {/* Role Overview Cards */}
          <RoleOverviewCards data={overviewData} loading={loading} />

          {/* Search and Filter */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search roles and permissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  iconName="Search"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Copy">
                  Clone Role
                </Button>
                <Button variant="ghost" size="sm" iconName="Download">
                  Export Roles
                </Button>
                <Button variant="ghost" size="sm" iconName="Upload">
                  Import Roles
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content - Dual Pane Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 min-h-[600px]">
            {/* Left Pane - Role Hierarchy */}
            <div className="xl:col-span-1">
              <RoleHierarchyTree
                roles={roleData}
                selectedRole={selectedRole}
                onRoleSelect={setSelectedRole}
                loading={loading}
                searchTerm={searchTerm}
              />
            </div>
            
            {/* Right Pane - Permission Matrix */}
            <div className="xl:col-span-2">
              <PermissionMatrix
                role={selectedRoleData}
                permissions={permissionData}
                loading={loading}
                testingMode={testingMode}
              />
            </div>
          </div>

          {/* Permission Testing Simulator */}
          {testingMode && (
            <PermissionTestingPanel
              roles={roleData}
              permissions={permissionData}
              onClose={() => setTestingMode(false)}
            />
          )}
        </div>
      </main>
      {/* Custom Role Modal */}
      <CustomRoleModal
        isOpen={showCustomRoleModal}
        onClose={() => setShowCustomRoleModal(false)}
        roles={roleData}
        permissions={permissionData}
        onCreate={(roleData) => {
          console.log('Creating custom role:', roleData);
          // Implement custom role creation logic here
        }}
      />
    </div>
  );
};

export default RoleBasedAccessControl;