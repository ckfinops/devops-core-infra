import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const UserSidebar = ({ isOpen, onClose, onFiltersApply }) => {
  const [filters, setFilters] = useState({
    role: '',
    department: '',
    status: '',
    accessPattern: '',
    lastLogin: ''
  });

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

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const accessPatternOptions = [
    { value: '', label: 'All Patterns' },
    { value: 'daily', label: 'Daily Users' },
    { value: 'weekly', label: 'Weekly Users' },
    { value: 'monthly', label: 'Monthly Users' },
    { value: 'inactive', label: 'Inactive Users' }
  ];

  const lastLoginOptions = [
    { value: '', label: 'Any Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    onFiltersApply(filters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      role: '',
      department: '',
      status: '',
      accessPattern: '',
      lastLogin: ''
    };
    setFilters(clearedFilters);
    onFiltersApply(clearedFilters);
  };

  const roleTemplates = [
    {
      name: 'Executive Access',
      description: 'Full administrative access',
      permissions: ['All Functions', 'User Management', 'System Config']
    },
    {
      name: 'Manager Access',
      description: 'Team management and oversight',
      permissions: ['Cost Analysis', 'Budget Management', 'Team Reports']
    },
    {
      name: 'Analyst Access',
      description: 'Data analysis and reporting',
      permissions: ['Cost Analysis', 'Report Generation']
    },
    {
      name: 'Viewer Access',
      description: 'Read-only dashboard access',
      permissions: ['Dashboard View', 'Basic Reports']
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 lg:hidden"
        onClick={onClose}
      />
      {/* Sidebar */}
      <div className="fixed right-0 top-16 bottom-0 w-80 bg-card border-l border-border z-50 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Advanced Filters</h2>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>

          {/* Filter Section */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Role Level
              </label>
              <Select
                options={roleOptions}
                value={filters?.role}
                onChange={(value) => handleFilterChange('role', value)}
                placeholder="Select role level"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Department
              </label>
              <Select
                options={departmentOptions}
                value={filters?.department}
                onChange={(value) => handleFilterChange('department', value)}
                placeholder="Select department"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Status
              </label>
              <Select
                options={statusOptions}
                value={filters?.status}
                onChange={(value) => handleFilterChange('status', value)}
                placeholder="Select status"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Access Pattern
              </label>
              <Select
                options={accessPatternOptions}
                value={filters?.accessPattern}
                onChange={(value) => handleFilterChange('accessPattern', value)}
                placeholder="Select access pattern"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Last Login
              </label>
              <Select
                options={lastLoginOptions}
                value={filters?.lastLogin}
                onChange={(value) => handleFilterChange('lastLogin', value)}
                placeholder="Select time period"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex space-x-3">
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-medium text-foreground mb-4">Role Templates</h3>
            <div className="space-y-3">
              {roleTemplates?.map((template, index) => (
                <div key={index} className="p-3 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-foreground">{template?.name}</h4>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{template?.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {template?.permissions?.slice(0, 2)?.map((permission, idx) => (
                      <span key={idx} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        {permission}
                      </span>
                    ))}
                    {template?.permissions?.length > 2 && (
                      <span className="text-xs text-muted-foreground px-2 py-1">
                        +{template?.permissions?.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Permission Presets */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-medium text-foreground mb-4">Permission Presets</h3>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start" iconName="Shield">
                Security Admin
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" iconName="DollarSign">
                Cost Manager
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" iconName="BarChart3">
                Analytics Viewer
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" iconName="Settings">
                System Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;