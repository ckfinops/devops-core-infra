import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityCompliance = () => {
  const securityFeatures = [
    {
      title: 'Encrypted Storage',
      description: 'All credentials encrypted in AWS Parameter Store',
      status: 'active',
      icon: 'Lock'
    },
    {
      title: 'IAM Role-based Access',
      description: 'Secure cross-account access without keys',
      status: 'recommended',
      icon: 'Shield'
    },
    {
      title: 'Credential Rotation',
      description: 'Automatic key rotation every 90 days',
      status: 'active',
      icon: 'RefreshCw'
    },
    {
      title: 'Access Monitoring',
      description: 'CloudTrail logs for all credential usage',
      status: 'active',
      icon: 'Eye'
    },
    {
      title: 'Least Privilege',
      description: 'Minimal required permissions only',
      status: 'active',
      icon: 'Users'
    },
    {
      title: 'Multi-Factor Auth',
      description: 'MFA required for sensitive operations',
      status: 'warning',
      icon: 'Smartphone'
    }
  ];

  const complianceStandards = [
    {
      name: 'SOC 2 Type II',
      status: 'compliant',
      description: 'Security and availability controls'
    },
    {
      name: 'ISO 27001',
      status: 'compliant',
      description: 'Information security management'
    },
    {
      name: 'GDPR',
      status: 'compliant',
      description: 'Data protection and privacy'
    },
    {
      name: 'HIPAA',
      status: 'partial',
      description: 'Healthcare data protection'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': case'compliant':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'recommended': case'partial':
        return { icon: 'AlertTriangle', color: 'text-warning' };
      case 'warning':
        return { icon: 'AlertCircle', color: 'text-destructive' };
      default:
        return { icon: 'HelpCircle', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Security Features</h3>
          <Icon name="Shield" size={20} className="text-primary" />
        </div>

        <div className="space-y-3">
          {securityFeatures?.map((feature, index) => {
            const statusInfo = getStatusIcon(feature?.status);
            
            return (
              <div key={index} className="flex items-start space-x-3">
                <Icon name={feature?.icon} size={16} className="text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">{feature?.title}</h4>
                    <Icon name={statusInfo?.icon} size={14} className={statusInfo?.color} />
                  </div>
                  <p className="text-xs text-muted-foreground">{feature?.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="Settings" size={14} className="mr-2" />
            Configure Security Settings
          </Button>
        </div>
      </div>
      {/* Compliance Standards */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Compliance</h3>
          <Icon name="Award" size={20} className="text-primary" />
        </div>

        <div className="space-y-3">
          {complianceStandards?.map((standard, index) => {
            const statusInfo = getStatusIcon(standard?.status);
            
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground">{standard?.name}</h4>
                  <p className="text-xs text-muted-foreground">{standard?.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name={statusInfo?.icon} size={14} className={statusInfo?.color} />
                  <span className={`text-xs ${statusInfo?.color}`}>
                    {standard?.status === 'compliant' ? 'Compliant' : 
                     standard?.status === 'partial' ? 'Partial' : 'Review'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="FileText" size={14} className="mr-2" />
            View Compliance Report
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        
        <div className="space-y-2">
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="Download" size={14} className="mr-2" />
            Export Connection Report
          </Button>
          
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="RotateCcw" size={14} className="mr-2" />
            Rotate All Credentials
          </Button>
          
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="Activity" size={14} className="mr-2" />
            Test All Connections
          </Button>
          
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="AlertCircle" size={14} className="mr-2" />
            Security Audit Log
          </Button>
        </div>
      </div>
      {/* AWS Parameter Store Info */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Lock" size={16} className="text-primary" />
          <h4 className="text-sm font-semibold text-primary">Secure Credential Storage</h4>
        </div>
        <p className="text-sm text-primary/80 mb-3">
          All cloud provider credentials are securely stored in AWS Systems Manager Parameter Store 
          with KMS encryption and strict access controls.
        </p>
        <div className="space-y-1 text-xs text-primary/70">
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={12} />
            <span>End-to-end encryption with AWS KMS</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={12} />
            <span>Automatic credential rotation</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={12} />
            <span>Audit trail with CloudTrail</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={12} />
            <span>Role-based access control</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCompliance;