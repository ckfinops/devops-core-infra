import React from 'react';
import { Building2, Mail, Phone, Users } from 'lucide-react';
import Input from '../../../components/ui/Input';

const ClientInfoStep = ({ data, updateData }) => {
  const handleInputChange = (field, value) => {
    updateData('clientInfo', {
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building2 className="h-5 w-5 mr-2" />
          Client Information
        </h3>
        <p className="text-gray-600 mb-6">
          Enter the basic company information and subscription details for the new client.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <Input
            value={data?.clientInfo?.companyName}
            onChange={(e) => handleInputChange('companyName', e?.target?.value)}
            placeholder="e.g., Cloud Binary"
            required
          />
        </div>

        {/* Contact Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="email"
              value={data?.clientInfo?.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e?.target?.value)}
              placeholder="contact@company.com"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="tel"
              value={data?.clientInfo?.contactPhone}
              onChange={(e) => handleInputChange('contactPhone', e?.target?.value)}
              placeholder="+1 (555) 123-4567"
              className="pl-10"
            />
          </div>
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <select
            value={data?.clientInfo?.industry}
            onChange={(e) => handleInputChange('industry', e?.target?.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Industry</option>
            <option value="technology">Technology</option>
            <option value="finance">Financial Services</option>
            <option value="healthcare">Healthcare</option>
            <option value="retail">Retail</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="media">Media & Entertainment</option>
            <option value="government">Government</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Company Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Size
          </label>
          <select
            value={data?.clientInfo?.companySize}
            onChange={(e) => handleInputChange('companySize', e?.target?.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Size</option>
            <option value="startup">Startup (1-10 employees)</option>
            <option value="small">Small (11-50 employees)</option>
            <option value="medium">Medium (51-200 employees)</option>
            <option value="large">Large (201-1000 employees)</option>
            <option value="enterprise">Enterprise (1000+ employees)</option>
          </select>
        </div>

        {/* Subscription Tier */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subscription Tier *
          </label>
          <select
            value={data?.clientInfo?.subscriptionTier}
            onChange={(e) => handleInputChange('subscriptionTier', e?.target?.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="Starter">Starter - Basic features</option>
            <option value="Professional">Professional - Advanced features</option>
            <option value="Enterprise">Enterprise - Full feature set</option>
          </select>
        </div>

        {/* Estimated Users */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Users *
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="number"
              min="1"
              max="10000"
              value={data?.clientInfo?.estimatedUsers}
              onChange={(e) => handleInputChange('estimatedUsers', parseInt(e?.target?.value))}
              placeholder="5"
              className="pl-10"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Initial estimate for license planning
          </p>
        </div>
      </div>
      {/* Subscription Tier Details */}
      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-gray-900 mb-2">
          {data?.clientInfo?.subscriptionTier} Tier Features
        </h4>
        <div className="text-sm text-gray-600">
          {data?.clientInfo?.subscriptionTier === 'Starter' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Basic cloud cost monitoring</li>
              <li>Standard reporting</li>
              <li>Up to 50 users</li>
              <li>Email support</li>
            </ul>
          )}
          {data?.clientInfo?.subscriptionTier === 'Professional' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Advanced cost optimization</li>
              <li>Custom dashboards</li>
              <li>Up to 500 users</li>
              <li>Priority support</li>
              <li>API access</li>
            </ul>
          )}
          {data?.clientInfo?.subscriptionTier === 'Enterprise' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Full feature access</li>
              <li>White-label customization</li>
              <li>Unlimited users</li>
              <li>24/7 dedicated support</li>
              <li>Custom integrations</li>
              <li>SLA guarantees</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientInfoStep;