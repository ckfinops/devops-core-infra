import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Shield, Key, Settings, TestTube, Copy, Check } from 'lucide-react';

const CognitoSettingsTab = ({ statusData }) => {
  const [copied, setCopied] = useState(null);
  const [settings, setSettings] = useState({
    mfaEnabled: true,
    passwordPolicy: {
      minLength: 8,
      requireNumbers: true,
      requireSpecialChars: true,
      requireUppercase: true,
      requireLowercase: true
    },
    accountRecovery: ['email', 'phone'],
    emailVerification: true,
    phoneVerification: false
  });

  const cognitoConfig = {
    userPoolId: 'us-east-1_oNkz8iV12',
    clientId: '2ov88v081o7g6lgl0t1epq1gj2',
    region: 'us-east-1',
    identityPoolId: 'us-east-1:example-identity-pool-id',
    domain: 'c3ops-auth.auth.us-east-1.amazoncognito.com'
  };

  const authFlows = [
    { name: 'ALLOW_ADMIN_USER_PASSWORD_AUTH', enabled: true, description: 'Admin authentication flow' },
    { name: 'ALLOW_CUSTOM_AUTH', enabled: false, description: 'Custom authentication flow' },
    { name: 'ALLOW_USER_PASSWORD_AUTH', enabled: true, description: 'User password authentication' },
    { name: 'ALLOW_USER_SRP_AUTH', enabled: true, description: 'Secure Remote Password protocol' },
    { name: 'ALLOW_REFRESH_TOKEN_AUTH', enabled: true, description: 'Refresh token authentication' }
  ];

  const copyToClipboard = (text, type) => {
    navigator.clipboard?.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleTestConnection = async () => {
    console.log('Testing Cognito connection...');
    // Implementation for testing Cognito connection
  };

  const handleSaveSettings = async () => {
    console.log('Saving Cognito settings...', settings);
    // Implementation for saving settings
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Cognito Configuration</h2>
          <p className="text-sm text-gray-600">Manage User Pool settings and authentication flows</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={handleTestConnection} className="flex items-center space-x-2">
            <TestTube className="h-4 w-4" />
            <span>Test Connection</span>
          </Button>
          <Button size="sm" onClick={handleSaveSettings} className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Save Settings</span>
          </Button>
        </div>
      </div>
      {/* Connection Details */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-medium text-blue-900">Connection Details</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-blue-800">User Pool ID</label>
              <div className="mt-1 flex items-center space-x-2">
                <Input 
                  value={cognitoConfig?.userPoolId} 
                  readOnly 
                  className="bg-white"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(cognitoConfig?.userPoolId, 'userPoolId')}
                  className="flex items-center space-x-1"
                >
                  {copied === 'userPoolId' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-blue-800">Client ID</label>
              <div className="mt-1 flex items-center space-x-2">
                <Input 
                  value={cognitoConfig?.clientId} 
                  readOnly 
                  className="bg-white"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(cognitoConfig?.clientId, 'clientId')}
                  className="flex items-center space-x-1"
                >
                  {copied === 'clientId' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-blue-800">Region</label>
              <Input value={cognitoConfig?.region} readOnly className="mt-1 bg-white" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-blue-800">Identity Pool ID</label>
              <div className="mt-1 flex items-center space-x-2">
                <Input 
                  value={cognitoConfig?.identityPoolId} 
                  readOnly 
                  className="bg-white"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(cognitoConfig?.identityPoolId, 'identityPoolId')}
                  className="flex items-center space-x-1"
                >
                  {copied === 'identityPoolId' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-blue-800">Cognito Domain</label>
              <div className="mt-1 flex items-center space-x-2">
                <Input 
                  value={cognitoConfig?.domain} 
                  readOnly 
                  className="bg-white"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(cognitoConfig?.domain, 'domain')}
                  className="flex items-center space-x-1"
                >
                  {copied === 'domain' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-blue-800">Status</label>
              <div className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusData?.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {statusData?.status === 'connected' ? 'Connected & Healthy' : 'Disconnected'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Authentication Flows */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Key className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Authentication Flows</h3>
        </div>
        
        <div className="space-y-3">
          {authFlows?.map((flow, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <Checkbox 
                checked={flow?.enabled} 
                readOnly
                className="mt-0.5"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{flow?.name}</div>
                <div className="text-sm text-gray-600">{flow?.description}</div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                flow?.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {flow?.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Security Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                  checked={settings?.mfaEnabled}
                  onChange={(checked) => setSettings(prev => ({ ...prev, mfaEnabled: checked }))}
                />
                <label className="text-sm font-medium text-gray-900">Multi-Factor Authentication</label>
              </div>
              <p className="text-sm text-gray-600">Require users to provide additional verification</p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                  checked={settings?.emailVerification}
                  onChange={(checked) => setSettings(prev => ({ ...prev, emailVerification: checked }))}
                />
                <label className="text-sm font-medium text-gray-900">Email Verification</label>
              </div>
              <p className="text-sm text-gray-600">Verify email addresses during registration</p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                  checked={settings?.phoneVerification}
                  onChange={(checked) => setSettings(prev => ({ ...prev, phoneVerification: checked }))}
                />
                <label className="text-sm font-medium text-gray-900">Phone Verification</label>
              </div>
              <p className="text-sm text-gray-600">Verify phone numbers during registration</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-900 mb-2 block">Password Policy</label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Minimum Length</span>
                  <span className="text-sm font-medium">{settings?.passwordPolicy?.minLength} characters</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Require Numbers</span>
                  <span className={`text-sm font-medium ${settings?.passwordPolicy?.requireNumbers ? 'text-green-600' : 'text-red-600'}`}>
                    {settings?.passwordPolicy?.requireNumbers ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Require Special Characters</span>
                  <span className={`text-sm font-medium ${settings?.passwordPolicy?.requireSpecialChars ? 'text-green-600' : 'text-red-600'}`}>
                    {settings?.passwordPolicy?.requireSpecialChars ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Require Uppercase</span>
                  <span className={`text-sm font-medium ${settings?.passwordPolicy?.requireUppercase ? 'text-green-600' : 'text-red-600'}`}>
                    {settings?.passwordPolicy?.requireUppercase ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitoSettingsTab;