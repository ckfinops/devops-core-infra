import React, { useState } from 'react';
import { MoreHorizontal, ExternalLink, Users, Server, DollarSign, ChevronDown, ChevronRight } from 'lucide-react';
import Button from '../../../components/ui/Button';

const ClientDirectoryTable = ({ clients = [], onRefresh }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (clientId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(clientId)) {
      newExpanded?.delete(clientId);
    } else {
      newExpanded?.add(clientId);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Suspended': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusClasses?.[status] || statusClasses?.Inactive
      }`}>
        {status}
      </span>
    );
  };

  const getSubscriptionBadge = (tier) => {
    const tierClasses = {
      'Enterprise': 'bg-purple-100 text-purple-800',
      'Professional': 'bg-blue-100 text-blue-800',
      'Starter': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        tierClasses?.[tier] || tierClasses?.Starter
      }`}>
        {tier}
      </span>
    );
  };

  if (!clients || clients?.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
        <p className="text-gray-600 mb-4">
          {clients?.length === 0 ? 'No clients have been onboarded yet.' : 'Try adjusting your search or filters.'}
        </p>
        <Button onClick={onRefresh} variant="outline">
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscription
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Users
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cloud Providers
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monthly Spend
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients?.map((client) => (
              <React.Fragment key={client?.id}>
                {/* Main Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleRowExpansion(client?.id)}
                        className="mr-3 p-1 hover:bg-gray-100 rounded"
                      >
                        {expandedRows?.has(client?.id) ? (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {client?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {client?.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getSubscriptionBadge(client?.subscriptionTier)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      {client?.activeUsers}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-1">
                      {client?.cloudProviders?.map((provider, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {provider}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                      ${client?.monthlySpend?.toLocaleString() || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(client?.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Row Details */}
                {expandedRows?.has(client?.id) && (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 bg-gray-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Applications */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                            <Server className="h-4 w-4 mr-2" />
                            Applications ({client?.applications?.length || 0})
                          </h4>
                          <div className="space-y-2">
                            {client?.applications?.map((app, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-white p-3 rounded-lg border"
                              >
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {app?.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Provider: {app?.provider}
                                  </div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  app?.status === 'Active' ? 'bg-green-100 text-green-800' :
                                  app?.status === 'Development'? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {app?.status}
                                </span>
                              </div>
                            )) || (
                              <p className="text-sm text-gray-500">No applications configured</p>
                            )}
                          </div>
                        </div>
                        
                        {/* User Roles */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            User Hierarchy ({client?.roles?.length || 0})
                          </h4>
                          <div className="space-y-2">
                            {client?.roles?.map((role, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-white p-3 rounded-lg border"
                              >
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {role?.user}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {role?.email}
                                  </div>
                                </div>
                                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                  {role?.level}
                                </span>
                              </div>
                            )) || (
                              <p className="text-sm text-gray-500">No user roles defined</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Billing Information */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Created:</span>
                            <div className="font-medium">
                              {client?.createdAt ? new Date(client.createdAt)?.toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Last Active:</span>
                            <div className="font-medium">
                              {client?.lastActive ? new Date(client.lastActive)?.toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Compliance:</span>
                            <div className="font-medium text-green-600">Verified</div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientDirectoryTable;