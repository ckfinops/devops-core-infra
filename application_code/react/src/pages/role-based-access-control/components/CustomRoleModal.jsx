import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CustomRoleModal = ({ isOpen, onClose, roles, permissions, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parent: '',
    level: 3,
    permissions: {}
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const parentRoleOptions = roles?.map(role => ({
    value: role?.name,
    label: `${role?.name} (Level ${role?.level})`
  })) || [];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePermissionChange = (featureName, permissionType, value) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev?.permissions,
        [featureName]: {
          ...prev?.permissions?.[featureName],
          [permissionType]: value
        }
      }
    }));
  };

  const handleNext = () => {
    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    
    try {
      await onCreate(formData);
      setFormData({
        name: '',
        description: '',
        parent: '',
        level: 3,
        permissions: {}
      });
      setStep(1);
      onClose();
    } catch (error) {
      console.error('Error creating custom role:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      parent: '',
      level: 3,
      permissions: {}
    });
    setStep(1);
    onClose();
  };

  const handleCloneFromTemplate = (templateRole) => {
    const template = roles?.find(role => role?.name === templateRole);
    if (template) {
      setFormData(prev => ({
        ...prev,
        permissions: { ...template?.permissions },
        level: template?.level + 1
      }));
    }
  };

  const isStep1Valid = formData?.name && formData?.description;
  const permissionCount = Object.keys(formData?.permissions)?.reduce((count, feature) => {
    return count + Object.values(formData?.permissions?.[feature])?.filter(Boolean)?.length;
  }, 0);

  const permissionTypes = [
    { key: 'view', label: 'View' },
    { key: 'edit', label: 'Edit' },
    { key: 'delete', label: 'Delete' },
    { key: 'admin', label: 'Admin' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <div 
          className="bg-card rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={e => e?.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Plus" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Create Custom Role</h2>
                <p className="text-sm text-muted-foreground">
                  Step {step} of 2: {step === 1 ? 'Role Information' : 'Permission Configuration'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={handleClose}
            />
          </div>

          {/* Progress Indicator */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {step > 1 ? <Icon name="Check" size={16} /> : '1'}
                </div>
                <span className="text-sm font-medium">Role Details</span>
              </div>
              <div className={`flex-1 h-px ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium">Permissions</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              {step === 1 && (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Role Name *
                    </label>
                    <Input
                      type="text"
                      value={formData?.name}
                      onChange={(e) => handleInputChange('name', e?.target?.value)}
                      placeholder="Enter custom role name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Description *
                    </label>
                    <textarea
                      value={formData?.description}
                      onChange={(e) => handleInputChange('description', e?.target?.value)}
                      placeholder="Describe the role's purpose and responsibilities"
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Parent Role (Optional)
                    </label>
                    <Select
                      options={parentRoleOptions}
                      value={formData?.parent}
                      onChange={(value) => handleInputChange('parent', value)}
                      placeholder="Select parent role for inheritance"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Role will inherit base permissions from parent role
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Role Level
                    </label>
                    <Select
                      options={[
                        { value: 1, label: 'Level 1 - Executive' },
                        { value: 2, label: 'Level 2 - Management' },
                        { value: 3, label: 'Level 3 - Operational' },
                        { value: 4, label: 'Level 4 - Analyst' },
                        { value: 5, label: 'Level 5 - Read-Only' }
                      ]}
                      value={formData?.level}
                      onChange={(value) => handleInputChange('level', value)}
                    />
                  </div>

                  {/* Template Selection */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-foreground mb-3">
                      <Icon name="Copy" size={16} className="inline mr-2" />
                      Quick Start Templates
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {roles?.slice(0, 4)?.map((role) => (
                        <Button
                          key={role?.id}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleCloneFromTemplate(role?.name)}
                          className="justify-start"
                        >
                          <Icon name="Shield" size={14} className="mr-2" />
                          Clone from {role?.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-foreground">
                      Permission Configuration
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {permissionCount} permission{permissionCount !== 1 ? 's' : ''} granted
                    </div>
                  </div>

                  <div className="space-y-6">
                    {permissions?.map((category) => (
                      <div key={category?.category} className="border border-border rounded-lg p-4">
                        <h5 className="text-sm font-medium text-foreground mb-4">
                          <Icon name="Folder" size={16} className="inline mr-2" />
                          {category?.category}
                        </h5>
                        
                        <div className="space-y-4">
                          {category?.features?.map((feature) => (
                            <div key={feature?.name}>
                              <div className="flex items-start space-x-3 mb-3">
                                <div className="flex-1">
                                  <h6 className="text-sm font-medium text-foreground">{feature?.label}</h6>
                                  <p className="text-xs text-muted-foreground">{feature?.description}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {permissionTypes?.map((type) => (
                                  <div key={type?.key} className="flex items-center space-x-2">
                                    <Checkbox
                                      checked={formData?.permissions?.[feature?.name]?.[type?.key] || false}
                                      onChange={(checked) => handlePermissionChange(feature?.name, type?.key, checked)}
                                    />
                                    <span className="text-sm text-foreground">{type?.label}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Info" size={16} />
                <span>
                  {step === 1 ? 'Define role hierarchy and inheritance rules' : 'Configure granular permissions for each feature'}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {step === 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    iconName="ChevronLeft"
                    iconPosition="left"
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                {step === 1 ? (
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    iconName="ChevronRight"
                    iconPosition="right"
                    onClick={handleNext}
                    disabled={!isStep1Valid}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    loading={loading}
                    disabled={permissionCount === 0}
                  >
                    Create Role
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomRoleModal;