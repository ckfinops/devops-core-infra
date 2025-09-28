import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PermissionMatrix = ({ role, permissions, loading, testingMode }) => {
  const [modifiedPermissions, setModifiedPermissions] = useState({});

  const handlePermissionChange = (featureName, permissionType, value) => {
    if (!testingMode) return;

    setModifiedPermissions(prev => ({
      ...prev,
      [featureName]: {
        ...prev?.[featureName],
        [permissionType]: value
      }
    }));
  };

  const getPermissionValue = (featureName, permissionType) => {
    if (testingMode && modifiedPermissions?.[featureName]?.[permissionType] !== undefined) {
      return modifiedPermissions?.[featureName]?.[permissionType];
    }
    return role?.permissions?.[featureName]?.[permissionType] || false;
  };

  const getPermissionIcon = (hasPermission) => {
    return hasPermission ? 'CheckCircle' : 'XCircle';
  };

  const getPermissionColor = (hasPermission) => {
    return hasPermission ? 'text-success' : 'text-muted-foreground';
  };

  const permissionTypes = [
    { key: 'view', label: 'View', description: 'Can view and read data' },
    { key: 'edit', label: 'Edit', description: 'Can modify and update data' },
    { key: 'delete', label: 'Delete', description: 'Can remove data' },
    { key: 'admin', label: 'Admin', description: 'Full administrative control' }
  ];

  const calculatePermissionScore = () => {
    if (!role?.permissions) return 0;
    
    const totalPermissions = Object.keys(role?.permissions)?.length * 4;
    const grantedPermissions = Object.values(role?.permissions)?.reduce((acc, perms) => {
        return acc + Object.values(perms)?.filter(Boolean)?.length;
      }, 0);
    
    return Math.round((grantedPermissions / totalPermissions) * 100);
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-6 bg-muted rounded w-48 mb-2"></div>
            <div className="h-4 bg-muted rounded w-64"></div>
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(3)]?.map((_, categoryIndex) => (
            <div key={categoryIndex} className="animate-pulse">
              <div className="h-6 bg-muted rounded w-32 mb-4"></div>
              <div className="space-y-3">
                {[...Array(2)]?.map((_, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-4">
                    <div className="w-48 h-4 bg-muted rounded"></div>
                    {[...Array(4)]?.map((_, permIndex) => (
                      <div key={permIndex} className="w-16 h-8 bg-muted rounded"></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-12">
          <Icon name="Shield" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Role</h3>
          <p className="text-muted-foreground">
            Choose a role from the hierarchy to view its permission matrix
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Permission Matrix</h3>
          <p className="text-sm text-muted-foreground">
            Detailed permission configuration for <span className="font-medium text-primary">{role?.name}</span>
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Permission Score: <span className="font-medium text-foreground">{calculatePermissionScore()}%</span>
          </div>
          <Button variant="outline" size="sm" iconName="Copy">
            Clone Permissions
          </Button>
        </div>
      </div>
      {/* Role Information */}
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Shield" size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground mb-1">{role?.name}</h4>
            <p className="text-sm text-muted-foreground mb-2">{role?.description}</p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>{role?.users} assigned user{role?.users !== 1 ? 's' : ''}</span>
              {role?.parent && (
                <span>Inherits from: <span className="font-medium">{role?.parent}</span></span>
              )}
              {role?.conditions?.length > 0 && (
                <span>
                  <Icon name="AlertTriangle" size={12} className="inline mr-1" />
                  {role?.conditions?.length} conditional rule{role?.conditions?.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Permission Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left pb-3 text-sm font-medium text-muted-foreground">
                Feature / Permission Level
              </th>
              {permissionTypes?.map((type) => (
                <th key={type?.key} className="text-center pb-3 text-sm font-medium text-muted-foreground min-w-[100px]">
                  <div className="flex flex-col items-center">
                    <span>{type?.label}</span>
                    <span className="text-xs text-muted-foreground/70 mt-1">{type?.description}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {permissions?.map((category) => (
              <React.Fragment key={category?.category}>
                {/* Category Header */}
                <tr>
                  <td colSpan={5} className="py-4">
                    <h5 className="text-sm font-medium text-foreground bg-muted/20 px-3 py-2 rounded-lg">
                      <Icon name="Folder" size={16} className="inline mr-2" />
                      {category?.category}
                    </h5>
                  </td>
                </tr>
                
                {/* Features */}
                {category?.features?.map((feature) => (
                  <tr key={feature?.name} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3">
                      <div>
                        <div className="text-sm font-medium text-foreground">{feature?.label}</div>
                        <div className="text-xs text-muted-foreground">{feature?.description}</div>
                      </div>
                    </td>
                    {permissionTypes?.map((type) => {
                      const hasPermission = getPermissionValue(feature?.name, type?.key);
                      return (
                        <td key={type?.key} className="py-3 text-center">
                          {testingMode ? (
                            <Checkbox
                              checked={hasPermission}
                              onChange={(checked) => handlePermissionChange(feature?.name, type?.key, checked)}
                              className="mx-auto"
                            />
                          ) : (
                            <Icon
                              name={getPermissionIcon(hasPermission)}
                              size={20}
                              className={`${getPermissionColor(hasPermission)} mx-auto`}
                            />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Conditional Access Rules */}
      {role?.conditions?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">
            <Icon name="Settings" size={16} className="inline mr-2" />
            Conditional Access Rules
          </h4>
          <div className="space-y-2">
            {role?.conditions?.map((condition, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <Icon name="AlertTriangle" size={14} className="text-orange-500" />
                <span className="text-foreground capitalize">
                  {condition?.replace('_', ' ')}
                </span>
                <span className="text-muted-foreground">- Additional security requirement</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Testing Mode Controls */}
      {testingMode && Object.keys(modifiedPermissions)?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border bg-orange-50 -mx-6 -mb-6 px-6 pb-6 rounded-b-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-orange-600" />
              <span className="text-sm font-medium text-orange-800">
                {Object.keys(modifiedPermissions)?.length} permission{Object.keys(modifiedPermissions)?.length !== 1 ? 's' : ''} modified in testing mode
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setModifiedPermissions({})}
              >
                Reset Changes
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Export Test Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionMatrix;