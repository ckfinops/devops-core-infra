import React, { useState } from 'react';
import { X, Building2 } from 'lucide-react';
import { dynamoService } from '../../../utils/dynamoDBService';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ClientOnboardingModal = ({ onClose, onClientCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    subscriptionTier: 'Professional',
    contactEmail: '',
    cloudProviders: [],
    estimatedUsers: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProviderToggle = (provider) => {
    setFormData(prev => ({
      ...prev,
      cloudProviders: prev?.cloudProviders?.includes(provider)
        ? prev?.cloudProviders?.filter(p => p !== provider)
        : [...prev?.cloudProviders, provider]
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!formData?.name?.trim()) {
      setError('Company name is required');
      return;
    }

    if (!formData?.contactEmail?.trim()) {
      setError('Contact email is required');
      return;
    }

    if (formData?.cloudProviders?.length === 0) {
      setError('At least one cloud provider must be selected');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const clientData = {
        name: formData?.name?.trim(),
        subscriptionTier: formData?.subscriptionTier,
        status: 'Pending',
        activeUsers: parseInt(formData?.estimatedUsers),
        cloudProviders: formData?.cloudProviders,
        monthlySpend: 0,
        contactEmail: formData?.contactEmail?.trim(),
        applications: [],
        roles: []
      };

      const newClient = await dynamoService?.createClient(clientData);
      onClientCreated(newClient);
      
    } catch (err) {
      setError('Failed to create client. Please try again.');
      console.error('Client creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Quick Client Onboarding
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Company Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <Input
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              placeholder="e.g., Cloud Binary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email *
            </label>
            <Input
              type="email"
              value={formData?.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e?.target?.value)}
              placeholder="contact@company.com"
              required
            />
          </div>

          {/* Subscription Tier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subscription Tier
            </label>
            <select
              value={formData?.subscriptionTier}
              onChange={(e) => handleInputChange('subscriptionTier', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Starter">Starter</option>
              <option value="Professional">Professional</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>

          {/* Estimated Users */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Users
            </label>
            <Input
              type="number"
              min="1"
              value={formData?.estimatedUsers}
              onChange={(e) => handleInputChange('estimatedUsers', e?.target?.value)}
            />
          </div>

          {/* Cloud Providers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cloud Providers *
            </label>
            <div className="space-y-2">
              {['AWS', 'Azure', 'GCP']?.map(provider => (
                <label key={provider} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData?.cloudProviders?.includes(provider)}
                    onChange={() => handleProviderToggle(provider)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{provider}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              This creates a basic client profile. Use the full Client Onboarding Wizard 
              for complete setup including user roles and applications.
            </p>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Creating...' : 'Create Client'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientOnboardingModal;