import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SubscriptionEditModal = ({ 
  isOpen, 
  onClose, 
  subscription, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    applicationName: '',
    vendor: '',
    licenseCount: 0,
    costPerLicense: 0,
    renewalDate: '',
    category: '',
    status: 'active'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Status options
  const statusOptions = [
    { value: 'active', label: 'Active', color: 'text-success' },
    { value: 'expiring', label: 'Expiring', color: 'text-warning' },
    { value: 'underutilized', label: 'Underutilized', color: 'text-orange-500' },
    { value: 'inactive', label: 'Inactive', color: 'text-error' }
  ];

  // Category options
  const categoryOptions = [
    'CRM',
    'Productivity',
    'Communication',
    'Design',
    'Project Management',
    'Development',
    'Analytics',
    'Security',
    'Marketing',
    'HR',
    'Finance',
    'Other'
  ];

  useEffect(() => {
    if (subscription && isOpen) {
      setFormData({
        applicationName: subscription?.applicationName || '',
        vendor: subscription?.vendor || '',
        licenseCount: subscription?.licenseCount || 0,
        costPerLicense: subscription?.costPerLicense || 0,
        renewalDate: subscription?.renewalDate || '',
        category: subscription?.category || '',
        status: subscription?.status || 'active'
      });
      setErrors({});
    }
  }, [subscription, isOpen]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date?.toISOString()?.split('T')?.[0] || '';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.applicationName?.trim()) {
      newErrors.applicationName = 'Application name is required';
    }

    if (!formData?.vendor?.trim()) {
      newErrors.vendor = 'Vendor is required';
    }

    if (!formData?.licenseCount || formData?.licenseCount <= 0) {
      newErrors.licenseCount = 'License count must be greater than 0';
    }

    if (!formData?.costPerLicense || formData?.costPerLicense <= 0) {
      newErrors.costPerLicense = 'Cost per license must be greater than 0';
    }

    if (!formData?.renewalDate) {
      newErrors.renewalDate = 'Renewal date is required';
    } else {
      const renewalDate = new Date(formData?.renewalDate);
      const today = new Date();
      if (renewalDate <= today) {
        newErrors.renewalDate = 'Renewal date must be in the future';
      }
    }

    if (!formData?.category?.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedSubscription = {
        ...subscription,
        ...formData,
        totalCost: formData?.licenseCount * formData?.costPerLicense,
        utilizationRate: subscription?.utilizationRate // Keep existing utilization rate
      };

      onSave?.(updatedSubscription);
      onClose?.();
    } catch (error) {
      console.error('Error saving subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      applicationName: subscription?.applicationName || '',
      vendor: subscription?.vendor || '',
      licenseCount: subscription?.licenseCount || 0,
      costPerLicense: subscription?.costPerLicense || 0,
      renewalDate: subscription?.renewalDate || '',
      category: subscription?.category || '',
      status: subscription?.status || 'active'
    });
    setErrors({});
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Edit" size={18} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Edit Subscription</h2>
              <p className="text-sm text-muted-foreground">
                Modify subscription details for {subscription?.applicationName}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCancel}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Application Name *
                </label>
                <Input
                  type="text"
                  value={formData?.applicationName}
                  onChange={(e) => handleInputChange('applicationName', e?.target?.value)}
                  placeholder="Enter application name"
                  error={errors?.applicationName}
                />
                {errors?.applicationName && (
                  <p className="text-xs text-error">{errors?.applicationName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Vendor *
                </label>
                <Input
                  type="text"
                  value={formData?.vendor}
                  onChange={(e) => handleInputChange('vendor', e?.target?.value)}
                  placeholder="Enter vendor name"
                  error={errors?.vendor}
                />
                {errors?.vendor && (
                  <p className="text-xs text-error">{errors?.vendor}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Category *
                </label>
                <select
                  value={formData?.category}
                  onChange={(e) => handleInputChange('category', e?.target?.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categoryOptions?.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors?.category && (
                  <p className="text-xs text-error">{errors?.category}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Status
                </label>
                <select
                  value={formData?.status}
                  onChange={(e) => handleInputChange('status', e?.target?.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {statusOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* License & Pricing Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">License & Pricing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  License Count *
                </label>
                <Input
                  type="number"
                  min="1"
                  value={formData?.licenseCount}
                  onChange={(e) => handleInputChange('licenseCount', parseInt(e?.target?.value) || 0)}
                  placeholder="Enter license count"
                  error={errors?.licenseCount}
                />
                {errors?.licenseCount && (
                  <p className="text-xs text-error">{errors?.licenseCount}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Cost per License *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData?.costPerLicense}
                    onChange={(e) => handleInputChange('costPerLicense', parseFloat(e?.target?.value) || 0)}
                    placeholder="0.00"
                    className="pl-8"
                    error={errors?.costPerLicense}
                  />
                </div>
                {errors?.costPerLicense && (
                  <p className="text-xs text-error">{errors?.costPerLicense}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Total Monthly Cost
                </label>
                <div className="px-3 py-2 bg-muted/50 border border-input rounded-md text-sm text-muted-foreground">
                  ${((formData?.licenseCount || 0) * (formData?.costPerLicense || 0))?.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Contract Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Contract Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Renewal Date *
                </label>
                <Input
                  type="date"
                  value={formatDateForInput(formData?.renewalDate)}
                  onChange={(e) => handleInputChange('renewalDate', e?.target?.value)}
                  error={errors?.renewalDate}
                />
                {errors?.renewalDate && (
                  <p className="text-xs text-error">{errors?.renewalDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Current Utilization Rate
                </label>
                <div className="flex items-center space-x-3 px-3 py-2 bg-muted/50 border border-input rounded-md">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        subscription?.utilizationRate >= 80 ? 'bg-success' :
                        subscription?.utilizationRate >= 60 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${subscription?.utilizationRate || 0}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {subscription?.utilizationRate || 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-border bg-muted/30">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={handleSave}
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionEditModal;