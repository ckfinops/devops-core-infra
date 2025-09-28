import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import UserSummaryCards from './components/UserSummaryCards';
import UserTable from './components/UserTable';
import UserSidebar from './components/UserSidebar';
import InvitationModal from './components/InvitationModal';
import UserEditModal from './components/UserEditModal';

const UserManagementConsole = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleRightSidebarToggle = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const handleBulkAction = (action) => {
    if (selectedUsers?.length === 0) return;
    
    switch (action) {
      case 'activate':
        setUsers(prev => prev?.map(user => 
          selectedUsers?.includes(user?.id) ? { ...user, status: 'active' } : user
        ));
        break;
      case 'deactivate':
        setUsers(prev => prev?.map(user => 
          selectedUsers?.includes(user?.id) ? { ...user, status: 'inactive' } : user
        ));
        break;
      case 'email': console.log('Sending email to selected users:', selectedUsers);
        break;
      default:
        console.log(`Performing ${action} on ${selectedUsers?.length} users`);
    }
    
    // Clear selection after bulk action
    setSelectedUsers([]);
  };

  const handleUserInvite = () => {
    setShowInvitationModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      // Update the user in the users array
      setUsers(prev => prev?.map(user => 
        user?.id === updatedUser?.id ? updatedUser : user
      ));
      
      // In a real application, you would make an API call here
      console.log('User updated successfully:', updatedUser);
      
      // Show success message (you could add a toast notification here)
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        // Remove user from the users array
        setUsers(prev => prev?.filter(user => user?.id !== userId));
        
        // Remove from selected users if present
        setSelectedUsers(prev => prev?.filter(id => id !== userId));
        
        console.log('User deleted successfully:', userId);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  // Mock data for users
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Anderson',
        email: 'j.anderson@company.com',
        role: 'Executive Level',
        roleType: 'CFO',
        department: 'Finance',
        lastLogin: '2025-01-09 10:30 AM',
        status: 'active',
        avatar: '/api/placeholder/32/32',
        permissions: ['cost_analysis', 'budget_management', 'optimization_recommendations', 'admin_functions']
      },
      {
        id: 2,
        name: 'Sarah Chen',
        email: 's.chen@company.com',
        role: 'Management Level',
        roleType: 'FinOps Manager',
        department: 'Operations',
        lastLogin: '2025-01-09 09:15 AM',
        status: 'active',
        avatar: '/api/placeholder/32/32',
        permissions: ['cost_analysis', 'budget_management', 'optimization_recommendations']
      },
      {
        id: 3,
        name: 'Michael Rodriguez',
        email: 'm.rodriguez@company.com',
        role: 'Operational Level',
        roleType: 'DevOps Engineer',
        department: 'Engineering',
        lastLogin: '2025-01-08 04:45 PM',
        status: 'active',
        avatar: '/api/placeholder/32/32',
        permissions: ['cost_analysis', 'optimization_recommendations']
      },
      {
        id: 4,
        name: 'Emily Watson',
        email: 'e.watson@company.com',
        role: 'Analyst Level',
        roleType: 'FinOps Analyst',
        department: 'Finance',
        lastLogin: '2025-01-09 11:20 AM',
        status: 'active',
        avatar: '/api/placeholder/32/32',
        permissions: ['cost_analysis']
      },
      {
        id: 5,
        name: 'David Kim',
        email: 'd.kim@company.com',
        role: 'Read-Only Access',
        roleType: 'Stakeholder',
        department: 'Product',
        lastLogin: '2025-01-07 02:30 PM',
        status: 'inactive',
        avatar: '/api/placeholder/32/32',
        permissions: []
      }
    ];

    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const summaryData = {
    totalUsers: users?.length || 0,
    activeUsers: users?.filter(u => u?.status === 'active')?.length || 0,
    pendingInvitations: 3,
    recentAccess: users?.filter(u => {
      const lastLogin = new Date(u?.lastLogin);
      const today = new Date();
      return (today - lastLogin) < (24 * 60 * 60 * 1000);
    })?.length || 0
  };

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'Executive Level', label: 'Executive Level' },
    { value: 'Management Level', label: 'Management Level' },
    { value: 'Operational Level', label: 'Operational Level' },
    { value: 'Analyst Level', label: 'Analyst Level' },
    { value: 'Read-Only Access', label: 'Read-Only Access' }
  ];

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Product', label: 'Product' },
    { value: 'IT', label: 'IT' }
  ];

  const filteredUsers = users?.filter(user => {
    return ((searchTerm === '' || 
      user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase())) &&
    (filterRole === '' || user?.role === filterRole) && (filterDepartment === '' || user?.department === filterDepartment));
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'} ${rightSidebarOpen ? 'mr-80' : ''}`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">User Management Console</h1>
              <p className="text-muted-foreground">
                Comprehensive administration of user accounts, roles, and permissions
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                iconName="Filter" 
                iconPosition="left"
                onClick={handleRightSidebarToggle}
              >
                Filters
              </Button>
              
              <Button 
                variant="primary" 
                size="sm" 
                iconName="UserPlus" 
                iconPosition="left"
                onClick={handleUserInvite}
              >
                Invite User
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                iconName="Download" 
                iconPosition="left"
              >
                Export Report
              </Button>
            </div>
          </div>

          {/* User Summary Cards */}
          <UserSummaryCards data={summaryData} loading={loading} />

          {/* Search and Filter Controls */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  iconName="Search"
                />
              </div>
              
              <div className="w-full lg:w-48">
                <Select
                  options={roleOptions}
                  value={filterRole}
                  onChange={(value) => setFilterRole(value)}
                  placeholder="Filter by role"
                />
              </div>
              
              <div className="w-full lg:w-48">
                <Select
                  options={departmentOptions}
                  value={filterDepartment}
                  onChange={(value) => setFilterDepartment(value)}
                  placeholder="Filter by department"
                />
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedUsers?.length > 0 && (
              <div className="flex items-center justify-between mt-4 p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Mail"
                    iconPosition="left"
                    onClick={() => handleBulkAction('email')}
                  >
                    Send Email
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="UserCheck"
                    iconPosition="left"
                    onClick={() => handleBulkAction('activate')}
                  >
                    Activate
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="UserX"
                    iconPosition="left"
                    onClick={() => handleBulkAction('deactivate')}
                  >
                    Deactivate
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Table */}
          <UserTable
            users={filteredUsers}
            selectedUsers={selectedUsers}
            onSelectionChange={setSelectedUsers}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            loading={loading}
          />
        </div>
      </main>
      {/* Right Sidebar for Filters */}
      <UserSidebar 
        isOpen={rightSidebarOpen}
        onClose={() => setRightSidebarOpen(false)}
        onFiltersApply={(filters) => {
          setFilterRole(filters?.role);
          setFilterDepartment(filters?.department);
        }}
      />
      
      {/* Invitation Modal */}
      <InvitationModal
        isOpen={showInvitationModal}
        onClose={() => setShowInvitationModal(false)}
        onInvite={(inviteData) => {
          console.log('Sending invitation:', inviteData);
          // Implement invitation logic here
        }}
      />
      
      {/* User Edit Modal */}
      <UserEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingUser(null);
        }}
        user={editingUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default UserManagementConsole;