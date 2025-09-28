import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const AzureConnectionForm = ({ credentials, onChange, error }) => {
  const [authMethod, setAuthMethod] = useState(credentials?.authMethod || 'service_principal');
  const [showSecret, setShowSecret] = useState(false);

  const authMethods = [
    {
      id: 'service_principal',
      title: 'Service Principal',
      description: 'Application ID and client secret authentication',
      icon: 'UserCheck',
      recommended: true
    },
    {
      id: 'managed_identity',
      title: 'Managed Identity',
      description: 'System or user-assigned managed identity',
      icon: 'Shield',
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

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  const renderServicePrincipalForm = () => (
    <div className="space-y-4">
      <div className="bg-info/10 border border-info/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-info mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-info">Service Principal Setup</h4>
            <p className="text-xs text-info/80 mt-1">
              Create a service principal in Azure AD with appropriate permissions for cost management.
            </p>
          </div>
        </div>
      </div>

      <Input
        label="Tenant ID"
        placeholder="12345678-1234-1234-1234-123456789012"
        value={credentials?.tenantId || ''}
        onChange={(e) => handleInputChange('tenantId', e?.target?.value)}
        required
      />

      <Input
        label="Application (Client) ID"
        placeholder="87654321-4321-4321-4321-210987654321"
        value={credentials?.clientId || ''}
        onChange={(e) => handleInputChange('clientId', e?.target?.value)}
        required
      />

      <div className="relative">
        <Input
          label="Client Secret"
          type={showSecret ? 'text' : 'password'}
          placeholder="Enter client secret"
          value={credentials?.clientSecret || ''}
          onChange={(e) => handleInputChange('clientSecret', e?.target?.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowSecret(!showSecret)}
          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
        >
          <Icon name={showSecret ? 'EyeOff' : 'Eye'} size={16} />
        </button>
      </div>

      <Input
        label="Subscription ID"
        placeholder="11111111-1111-1111-1111-111111111111"
        value={credentials?.subscriptionId || ''}
        onChange={(e) => handleInputChange('subscriptionId', e?.target?.value)}
        required
      />

      {/* Azure CLI Command Helper */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Service Principal Creation</h4>
          <Button
            variant="outline"
            size="xs"
            iconName="Copy"
            iconPosition="left"
            onClick={() => copyToClipboard('az ad sp create-for-rbac --name "finops-service-principal" --role "Cost Management Reader" --scopes "/subscriptions/YOUR_SUBSCRIPTION_ID"')}
          >
            Copy Command
          </Button>
        </div>
        <pre className="text-xs text-muted-foreground bg-muted/50 p-3 rounded border overflow-x-auto">
{`az ad sp create-for-rbac \\
  --name "finops-service-principal" \ --role"Cost Management Reader"\ --scopes"/subscriptions/YOUR_SUBSCRIPTION_ID"`}
        </pre>
      </div>

      {/* Required Permissions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Required Permissions</h4>
        <div className="space-y-2">
          {[
            'Cost Management Reader',
            'Monitoring Reader',
            'Reader (on subscription)'
          ]?.map((permission, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <Icon name="CheckCircle" size={14} className="text-success" />
              <span className="text-muted-foreground">{permission}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderManagedIdentityForm = () => (
    <div className="space-y-4">
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-warning">Managed Identity</h4>
            <p className="text-xs text-warning/80 mt-1">
              This method requires the application to be running within Azure infrastructure.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Identity Type</label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="system_assigned"
                name="identityType"
                value="system_assigned"
                checked={credentials?.identityType === 'system_assigned'}
                onChange={(e) => handleInputChange('identityType', e?.target?.value)}
                className="w-4 h-4 text-primary"
              />
              <label htmlFor="system_assigned" className="text-sm text-foreground">
                System-assigned managed identity
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="user_assigned"
                name="identityType"
                value="user_assigned"
                checked={credentials?.identityType === 'user_assigned'}
                onChange={(e) => handleInputChange('identityType', e?.target?.value)}
                className="w-4 h-4 text-primary"
              />
              <label htmlFor="user_assigned" className="text-sm text-foreground">
                User-assigned managed identity
              </label>
            </div>
          </div>
        </div>

        {credentials?.identityType === 'user_assigned' && (
          <Input
            label="Client ID (User-assigned)"
            placeholder="87654321-4321-4321-4321-210987654321"
            value={credentials?.userAssignedClientId || ''}
            onChange={(e) => handleInputChange('userAssignedClientId', e?.target?.value)}
            required
          />
        )}

        <Input
          label="Subscription ID"
          placeholder="11111111-1111-1111-1111-111111111111"
          value={credentials?.subscriptionId || ''}
          onChange={(e) => handleInputChange('subscriptionId', e?.target?.value)}
          required
        />
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
      {authMethod === 'service_principal' && renderServicePrincipalForm()}
      {authMethod === 'managed_identity' && renderManagedIdentityForm()}

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

export default AzureConnectionForm;