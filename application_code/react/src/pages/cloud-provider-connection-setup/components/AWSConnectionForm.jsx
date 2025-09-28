import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const AWSConnectionForm = ({ credentials, onChange, error }) => {
  const [authMethod, setAuthMethod] = useState(credentials?.authMethod || 'access_keys');
  const [showSecretKey, setShowSecretKey] = useState(false);

  const authMethods = [
    {
      id: 'access_keys',
      title: 'Access Keys',
      description: 'Use AWS Access Key ID and Secret Access Key',
      icon: 'Key',
      recommended: false
    },
    {
      id: 'iam_role',
      title: 'IAM Role (Recommended)',
      description: 'Cross-account IAM role for secure access',
      icon: 'Shield',
      recommended: true
    },
    {
      id: 'assume_role',
      title: 'Assume Role',
      description: 'Assume an IAM role with STS',
      icon: 'UserCheck',
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

  const renderAccessKeysForm = () => (
    <div className="space-y-4">
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-warning">Security Notice</h4>
            <p className="text-xs text-warning/80 mt-1">
              Access keys provide full programmatic access. Consider using IAM roles for enhanced security.
            </p>
          </div>
        </div>
      </div>

      <Input
        label="Access Key ID"
        placeholder="AKIA..."
        value={credentials?.accessKeyId || ''}
        onChange={(e) => handleInputChange('accessKeyId', e?.target?.value)}
        required
      />

      <div className="relative">
        <Input
          label="Secret Access Key"
          type={showSecretKey ? 'text' : 'password'}
          placeholder="Enter secret access key"
          value={credentials?.secretAccessKey || ''}
          onChange={(e) => handleInputChange('secretAccessKey', e?.target?.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowSecretKey(!showSecretKey)}
          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
        >
          <Icon name={showSecretKey ? 'EyeOff' : 'Eye'} size={16} />
        </button>
      </div>

      <Input
        label="Default Region (Optional)"
        placeholder="us-east-1"
        value={credentials?.region || ''}
        onChange={(e) => handleInputChange('region', e?.target?.value)}
      />
    </div>
  );

  const renderIAMRoleForm = () => (
    <div className="space-y-4">
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-success mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-success">Recommended Method</h4>
            <p className="text-xs text-success/80 mt-1">
              IAM roles provide secure, temporary credentials without storing long-term access keys.
            </p>
          </div>
        </div>
      </div>

      <Input
        label="Role ARN"
        placeholder="arn:aws:iam::123456789012:role/FinOpsRole"
        value={credentials?.roleArn || ''}
        onChange={(e) => handleInputChange('roleArn', e?.target?.value)}
        required
      />

      <Input
        label="External ID (Optional)"
        placeholder="unique-external-id"
        description="Additional security measure for cross-account access"
        value={credentials?.externalId || ''}
        onChange={(e) => handleInputChange('externalId', e?.target?.value)}
      />

      {/* IAM Policy Template */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Required IAM Policy</h4>
          <Button
            variant="outline"
            size="xs"
            iconName="Copy"
            iconPosition="left"
            onClick={() => copyToClipboard(JSON.stringify({
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": [
                    "ce:*",
                    "cur:*",
                    "organizations:ListAccounts",
                    "organizations:DescribeAccount",
                    "support:DescribeTrustedAdvisor*"
                  ],
                  "Resource": "*"
                }
              ]
            }, null, 2))}
          >
            Copy Policy
          </Button>
        </div>
        <pre className="text-xs text-muted-foreground bg-muted/50 p-3 rounded border overflow-x-auto">
{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ce:*",
        "cur:*",
        "organizations:ListAccounts"
      ],
      "Resource": "*"
    }
  ]
}`}
        </pre>
      </div>
    </div>
  );

  const renderAssumeRoleForm = () => (
    <div className="space-y-4">
      <Input
        label="Role ARN to Assume"
        placeholder="arn:aws:iam::123456789012:role/AssumeRole"
        value={credentials?.assumeRoleArn || ''}
        onChange={(e) => handleInputChange('assumeRoleArn', e?.target?.value)}
        required
      />

      <Input
        label="Session Name"
        placeholder="finops-session"
        value={credentials?.sessionName || ''}
        onChange={(e) => handleInputChange('sessionName', e?.target?.value)}
        required
      />

      <Input
        label="Base Access Key ID"
        placeholder="AKIA..."
        value={credentials?.baseAccessKeyId || ''}
        onChange={(e) => handleInputChange('baseAccessKeyId', e?.target?.value)}
        required
      />

      <Input
        label="Base Secret Access Key"
        type={showSecretKey ? 'text' : 'password'}
        placeholder="Enter base secret access key"
        value={credentials?.baseSecretAccessKey || ''}
        onChange={(e) => handleInputChange('baseSecretAccessKey', e?.target?.value)}
        required
      />
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
      {authMethod === 'access_keys' && renderAccessKeysForm()}
      {authMethod === 'iam_role' && renderIAMRoleForm()}
      {authMethod === 'assume_role' && renderAssumeRoleForm()}

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

export default AWSConnectionForm;