import React, { useState, useRef } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const GCPConnectionForm = ({ credentials, onChange, error }) => {
  const [authMethod, setAuthMethod] = useState(credentials?.authMethod || 'service_account');
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const authMethods = [
    {
      id: 'service_account',
      title: 'Service Account Key',
      description: 'Upload JSON key file from service account',
      icon: 'FileText',
      recommended: true
    },
    {
      id: 'oauth',
      title: 'OAuth 2.0',
      description: 'User account OAuth authentication',
      icon: 'Globe',
      recommended: false
    }
  ];

  const handleAuthMethodChange = (method) => {
    setAuthMethod(method);
    onChange({ authMethod: method });
  };

  const handleInputChange = (field, value) => {
    onChange({ 
      ...credentials, 
      authMethod,
      [field]: value 
    });
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file && file?.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonContent = JSON.parse(e?.target?.result);
          setUploadedFile(file);
          handleInputChange('serviceAccountKey', jsonContent);
          handleInputChange('projectId', jsonContent?.project_id);
        } catch (error) {
          console.error('Invalid JSON file:', error);
        }
      };
      reader?.readAsText(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    handleInputChange('serviceAccountKey', null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  const renderServiceAccountForm = () => (
    <div className="space-y-4">
      <div className="bg-info/10 border border-info/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-info mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-info">Service Account Setup</h4>
            <p className="text-xs text-info/80 mt-1">
              Create a service account in Google Cloud Console with billing and monitoring permissions.
            </p>
          </div>
        </div>
      </div>

      <Input
        label="Project ID"
        placeholder="my-gcp-project-123456"
        value={credentials?.projectId || ''}
        onChange={(e) => handleInputChange('projectId', e?.target?.value)}
        required
      />

      {/* File Upload */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Service Account Key File *
        </label>
        
        {!uploadedFile ? (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
              "border-border hover:border-primary/50 hover:bg-primary/5"
            )}
            onClick={() => fileInputRef?.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="space-y-2">
              <Icon name="Upload" size={24} className="text-muted-foreground mx-auto" />
              <div className="text-sm text-foreground">
                Click to upload service account JSON file
              </div>
              <div className="text-xs text-muted-foreground">
                Only .json files are accepted
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={16} className="text-success" />
                <div>
                  <div className="text-sm font-medium text-success">{uploadedFile?.name}</div>
                  <div className="text-xs text-success/80">
                    Project: {credentials?.serviceAccountKey?.project_id}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={removeFile}
                className="text-muted-foreground hover:text-foreground"
              />
            </div>
          </div>
        )}
      </div>

      {/* Service Account Creation Guide */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Create Service Account</h4>
          <Button
            variant="outline"
            size="xs"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => window.open('https://console.cloud.google.com/iam-admin/serviceaccounts', '_blank')}
          >
            Open Console
          </Button>
        </div>
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            1. Go to Google Cloud Console → IAM & Admin → Service Accounts
          </div>
          <div className="text-xs text-muted-foreground">
            2. Create a new service account with the following roles:
          </div>
          <div className="pl-4 space-y-1">
            {[
              'Billing Account Viewer',
              'Cloud Asset Viewer',
              'Monitoring Viewer',
              'Compute Viewer'
            ]?.map((role, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs">
                <Icon name="CheckCircle" size={12} className="text-success" />
                <span className="text-muted-foreground">{role}</span>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            3. Create and download the JSON key file
          </div>
        </div>
      </div>
    </div>
  );

  const renderOAuthForm = () => (
    <div className="space-y-4">
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-warning">OAuth Authentication</h4>
            <p className="text-xs text-warning/80 mt-1">
              OAuth requires user interaction and may have limited permissions compared to service accounts.
            </p>
          </div>
        </div>
      </div>

      <Input
        label="Project ID"
        placeholder="my-gcp-project-123456"
        value={credentials?.projectId || ''}
        onChange={(e) => handleInputChange('projectId', e?.target?.value)}
        required
      />

      <Input
        label="Client ID"
        placeholder="123456789-abcdefg.apps.googleusercontent.com"
        value={credentials?.clientId || ''}
        onChange={(e) => handleInputChange('clientId', e?.target?.value)}
        required
      />

      <Input
        label="Client Secret"
        type="password"
        placeholder="Enter OAuth client secret"
        value={credentials?.clientSecret || ''}
        onChange={(e) => handleInputChange('clientSecret', e?.target?.value)}
        required
      />

      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-3">OAuth Setup</h4>
        <div className="space-y-2 text-xs text-muted-foreground">
          <div>1. Go to Google Cloud Console → APIs & Services → Credentials</div>
          <div>2. Create OAuth 2.0 Client IDs</div>
          <div>3. Configure authorized redirect URIs</div>
          <div>4. Enable required APIs: Cloud Billing API, Cloud Asset API</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Authentication Method Selection */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Authentication Method</h4>
        <div className="grid grid-cols-1 gap-3">
          {authMethods?.map((method) => (
            <div
              key={method?.id}
              className={cn(
                "relative p-4 border rounded-lg cursor-pointer transition-all",
                authMethod === method?.id
                  ? "border-primary bg-primary/5" :"border-border hover:border-primary/50"
              )}
              onClick={() => handleAuthMethodChange(method?.id)}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="authMethod"
                  checked={authMethod === method?.id}
                  onChange={() => handleAuthMethodChange(method?.id)}
                  className="sr-only"
                />
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  method?.recommended ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                )}>
                  <Icon name={method?.icon} size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-foreground">{method?.title}</h5>
                    {method?.recommended && (
                      <span className="px-2 py-1 text-xs bg-success/10 text-success rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{method?.description}</p>
                </div>
                {authMethod === method?.id && (
                  <Icon name="CheckCircle" size={16} className="text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Form Based on Auth Method */}
      {authMethod === 'service_account' && renderServiceAccountForm()}
      {authMethod === 'oauth' && renderOAuthForm()}

      {/* Error Display */}
      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="XCircle" size={16} className="text-error mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-error">Connection Error</h4>
              <p className="text-xs text-error/80 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GCPConnectionForm;