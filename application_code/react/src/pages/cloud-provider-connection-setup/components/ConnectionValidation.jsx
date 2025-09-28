import React, { useState, useEffect } from 'react';

import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const ConnectionValidation = ({ 
  provider, 
  credentials, 
  connection, 
  isValidating, 
  validationError, 
  onValidate 
}) => {
  const [testResults, setTestResults] = useState(null);
  const [testPhase, setTestPhase] = useState('idle'); // idle, testing, complete

  const testSteps = [
    {
      id: 'auth',
      title: 'Authentication',
      description: 'Verifying credentials and establishing connection'
    },
    {
      id: 'permissions',
      title: 'Permission Check',
      description: 'Testing access to required APIs and resources'
    },
    {
      id: 'data_access',
      title: 'Data Access',
      description: 'Fetching sample cost and usage data'
    },
    {
      id: 'health_check',
      title: 'Health Check',
      description: 'Validating connection stability and response times'
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isValidating && testPhase === 'idle') {
      setTestPhase('testing');
      runConnectionTests();
    }
  }, [isValidating]);

  const runConnectionTests = async () => {
    const results = [];
    
    for (let i = 0; i < testSteps?.length; i++) {
      setCurrentStep(i);
      
      // Simulate API test delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock test result - in real app this would test actual connection
      const success = Math.random() > 0.15; // 85% success rate
      const step = testSteps?.[i];
      
      results?.push({
        ...step,
        success,
        timestamp: new Date(),
        responseTime: Math.floor(Math.random() * 500) + 100,
        details: success ? 
          `${step?.title} completed successfully` :
          `${step?.title} failed - ${getErrorMessage(step?.id)}`
      });

      if (!success) {
        setTestResults(results);
        setTestPhase('complete');
        return;
      }
    }

    setTestResults(results);
    setTestPhase('complete');
  };

  const getErrorMessage = (stepId) => {
    const errorMessages = {
      auth: 'Invalid credentials or authentication failed',
      permissions: 'Insufficient permissions for required APIs',
      data_access: 'Unable to fetch cost data from provider',
      health_check: 'Connection unstable or high response times'
    };
    return errorMessages?.[stepId] || 'Unknown error occurred';
  };

  const getProviderHealthInfo = () => {
    const healthInfo = {
      aws: {
        dataFreshness: '4 hours',
        supportedRegions: 'All AWS regions',
        updateFrequency: 'Daily',
        dataRetention: '13 months'
      },
      azure: {
        dataFreshness: '24 hours',
        supportedRegions: 'All Azure regions',
        updateFrequency: 'Daily',
        dataRetention: '13 months'
      },
      gcp: {
        dataFreshness: '4 hours',
        supportedRegions: 'All GCP regions',
        updateFrequency: 'Daily',
        dataRetention: '13 months'
      }
    };
    return healthInfo?.[provider] || {};
  };

  const healthInfo = getProviderHealthInfo();

  const renderTestProgress = () => {
    if (testPhase === 'idle') return null;

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h4 className="font-medium text-foreground mb-2">Testing Connection</h4>
          <p className="text-sm text-muted-foreground">
            Please wait while we validate your {provider?.toUpperCase()} connection
          </p>
        </div>
        <div className="space-y-3">
          {testSteps?.map((step, index) => {
            const isActive = currentStep === index && testPhase === 'testing';
            const isCompleted = testResults?.find(r => r?.id === step?.id)?.success;
            const hasError = testResults?.find(r => r?.id === step?.id && !r?.success);
            const isPending = index > currentStep;

            return (
              <div
                key={step?.id}
                className={cn(
                  "p-3 border rounded-lg transition-all",
                  isCompleted ? "border-success/20 bg-success/5": hasError ?"border-error/20 bg-error/5": isActive ?"border-primary/20 bg-primary/5": "border-border"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    {isActive ? (
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    ) : isCompleted ? (
                      <Icon name="CheckCircle" size={16} className="text-success" />
                    ) : hasError ? (
                      <Icon name="XCircle" size={16} className="text-error" />
                    ) : (
                      <Icon name="Circle" size={16} className="text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-foreground">{step?.title}</h5>
                      {testResults?.find(r => r?.id === step?.id)?.responseTime && (
                        <span className="text-xs text-muted-foreground">
                          {testResults?.find(r => r?.id === step?.id)?.responseTime}ms
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{step?.description}</p>
                    
                    {hasError && (
                      <div className="mt-1 text-xs text-error">
                        {testResults?.find(r => r?.id === step?.id)?.details}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderConnectionSuccess = () => {
    if (!connection?.connected) return null;

    return (
      <div className="space-y-6">
        <div className="text-center">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {provider?.toUpperCase()} Connected Successfully
          </h3>
          <p className="text-sm text-muted-foreground">
            Your cloud provider is now connected and ready for cost optimization
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(healthInfo)?.map(([key, value]) => (
            <div key={key} className="bg-card border border-border rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1 capitalize">
                {key?.replace(/([A-Z])/g, ' $1')?.replace('_', ' ')}
              </div>
              <div className="text-sm font-medium text-foreground">{value}</div>
            </div>
          ))}
        </div>
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-success mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-success">Next Steps</h4>
              <div className="text-xs text-success/80 mt-1 space-y-1">
                <div>• Cost data will be available within 24 hours</div>
                <div>• Recommendations will be generated based on usage patterns</div>
                <div>• Set up alerts and budgets in the respective sections</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderValidationError = () => {
    if (!validationError) return null;

    return (
      <div className="bg-error/10 border border-error/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="XCircle" size={16} className="text-error mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-error">Connection Failed</h4>
            <p className="text-xs text-error/80 mt-1">{validationError}</p>
            
            <div className="mt-3 space-y-2">
              <div className="text-xs text-error/80 font-medium">Troubleshooting:</div>
              <ul className="text-xs text-error/80 space-y-1 ml-4">
                <li>• Verify credentials are correct and haven't expired</li>
                <li>• Check if required permissions are properly assigned</li>
                <li>• Ensure network connectivity to {provider?.toUpperCase()} APIs</li>
                <li>• Verify project/subscription IDs are accurate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center pb-4 border-b border-border">
        <h3 className="text-lg font-medium text-foreground mb-2">
          Test {provider?.toUpperCase()} Connection
        </h3>
        <p className="text-sm text-muted-foreground">
          Validate credentials and test connectivity to ensure everything works correctly
        </p>
      </div>
      {/* Show connection success if already connected */}
      {connection?.connected && renderConnectionSuccess()}
      {/* Show validation error if present */}
      {validationError && renderValidationError()}
      {/* Show test progress during validation */}
      {isValidating && renderTestProgress()}
      {/* Show test results if completed */}
      {testPhase === 'complete' && testResults && !connection?.connected && (
        <div className="space-y-4">
          <div className="text-center">
            <Icon 
              name={testResults?.every(r => r?.success) ? "CheckCircle" : "XCircle"} 
              size={48} 
              className={cn(
                "mx-auto mb-4",
                testResults?.every(r => r?.success) ? "text-success" : "text-error"
              )} 
            />
            <h4 className="font-medium text-foreground mb-2">
              {testResults?.every(r => r?.success) ? "Connection Test Passed" : "Connection Test Failed"}
            </h4>
          </div>
          
          {renderTestProgress()}
        </div>
      )}
      {/* Idle state - show connection info */}
      {testPhase === 'idle' && !connection?.connected && (
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Zap" size={24} className="text-primary" />
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Ready to Test Connection</h4>
            <p className="text-sm text-muted-foreground">
              Click the button below to validate your {provider?.toUpperCase()} credentials and establish a secure connection
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-2">What we'll test:</h5>
            <div className="grid grid-cols-1 gap-2">
              {testSteps?.map((step) => (
                <div key={step?.id} className="flex items-center space-x-2 text-sm">
                  <Icon name="CheckCircle" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{step?.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionValidation;