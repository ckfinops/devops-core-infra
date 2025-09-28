import React from 'react';

const FilterPanel = ({ filterCriteria, onFilterChange, tenants }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filterCriteria,
      [key]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Users</h3>
      <div className="space-y-4">
        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role Level
          </label>
          <select
            value={filterCriteria?.role}
            onChange={(e) => handleFilterChange('role', e?.target?.value)}
            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="Super User">Super User</option>
            <option value="Admin">Admin</option>
            <option value="Read Only">Read Only</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Authentication Status
          </label>
          <select
            value={filterCriteria?.status}
            onChange={(e) => handleFilterChange('status', e?.target?.value)}
            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending_verification">Pending</option>
          </select>
        </div>

        {/* Tenant Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client Tenant
          </label>
          <select
            value={filterCriteria?.tenant}
            onChange={(e) => handleFilterChange('tenant', e?.target?.value)}
            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Tenants</option>
            {tenants?.map((tenant) => (
              <option key={tenant?.id} value={tenant?.id}>
                {tenant?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Role Templates */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Access</h4>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
              Role Templates
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md">
              Compliance Report
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md">
              Audit History
            </button>
          </div>
        </div>

        {/* Clear Filters */}
        <div className="pt-4">
          <button
            onClick={() => onFilterChange({ role: 'all', status: 'all', tenant: 'all' })}
            className="w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 text-sm text-gray-700 rounded-md transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;