import React, { useState, useEffect } from 'react';
import { useCognitoAuth } from '../../contexts/CognitoAuthContext';
import { dynamoDBService } from '../../utils/dynamoDBService';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import RoleSummaryCards from './components/RoleSummaryCards';
import TenantSwitcher from './components/TenantSwitcher';
import RoleMatrix from './components/RoleMatrix';
import FilterPanel from './components/FilterPanel';
import BulkRoleActions from './components/BulkRoleActions';
import AuditTrail from './components/AuditTrail';

const MultiTenantRoleManagement = () => {
  const { user, userProfile, isAuthenticated } = useCognitoAuth();
  const [users, setUsers] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    role: 'all',
    status: 'all',
    tenant: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadUsers();
      loadTenants();
    }
  }, [isAuthenticated]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const result = await dynamoDBService?.listUsers(100);
      setUsers(result?.users || []);
    } catch (error) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const loadTenants = async () => {
    try {
      // Load unique companies as tenants
      const result = await dynamoDBService?.listUsers(1000);
      const uniqueTenants = [...new Set(result.users?.map(user => user.company).filter(Boolean))];
      setTenants(uniqueTenants?.map(tenant => ({ id: tenant, name: tenant })));
    } catch (error) {
      console.error('Failed to load tenants:', error);
    }
  };

  const handleRoleUpdate = async (username, newRole, tenantId = null) => {
    try {
      const updateData = { role: newRole };
      if (tenantId) {
        updateData.company = tenantId;
      }
      
      await dynamoDBService?.updateUserProfile(username, updateData);
      await loadUsers(); // Refresh users
    } catch (error) {
      setError('Failed to update user role');
    }
  };

  const handleBulkRoleUpdate = async (usernames, newRole) => {
    try {
      const updatePromises = usernames?.map(username => 
        dynamoDBService?.updateUserProfile(username, { role: newRole })
      );
      await Promise.all(updatePromises);
      await loadUsers();
      setSelectedUsers([]);
    } catch (error) {
      setError('Failed to update roles in bulk');
    }
  };

  const filteredUsers = users?.filter(user => {
    if (filterCriteria?.role !== 'all' && user?.role !== filterCriteria?.role) return false;
    if (filterCriteria?.status !== 'all' && user?.status !== filterCriteria?.status) return false;
    if (selectedTenant !== 'all' && user?.company !== selectedTenant) return false;
    return true;
  });

  const roleCounts = {
    superUser: users?.filter(u => u?.role === 'Super User')?.length,
    admin: users?.filter(u => u?.role === 'Admin')?.length,
    readOnly: users?.filter(u => u?.role === 'Read Only')?.length,
    total: users?.length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading role management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar onToggleCollapse={setSidebarCollapsed} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Multi-Tenant Role Management</h1>
                  <p className="text-gray-600 mt-1">
                    Manage C3Ops user roles across multiple client tenants with AWS Cognito integration
                  </p>
                </div>
                <TenantSwitcher 
                  tenants={tenants}
                  selectedTenant={selectedTenant}
                  onTenantChange={setSelectedTenant}
                />
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

            {/* Role Summary Cards */}
            <RoleSummaryCards roleCounts={roleCounts} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filter Panel */}
              <div className="lg:col-span-1">
                <FilterPanel 
                  filterCriteria={filterCriteria}
                  onFilterChange={setFilterCriteria}
                  tenants={tenants}
                />
              </div>

              {/* Role Matrix */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">User Role Matrix</h2>
                      <div className="text-sm text-gray-500">
                        {filteredUsers?.length} users found
                      </div>
                    </div>
                  </div>

                  {/* Bulk Actions */}
                  {selectedUsers?.length > 0 && (
                    <BulkRoleActions 
                      selectedCount={selectedUsers?.length}
                      onBulkUpdate={handleBulkRoleUpdate}
                      selectedUsers={selectedUsers}
                    />
                  )}

                  <RoleMatrix 
                    users={filteredUsers}
                    onRoleUpdate={handleRoleUpdate}
                    selectedUsers={selectedUsers}
                    onUserSelect={setSelectedUsers}
                    tenants={tenants}
                  />
                </div>
              </div>
            </div>

            {/* Audit Trail */}
            <AuditTrail />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MultiTenantRoleManagement;