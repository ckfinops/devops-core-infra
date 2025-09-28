import React from 'react';

const TenantSwitcher = ({ tenants, selectedTenant, onTenantChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="text-sm font-medium text-gray-700">Tenant Context:</label>
      <select
        value={selectedTenant}
        onChange={(e) => onTenantChange(e?.target?.value)}
        className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Tenants</option>
        {tenants?.map((tenant) => (
          <option key={tenant?.id} value={tenant?.id}>
            {tenant?.name}
          </option>
        ))}
      </select>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span>Cognito Sync: Active</span>
      </div>
    </div>
  );
};

export default TenantSwitcher;