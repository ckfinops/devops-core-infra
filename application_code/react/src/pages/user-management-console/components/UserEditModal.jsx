import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

import { Checkbox } from '../../../components/ui/Checkbox';

const UserEditModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    roleType: '',
    department: '',
    status: '',
    permissions: []
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || '',
        roleType: user?.roleType || '',
        department: user?.department || '',
        status: user?.status || '',
        permissions: user?.permissions || []
      });
    }
  }, [user]);

  const roleOptions = [
    { value: 'Executive Level', label: 'Executive Level' },
    { value: 'Management Level', label: 'Management Level' },
    { value: 'Operational Level', label: 'Operational Level' },
    { value: 'Analyst Level', label: 'Analyst Level' },
    { value: 'Read-Only Access', label: 'Read-Only Access' }
  ];

  const departmentOptions = [
    { value: 'Finance', label: 'Finance' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Product', label: 'Product' },
    { value: 'IT', label: 'IT' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const allPermissions = [
    { id: 'cost_analysis', label: 'Cost Analysis', description: 'View cost analysis reports and dashboards' },
    { id: 'budget_management', label: 'Budget Management', description: 'Create and manage budgets' },
    { id: 'optimization_recommendations', label: 'Optimization Recommendations', description: 'View and implement cost optimization recommendations' },
    { id: 'admin_functions', label: 'Admin Functions', description: 'Full administrative access' },
    { id: 'user_management', label: 'User Management', description: 'Manage user accounts and permissions' },
    { id: 'reporting', label: 'Reporting', description: 'Generate and export reports' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePermissionChange = (permissionId, checked) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev?.permissions, permissionId]
        : prev?.permissions?.filter(p => p !== permissionId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData?.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData?.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      await onSave({
        ...user,
        ...formData
      });
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Edit User</h2>
              <p className="text-muted-foreground text-sm">
                Update user information, role, and permissions
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Full Name"
                    type="text"
                    value={formData?.name}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                    error={errors?.name}
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    value={formData?.email}
                    onChange={(e) => handleInputChange('email', e?.target?.value)}
                    error={errors?.email}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>

            {/* Role and Department */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Role & Department</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Role Level
                  </label>
                  <Select
                    options={roleOptions}
                    value={formData?.role}
                    onChange={(value) => handleInputChange('role', value)}
                    placeholder="Select role level"
                    error={errors?.role}
                  />
                </div>
                
                <div>
                  <Input
                    label="Role Type"
                    type="text"
                    value={formData?.roleType}
                    onChange={(e) => handleInputChange('roleType', e?.target?.value)}
                    placeholder="e.g., CFO, FinOps Manager"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Department
                  </label>
                  <Select
                    options={departmentOptions}
                    value={formData?.department}
                    onChange={(value) => handleInputChange('department', value)}
                    placeholder="Select department"
                    error={errors?.department}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Account Status
                  </label>
                  <Select
                    options={statusOptions}
                    value={formData?.status}
                    onChange={(value) => handleInputChange('status', value)}
                    placeholder="Select status"
                    error={errors?.status}
                  />
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Permissions</h3>
              <p className="text-sm text-muted-foreground">
                Select the permissions this user should have access to
              </p>
              
              <div className="space-y-3">
                {allPermissions?.map((permission) => (
                  <div key={permission?.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                    <Checkbox
                      checked={formData?.permissions?.includes(permission?.id)}
                      onChange={(checked) => handlePermissionChange(permission?.id, checked)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-foreground">
                          {permission?.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {permission?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/10">
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              loading={saving}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;