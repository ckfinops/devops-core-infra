import React, { useState, useEffect } from 'react';
import { useCognitoAuth } from '../../contexts/CognitoAuthContext';
import { dynamoDBService } from '../../utils/dynamoDBService';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ClientMetricsCards from './components/ClientMetricsCards';
import ApplicationTree from './components/ApplicationTree';
import UserRoleAssignments from './components/UserRoleAssignments';
import RoleHierarchyVisualization from './components/RoleHierarchyVisualization';
import ApplicationUserMapping from './components/ApplicationUserMapping';

const ClientApplicationHierarchySetup = () => {
  const { user, userProfile, isAuthenticated } = useCognitoAuth();
  const [selectedClient, setSelectedClient] = useState('Cloud Binary');
  const [applications, setApplications] = useState([]);
  const [clientUsers, setClientUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Cloud Binary example data
  const cloudBinaryApps = [
    {
      id: 'cb-1',
      name: 'CB-1',
      category: 'Web Services',
      technology: 'React/Node.js',
      owner: 'Joel Kummari',
      users: ['joel@cloudbinary.com', 'jessi@cloudbinary.com'],
      permissions: ['read', 'write', 'admin']
    },
    {
      id: 'cb-2',
      name: 'CB-2',
      category: 'Database Services',
      technology: 'PostgreSQL',
      owner: 'Jessi Kummari',
      users: ['jessi@cloudbinary.com', 'john@cloudbinary.com'],
      permissions: ['read', 'write']
    },
    {
      id: 'cb-3',
      name: 'CB-3',
      category: 'Analytics',
      technology: 'Python/ML',
      owner: 'John David',
      users: ['john@cloudbinary.com', 'peter@cloudbinary.com'],
      permissions: ['read', 'execute']
    },
    {
      id: 'cb-4',
      name: 'CB-4',
      category: 'API Gateway',
      technology: 'AWS Lambda',
      owner: 'Peter Samuel',
      users: ['peter@cloudbinary.com', 'james@cloudbinary.com'],
      permissions: ['read']
    },
    {
      id: 'cb-5',
      name: 'CB-5',
      category: 'Monitoring',
      technology: 'CloudWatch',
      owner: 'James Osteen',
      users: ['james@cloudbinary.com'],
      permissions: ['read']
    }
  ];

  const roleHierarchy = [
    {
      level: 1,
      title: 'Executive Level',
      user: 'Joel Kummari',
      email: 'joel@cloudbinary.com',
      permissions: ['Full System Access', 'Budget Management', 'Strategic Planning'],
      applications: ['CB-1', 'CB-2', 'CB-3', 'CB-4', 'CB-5']
    },
    {
      level: 2,
      title: 'Management Level',
      user: 'Jessi Kummari',
      email: 'jessi@cloudbinary.com',
      permissions: ['Team Management', 'Resource Allocation', 'Reporting'],
      applications: ['CB-1', 'CB-2', 'CB-3', 'CB-4']
    },
    {
      level: 3,
      title: 'Operational Level',
      user: 'John David',
      email: 'john@cloudbinary.com',
      permissions: ['System Operations', 'Application Management', 'Incident Response'],
      applications: ['CB-2', 'CB-3', 'CB-4']
    },
    {
      level: 4,
      title: 'Analyst Level',
      user: 'Peter Samuel',
      email: 'peter@cloudbinary.com',
      permissions: ['Data Analysis', 'Report Generation', 'Monitoring'],
      applications: ['CB-3', 'CB-4', 'CB-5']
    },
    {
      level: 5,
      title: 'Read-Only Access',
      user: 'James Osteen',
      email: 'james@cloudbinary.com',
      permissions: ['View Reports', 'System Status', 'Basic Monitoring'],
      applications: ['CB-5']
    }
  ];

  useEffect(() => {
    if (isAuthenticated) {
      loadClientData();
    }
  }, [isAuthenticated, selectedClient]);

  const loadClientData = async () => {
    try {
      setLoading(true);
      // Load users for selected client
      const users = await dynamoDBService?.getUsersByCompany(selectedClient);
      setClientUsers(users || []);
      
      // Set applications for the client
      setApplications(cloudBinaryApps);
    } catch (error) {
      setError('Failed to load client data');
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationUserMapping = async (appId, userEmail, permissions) => {
    try {
      // In a real implementation, this would update a separate applications table
      console.log('Mapping user to application:', { appId, userEmail, permissions });
      // For now, just simulate success
      setError(null);
    } catch (error) {
      setError('Failed to update application user mapping');
    }
  };

  const handleRoleUpdate = async (userEmail, newRole) => {
    try {
      // Find user by email and update role
      const user = clientUsers?.find(u => u?.email === userEmail);
      if (user) {
        await dynamoDBService?.updateUserProfile(user?.username, { role: newRole });
        await loadClientData(); // Refresh data
      }
    } catch (error) {
      setError('Failed to update user role');
    }
  };

  const clientMetrics = {
    totalApplications: applications?.length,
    activeUsers: roleHierarchy?.length,
    cognitoSessions: roleHierarchy?.filter(r => r?.user)?.length,
    onboardingComplete: 100
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading client hierarchy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Client Application Hierarchy Setup</h1>
                  <p className="text-gray-600 mt-1">
                    Configure {selectedClient} application inventory and user role hierarchies
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e?.target?.value)}
                    className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Cloud Binary">Cloud Binary</option>
                  </select>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>AWS/Azure/GCP Connected</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{error}</p>
                      <button 
                        onClick={() => setError(null)}
                        className="text-red-600 hover:text-red-500 text-sm underline mt-1"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Client Metrics */}
            <ClientMetricsCards metrics={clientMetrics} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Application Tree */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Application Structure</h2>
                  <p className="text-sm text-gray-600 mt-1">Organized by business function and technical stack</p>
                </div>
                <ApplicationTree 
                  applications={applications}
                  onApplicationUserMapping={handleApplicationUserMapping}
                />
              </div>

              {/* User Role Assignments */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Role Assignments</h2>
                  <p className="text-sm text-gray-600 mt-1">Cognito users and DynamoDB synchronization</p>
                </div>
                <UserRoleAssignments 
                  roleHierarchy={roleHierarchy}
                  onRoleUpdate={handleRoleUpdate}
                />
              </div>
            </div>

            {/* Role Hierarchy Visualization */}
            <RoleHierarchyVisualization roleHierarchy={roleHierarchy} />

            {/* Application User Mapping */}
            <ApplicationUserMapping 
              applications={applications}
              roleHierarchy={roleHierarchy}
              onMappingUpdate={handleApplicationUserMapping}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientApplicationHierarchySetup;