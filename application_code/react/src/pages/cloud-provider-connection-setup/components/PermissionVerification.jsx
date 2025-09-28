import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const PermissionVerification = ({ provider, credentials, onValidationComplete }) => {
  const [verificationStatus, setVerificationStatus] = useState({});
  const [isVerifying, setIsVerifying] = useState(false);

  const getProviderPermissions = (provider) => {
    switch (provider) {
      case 'aws':
        return [
          {
            id: 'ce_permissions',
            name: 'Cost Explorer Access',
            description: 'ce:GetCostAndUsage, ce:GetUsageReport, ce:ListCostAndUsageSpecifications',
            required: true,
            status: 'pending'
          },
          {
            id: 'cur_permissions',
            name: 'Cost and Usage Reports',
            description: 'cur:DescribeReportDefinitions, cur:GetReportDefinition',
            required: true,
            status: 'pending'
          },
          {
            id: 'organizations',
            name: 'Organizations Access',
            description: 'organizations:ListAccounts, organizations:DescribeAccount',
            required: false,
            status: 'pending'
          },
          {
            id: 'support',
            name: 'Support API',
            description: 'support:DescribeTrustedAdvisor*',
            required: false,
            status: 'pending'
          }
        ];

      case 'azure':
        return [
          {
            id: 'cost_management',
            name: 'Cost Management Reader',
            description: 'Access to cost management APIs and billing data',
            required: true,
            status: 'pending'
          },
          {
            id: 'monitoring',
            name: 'Monitoring Reader',
            description: 'Access to monitoring metrics and logs',
            required: true,
            status: 'pending'
          },
          {
            id: 'subscription_reader',
            name: 'Reader (Subscription)',
            description: 'Basic read access to subscription resources',
            required: true,
            status: 'pending'
          },
          {
            id: 'resource_graph',
            name: 'Resource Graph Reader',
            description: 'Access to Azure Resource Graph for resource queries',
            required: false,
            status: 'pending'
          }
        ];

      case 'gcp':
        return [
          {
            id: 'billing_viewer',
            name: 'Billing Account Viewer',
            description: 'Access to billing account and cost data',
            required: true,
            status: 'pending'
          },
          {
            id: 'cloud_asset_viewer',
            name: 'Cloud Asset Viewer',
            description: 'Access to cloud asset inventory',
            required: true,
            status: 'pending'
          },
          {
            id: 'monitoring_viewer',
            name: 'Monitoring Viewer',
            description: 'Access to monitoring metrics',
            required: true,
            status: 'pending'
          },
          {
            id: 'compute_viewer',
            name: 'Compute Viewer',
            description: 'Access to compute resources and usage data',
            required: false,
            status: 'pending'
          }
        ];

      default:
        return [];
    }
  };

  const [permissions] = useState(getProviderPermissions(provider));

  const verifyPermissions = async () => {
    setIsVerifying(true);
    const newStatus = {};

    // Simulate permission verification
    for (const permission of permissions) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock verification logic - in real app this would test actual permissions
      const hasPermission = Math.random() > 0.2; // 80% success rate
      newStatus[permission.id] = hasPermission ? 'success' : 'error';
    }

    setVerificationStatus(newStatus);
    setIsVerifying(false);

    // Report back to parent
    const hasAllRequired = permissions?.filter(p => p?.required)?.every(p => newStatus?.[p?.id] === 'success');

    if (onValidationComplete) {
      onValidationComplete({
        success: hasAllRequired,
        permissions: newStatus,
        provider
      });
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'error':
        return { icon: 'XCircle', color: 'text-error' };
      case 'pending':
        return { icon: 'Clock', color: 'text-warning' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const copyPermissionCommand = () => {
    let command = '';
    
    switch (provider) {
      case 'aws':
        command = `{
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
}`;
        break;
      case 'azure':
        command = `az role assignment create \\
  --assignee <service-principal-id> \\
  --role "Cost Management Reader" \ --scope"/subscriptions/<subscription-id>"`;
        break;
      case 'gcp':
        command = `gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" \\
  --role="roles/billing.viewer"`;
        break;
    }

    navigator.clipboard?.writeText(command);
  };

  return (
    <div className="space-y-6">
      <div className="text-center pb-4 border-b border-border">
        <h3 className="text-lg font-medium text-foreground mb-2">
          Verify {provider?.toUpperCase()} Permissions
        </h3>
        <p className="text-sm text-muted-foreground">
          We'll check if your credentials have the required permissions for cost optimization
        </p>
      </div>
      {/* Permission Check Button */}
      {Object.keys(verificationStatus)?.length === 0 && (
        <div className="text-center">
          <Button
            variant="primary"
            onClick={verifyPermissions}
            loading={isVerifying}
            iconName="Shield"
            iconPosition="left"
          >
            {isVerifying ? 'Verifying Permissions...' : 'Check Permissions'}
          </Button>
        </div>
      )}
      {/* Permissions List */}
      <div className="space-y-4">
        {permissions?.map((permission) => {
          const status = verificationStatus?.[permission?.id] || 'pending';
          const statusInfo = getStatusIcon(status);

          return (
            <div
              key={permission?.id}
              className={cn(
                "p-4 border rounded-lg transition-all",
                status === 'success' ? "border-success/20 bg-success/5" :
                status === 'error' ? "border-error/20 bg-error/5": "border-border"
              )}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {isVerifying && verificationStatus?.[permission?.id] === undefined ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Icon 
                      name={statusInfo?.icon} 
                      size={16} 
                      className={statusInfo?.color}
                    />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{permission?.name}</h4>
                    {permission?.required && (
                      <span className="px-2 py-1 text-xs bg-error/10 text-error rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {permission?.description}
                  </p>
                  
                  {status === 'error' && (
                    <div className="mt-2 text-xs text-error">
                      Permission not found or access denied
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Permission Setup Guide */}
      {Object.keys(verificationStatus)?.length > 0 && Object.values(verificationStatus)?.some(s => s === 'error') && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-foreground">Permission Setup</h4>
            <Button
              variant="outline"
              size="xs"
              iconName="Copy"
              iconPosition="left"
              onClick={copyPermissionCommand}
            >
              Copy Command
            </Button>
          </div>
          
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Some permissions are missing. Use the command below to grant required permissions:
            </p>
            
            <div className="bg-muted/50 p-3 rounded border font-mono text-xs overflow-x-auto">
              {provider === 'aws' && 'Attach the IAM policy shown above to your user/role'}
              {provider === 'azure' && 'Run Azure CLI command to assign roles'}
              {provider === 'gcp' && 'Use gcloud CLI to grant IAM roles'}
            </div>
          </div>
        </div>
      )}
      {/* Success Summary */}
      {Object.keys(verificationStatus)?.length > 0 && Object.values(verificationStatus)?.every(s => s === 'success') && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <div>
              <h4 className="font-medium text-success">All Permissions Verified</h4>
              <p className="text-xs text-success/80 mt-1">
                Your credentials have all the required permissions for cost optimization
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionVerification;