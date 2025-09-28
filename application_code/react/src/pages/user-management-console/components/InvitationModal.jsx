import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const InvitationModal = ({ isOpen, onClose, onInvite }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    department: '',
    customMessage: ''
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const roleOptions = [
    { value: 'Executive Level', label: 'Executive Level (CFO, CTO)' },
    { value: 'Management Level', label: 'Management Level (FinOps Manager, Engineering Manager)' },
    { value: 'Operational Level', label: 'Operational Level (DevOps Engineer, Cloud Architect)' },
    { value: 'Analyst Level', label: 'Analyst Level (FinOps Analyst, Business Analyst)' },
    { value: 'Read-Only Access', label: 'Read-Only Access (Stakeholder/Viewer)' }
  ];

  const departmentOptions = [
    { value: 'Finance', label: 'Finance' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Product', label: 'Product' },
    { value: 'IT', label: 'IT' },
    { value: 'Executive', label: 'Executive' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
      await onInvite(formData);
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        department: '',
        customMessage: ''
      });
      setStep(1);
      onClose();
    } catch (error) {
      console.error('Error sending invitation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      role: '',
      department: '',
      customMessage: ''
    });
    setStep(1);
    onClose();
  };

  const isStep1Valid = formData?.email && formData?.firstName && formData?.lastName;
  const isStep2Valid = formData?.role && formData?.department;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <div 
          className="bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={e => e?.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="UserPlus" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Invite New User</h2>
                <p className="text-sm text-muted-foreground">
                  Step {step} of 2: {step === 1 ? 'User Information' : 'Role & Permissions'}
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
                <span className="text-sm font-medium">User Info</span>
              </div>
              <div className={`flex-1 h-px ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium">Role & Permissions</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        First Name *
                      </label>
                      <Input
                        type="text"
                        value={formData?.firstName}
                        onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Last Name *
                      </label>
                      <Input
                        type="text"
                        value={formData?.lastName}
                        onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData?.email}
                      onChange={(e) => handleInputChange('email', e?.target?.value)}
                      placeholder="user@company.com"
                      iconName="Mail"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      An invitation email will be sent to this address
                    </p>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Role Level *
                    </label>
                    <Select
                      options={roleOptions}
                      value={formData?.role}
                      onChange={(value) => handleInputChange('role', value)}
                      placeholder="Select role level"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Determines access permissions and capabilities within the platform
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Department *
                    </label>
                    <Select
                      options={departmentOptions}
                      value={formData?.department}
                      onChange={(value) => handleInputChange('department', value)}
                      placeholder="Select department"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Custom Welcome Message
                    </label>
                    <textarea
                      value={formData?.customMessage}
                      onChange={(e) => handleInputChange('customMessage', e?.target?.value)}
                      placeholder="Add a personal welcome message (optional)"
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This message will be included in the invitation email
                    </p>
                  </div>

                  {/* Permission Preview */}
                  {formData?.role && (
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-foreground mb-3">
                        <Icon name="Shield" size={16} className="inline mr-2" />
                        Permission Preview
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={16} className="text-success" />
                          <span className="text-sm text-foreground">Dashboard Access</span>
                        </div>
                        {(formData?.role === 'Executive Level' || formData?.role === 'Management Level') && (
                          <div className="flex items-center space-x-2">
                            <Icon name="CheckCircle" size={16} className="text-success" />
                            <span className="text-sm text-foreground">Budget Management</span>
                          </div>
                        )}
                        {formData?.role !== 'Read-Only Access' && (
                          <div className="flex items-center space-x-2">
                            <Icon name="CheckCircle" size={16} className="text-success" />
                            <span className="text-sm text-foreground">Cost Analysis</span>
                          </div>
                        )}
                        {formData?.role === 'Executive Level' && (
                          <div className="flex items-center space-x-2">
                            <Icon name="CheckCircle" size={16} className="text-success" />
                            <span className="text-sm text-foreground">Administrative Functions</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Info" size={16} />
                <span>User will receive an email invitation to set up their account</span>
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
                    iconName="Send"
                    iconPosition="left"
                    loading={loading}
                    disabled={!isStep2Valid}
                  >
                    Send Invitation
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

export default InvitationModal;