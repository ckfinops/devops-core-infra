import React from 'react';

import Icon from '../../../components/AppIcon';

const SSOOptions = ({ isLoading }) => {
  const ssoProviders = [
    {
      name: 'Microsoft',
      icon: 'Box',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    },
    {
      name: 'SAML',
      icon: 'Shield',
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700'
    }
  ];

  const handleSSOLogin = (provider) => {
    if (isLoading) return;
    console.log(`SSO login with ${provider}`);
    // Implement SSO logic here
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {ssoProviders?.map((provider) => (
          <button
            key={provider?.name}
            onClick={() => handleSSOLogin(provider?.name)}
            disabled={isLoading}
            className={`${provider?.color} ${provider?.hoverColor} disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2`}
          >
            <Icon name={provider?.icon} size={16} color="white" />
            <span className="text-sm font-medium">{provider?.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SSOOptions;