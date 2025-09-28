import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="space-y-6">
      {/* Logo */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-[#4F8EF5] rounded-lg flex items-center justify-center">
            <Icon name="Cloud" size={24} color="white" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 leading-none">C3 - Cloud Cost Console</h1>
            <span className="text-sm text-gray-500 leading-none">Ai-Powered FinOps Platform</span>
          </div>
        </div>
        
        {/* Welcome Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">Welcome to Cloud Cost Console

          </h2>
          <p className="text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
      </div>
    </div>);

};

export default LoginHeader;