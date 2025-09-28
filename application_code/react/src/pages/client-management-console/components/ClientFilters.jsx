import React from 'react';
import { Filter, X, FileText, CheckCircle } from 'lucide-react';
import Button from '../../../components/ui/Button';

const ClientFilters = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      subscriptionTier: 'all',
      status: 'all',
      cloudProvider: 'all'
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== 'all');

  return (
    <div className="space-y-6">
      {/* Advanced Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </h3>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-gray-500"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Subscription Tier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subscription Tier
            </label>
            <select
              value={filters?.subscriptionTier}
              onChange={(e) => handleFilterChange('subscriptionTier', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Tiers</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Professional">Professional</option>
              <option value="Starter">Starter</option>
            </select>
          </div>

          {/* Account Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Status
            </label>
            <select
              value={filters?.status}
              onChange={(e) => handleFilterChange('status', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          {/* Cloud Provider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cloud Provider
            </label>
            <select
              value={filters?.cloudProvider}
              onChange={(e) => handleFilterChange('cloudProvider', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Providers</option>
              <option value="AWS">AWS</option>
              <option value="Azure">Azure</option>
              <option value="GCP">Google Cloud</option>
            </select>
          </div>
        </div>
      </div>
      {/* Quick Access Resources */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
        <div className="space-y-3">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left"
          >
            <FileText className="h-4 w-4 mr-3" />
            Client Templates
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left"
          >
            <CheckCircle className="h-4 w-4 mr-3" />
            Onboarding Checklists
          </Button>
        </div>
      </div>
      {/* Engagement Levels */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Analysis</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">High Engagement</span>
            <span className="text-sm font-medium text-green-600">3 clients</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Medium Engagement</span>
            <span className="text-sm font-medium text-yellow-600">2 clients</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Low Engagement</span>
            <span className="text-sm font-medium text-red-600">0 clients</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFilters;