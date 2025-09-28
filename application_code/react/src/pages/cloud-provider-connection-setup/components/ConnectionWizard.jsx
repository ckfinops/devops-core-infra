import React, { useState } from 'react';
import AWSConnectionForm from './AWSConnectionForm';
import AzureConnectionForm from './AzureConnectionForm';
import GCPConnectionForm from './GCPConnectionForm';
import PermissionVerification from './PermissionVerification';
import ConnectionValidation from './ConnectionValidation';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const ConnectionWizard = ({ 
  provider, 
  step, 
  connection, 
  validationError, 
  isValidating, 
  onNext, 
  onPrevious, 
  onSave 
}) => {
  const [credentials, setCredentials] = useState({});
  const [validationResults, setValidationResults] = useState(null);

  const steps = [
    { id: 0, title: 'Authentication', icon: 'Key' },
    { id: 1, title: 'Permissions', icon: 'Shield' },
    { id: 2, title: 'Validation', icon: 'CheckCircle' }
  ];

  const handleCredentialsChange = (newCredentials) => {
    setCredentials(prev => ({ ...prev, ...newCredentials }));
  };

  const handleValidation = async () => {
    const result = await onSave(provider, credentials);
    setValidationResults(result);
    if (result?.success) {
      onNext();
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        // Authentication Step
        return (
          <div className="space-y-6">
            <div className="text-center pb-4 border-b border-border">
              <h3 className="text-lg font-medium text-foreground mb-2">
                Configure {provider?.toUpperCase()} Authentication
              </h3>
              <p className="text-sm text-muted-foreground">
                {provider === 'aws' && 'Enter your AWS credentials or IAM role information'}
                {provider === 'azure' && 'Provide Azure service principal details'}
                {provider === 'gcp' && 'Upload your GCP service account JSON file'}
              </p>
            </div>

            {provider === 'aws' && (
              <AWSConnectionForm
                credentials={credentials}
                onChange={handleCredentialsChange}
                error={validationError}
              />
            )}
            {provider === 'azure' && (
              <AzureConnectionForm
                credentials={credentials}
                onChange={handleCredentialsChange}
                error={validationError}
              />
            )}
            {provider === 'gcp' && (
              <GCPConnectionForm
                credentials={credentials}
                onChange={handleCredentialsChange}
                error={validationError}
              />
            )}

            <div className="flex justify-end space-x-3 pt-4 border-t border-border">
              <Button
                variant="primary"
                onClick={onNext}
                disabled={!credentials || Object.keys(credentials)?.length === 0}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Next: Verify Permissions
              </Button>
            </div>
          </div>
        );

      case 1:
        // Permissions Step
        return (
          <div className="space-y-6">
            <PermissionVerification 
              provider={provider}
              credentials={credentials}
              onValidationComplete={setValidationResults}
            />

            <div className="flex justify-between pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={onPrevious}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={onNext}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Next: Test Connection
              </Button>
            </div>
          </div>
        );

      case 2:
        // Validation Step
        return (
          <div className="space-y-6">
            <ConnectionValidation
              provider={provider}
              credentials={credentials}
              connection={connection}
              isValidating={isValidating}
              validationError={validationError}
              onValidate={handleValidation}
            />

            <div className="flex justify-between pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={onPrevious}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back
              </Button>
              {!connection?.connected && (
                <Button
                  variant="success"
                  onClick={handleValidation}
                  loading={isValidating}
                  iconName="CheckCircle"
                  iconPosition="left"
                >
                  Test & Save Connection
                </Button>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Progress */}
      <div className="flex items-center justify-center space-x-4 pb-6 border-b border-border">
        {steps?.map((stepItem, index) => {
          const isActive = step === stepItem?.id;
          const isCompleted = step > stepItem?.id;
          const isAccessible = step >= stepItem?.id;

          return (
            <div key={stepItem?.id} className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                  isCompleted
                    ? "bg-success text-success-foreground"
                    : isActive
                    ? "bg-primary text-primary-foreground"
                    : isAccessible
                    ? "bg-muted text-muted-foreground border border-border"
                    : "bg-muted/50 text-muted-foreground/50"
                )}>
                  {isCompleted ? (
                    <Icon name="Check" size={14} />
                  ) : (
                    <Icon name={stepItem?.icon} size={14} />
                  )}
                </div>
                <div className="text-sm font-medium">
                  <div className={cn(
                    isActive ? "text-foreground" : 
                    isCompleted ? "text-success": "text-muted-foreground"
                  )}>
                    {stepItem?.title}
                  </div>
                </div>
              </div>
              
              {index < steps?.length - 1 && (
                <div className={cn(
                  "w-12 h-px mx-4 transition-colors",
                  isCompleted ? "bg-success" : "bg-border"
                )}></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default ConnectionWizard;