import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PermissionTestingPanel = ({ roles, permissions, onClose }) => {
  const [testRole, setTestRole] = useState('');
  const [testUser, setTestUser] = useState('');
  const [testScenario, setTestScenario] = useState('');

  const roleOptions = roles?.map(role => ({
    value: role?.name,
    label: `${role?.name} (${role?.users} users)`
  })) || [];

  const userOptions = [
    { value: 'new_user', label: 'New User (Fresh Account)' },
    { value: 'existing_user', label: 'Existing User (Active)' },
    { value: 'inactive_user', label: 'Inactive User (30+ days)' },
    { value: 'admin_user', label: 'Admin User (All Access)' }
  ];

  const scenarioOptions = [
    { value: 'dashboard_access', label: 'Dashboard Access' },
    { value: 'cost_analysis', label: 'Cost Analysis Features' },
    { value: 'budget_management', label: 'Budget Management' },
    { value: 'user_administration', label: 'User Administration' },
    { value: 'system_configuration', label: 'System Configuration' }
  ];

  const runTestSimulation = () => {
    const selectedRole = roles?.find(role => role?.name === testRole);
    if (!selectedRole) return null;

    // Mock simulation results based on role and scenario
    const getScenarioResults = () => {
      switch (testScenario) {
        case 'dashboard_access':
          return {
            allowed: true,
            screens: ['Overview', 'Cost Trends', 'Service Breakdown'],
            restricted: selectedRole?.level > 3 ? ['Admin Panel'] : [],
            notes: 'Full dashboard access granted'
          };
        case 'cost_analysis':
          return {
            allowed: selectedRole?.permissions?.cost_analysis?.view,
            screens: selectedRole?.permissions?.cost_analysis?.edit ? ['Analysis', 'Reports', 'Export'] : ['Analysis', 'Reports'],
            restricted: !selectedRole?.permissions?.cost_analysis?.admin ? ['Settings', 'Configuration'] : [],
            notes: selectedRole?.permissions?.cost_analysis?.view ? 'Analysis access available' : 'Access denied - insufficient permissions'
          };
        case 'budget_management':
          return {
            allowed: selectedRole?.permissions?.budget_management?.view,
            screens: selectedRole?.permissions?.budget_management?.edit ? ['Budgets', 'Forecasts', 'Create'] : ['Budgets', 'Forecasts'],
            restricted: !selectedRole?.permissions?.budget_management?.delete ? ['Delete Budget'] : [],
            notes: selectedRole?.permissions?.budget_management?.view ? 'Budget management available' : 'Access denied'
          };
        case 'user_administration':
          return {
            allowed: selectedRole?.permissions?.user_management?.view,
            screens: selectedRole?.permissions?.user_management?.edit ? ['Users', 'Roles', 'Invite'] : ['Users'],
            restricted: !selectedRole?.permissions?.user_management?.admin ? ['Role Configuration', 'System Users'] : [],
            notes: selectedRole?.permissions?.user_management?.view ? 'User management access' : 'Restricted - admin only feature'
          };
        default:
          return {
            allowed: true,
            screens: ['Basic Access'],
            restricted: [],
            notes: 'General system access'
          };
      }
    };

    return getScenarioResults();
  };

  const simulationResults = testRole && testScenario ? runTestSimulation() : null;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Permission Testing Simulator</h3>
          <p className="text-sm text-muted-foreground">
            Preview user experience for different role combinations
          </p>
        </div>
        <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Test Role
          </label>
          <Select
            options={roleOptions}
            value={testRole}
            onChange={setTestRole}
            placeholder="Select role to test"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            User Type
          </label>
          <Select
            options={userOptions}
            value={testUser}
            onChange={setTestUser}
            placeholder="Select user type"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Test Scenario
          </label>
          <Select
            options={scenarioOptions}
            value={testScenario}
            onChange={setTestScenario}
            placeholder="Select scenario"
          />
        </div>
      </div>

      {simulationResults && (
        <div className="space-y-6">
          {/* Test Results */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-start space-x-3 mb-4">
              <Icon 
                name={simulationResults?.allowed ? "CheckCircle" : "XCircle"} 
                size={20} 
                className={simulationResults?.allowed ? "text-success" : "text-error"} 
              />
              <div>
                <h4 className="text-sm font-medium text-foreground">
                  {simulationResults?.allowed ? "Access Granted" : "Access Denied"}
                </h4>
                <p className="text-sm text-muted-foreground">{simulationResults?.notes}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Allowed Screens */}
              <div>
                <h5 className="text-xs font-medium text-foreground mb-2">Accessible Screens</h5>
                <div className="space-y-1">
                  {simulationResults?.screens?.map((screen, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={14} className="text-success" />
                      <span className="text-sm text-foreground">{screen}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Restricted Features */}
              {simulationResults?.restricted?.length > 0 && (
                <div>
                  <h5 className="text-xs font-medium text-foreground mb-2">Restricted Features</h5>
                  <div className="space-y-1">
                    {simulationResults?.restricted?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="XCircle" size={14} className="text-error" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Experience Preview */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-4">
              <Icon name="Monitor" size={16} className="inline mr-2" />
              User Experience Preview
            </h4>
            
            <div className="bg-muted/20 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="User" size={24} className="text-primary" />
              </div>
              <h5 className="text-sm font-medium text-foreground mb-2">
                Simulated User: {testRole} Role
              </h5>
              <p className="text-xs text-muted-foreground mb-4">
                Testing scenario: {scenarioOptions?.find(s => s?.value === testScenario)?.label}
              </p>
              
              <div className="flex items-center justify-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>{simulationResults?.screens?.length} accessible</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-error rounded-full"></div>
                  <span>{simulationResults?.restricted?.length} restricted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Info" size={16} />
              <span>Results are simulated based on current role configuration</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Download">
                Export Results
              </Button>
              <Button variant="primary" size="sm" iconName="Play">
                Run Another Test
              </Button>
            </div>
          </div>
        </div>
      )}

      {!testRole && (
        <div className="text-center py-12">
          <Icon name="Play" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-sm font-medium text-foreground mb-2">Start Permission Testing</h4>
          <p className="text-xs text-muted-foreground">
            Select a role and scenario to simulate the user experience
          </p>
        </div>
      )}
    </div>
  );
};

export default PermissionTestingPanel;