import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import SubscriptionEditModal from './SubscriptionEditModal';

const SubscriptionInventoryTable = ({ onSubscriptionSelect, selectedSubscription }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('cost');
  const [sortDirection, setSortDirection] = useState('desc');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      applicationName: 'Salesforce',
      vendor: 'Salesforce Inc.',
      licenseCount: 150,
      costPerLicense: 75,
      totalCost: 11250,
      renewalDate: '2024-12-15',
      utilizationRate: 87,
      status: 'active',
      category: 'CRM'
    },
    {
      id: 2,
      applicationName: 'Microsoft 365',
      vendor: 'Microsoft Corp.',
      licenseCount: 500,
      costPerLicense: 12,
      totalCost: 6000,
      renewalDate: '2024-11-30',
      utilizationRate: 92,
      status: 'active',
      category: 'Productivity'
    },
    {
      id: 3,
      applicationName: 'Slack Enterprise',
      vendor: 'Slack Technologies',
      licenseCount: 200,
      costPerLicense: 15,
      totalCost: 3000,
      renewalDate: '2024-10-20',
      utilizationRate: 78,
      status: 'expiring',
      category: 'Communication'
    },
    {
      id: 4,
      applicationName: 'Figma Professional',
      vendor: 'Figma Inc.',
      licenseCount: 25,
      costPerLicense: 144,
      totalCost: 3600,
      renewalDate: '2025-02-14',
      utilizationRate: 45,
      status: 'underutilized',
      category: 'Design'
    },
    {
      id: 5,
      applicationName: 'Jira Software',
      vendor: 'Atlassian',
      licenseCount: 100,
      costPerLicense: 84,
      totalCost: 8400,
      renewalDate: '2024-09-30',
      utilizationRate: 95,
      status: 'active',
      category: 'Project Management'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'expiring': return 'text-warning bg-warning/10';
      case 'underutilized': return 'text-orange-500 bg-orange-500/10';
      case 'inactive': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getUtilizationColor = (rate) => {
    if (rate >= 80) return 'text-success';
    if (rate >= 60) return 'text-warning';
    return 'text-error';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleEditClick = (subscription, event) => {
    event?.stopPropagation(); // Prevent row click
    setEditingSubscription(subscription);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updatedSubscription) => {
    setSubscriptions(prev => 
      prev?.map(sub => 
        sub?.id === updatedSubscription?.id ? updatedSubscription : sub
      )
    );
    
    // Update selected subscription if it was the one being edited
    if (selectedSubscription?.id === updatedSubscription?.id) {
      onSubscriptionSelect?.(updatedSubscription);
    }
  };

  const handleMoreActions = (subscription, event) => {
    event?.stopPropagation(); // Prevent row click
    // TODO: Implement more actions menu (delete, duplicate, etc.)
    console.log('More actions for:', subscription?.applicationName);
  };

  const filteredSubscriptions = subscriptions?.filter(sub =>
    sub?.applicationName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    sub?.vendor?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    sub?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const sortedSubscriptions = [...filteredSubscriptions]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <h2 className="text-lg font-semibold text-foreground">Subscription Inventory</h2>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search subscriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="pl-10 w-80"
                />
              </div>
              
              <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                Export
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('applicationName')}
                    className="flex items-center space-x-1 hover:text-foreground transition-colors"
                  >
                    <span>Application</span>
                    <Icon name="ArrowUpDown" size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('licenseCount')}
                    className="flex items-center space-x-1 hover:text-foreground transition-colors"
                  >
                    <span>Licenses</span>
                    <Icon name="ArrowUpDown" size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('totalCost')}
                    className="flex items-center space-x-1 hover:text-foreground transition-colors"
                  >
                    <span>Monthly Cost</span>
                    <Icon name="ArrowUpDown" size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('renewalDate')}
                    className="flex items-center space-x-1 hover:text-foreground transition-colors"
                  >
                    <span>Renewal</span>
                    <Icon name="ArrowUpDown" size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('utilizationRate')}
                    className="flex items-center space-x-1 hover:text-foreground transition-colors"
                  >
                    <span>Utilization</span>
                    <Icon name="ArrowUpDown" size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedSubscriptions?.map((subscription) => (
                <tr 
                  key={subscription?.id} 
                  className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                    selectedSubscription?.id === subscription?.id ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => onSubscriptionSelect?.(subscription)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Package" size={18} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{subscription?.applicationName}</div>
                        <div className="text-xs text-muted-foreground">{subscription?.vendor}</div>
                        <div className="text-xs text-muted-foreground">{subscription?.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground font-medium">{subscription?.licenseCount}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatCurrency(subscription?.costPerLicense)}/license
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">
                      {formatCurrency(subscription?.totalCost)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground">
                      {formatDate(subscription?.renewalDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            subscription?.utilizationRate >= 80 ? 'bg-success' :
                            subscription?.utilizationRate >= 60 ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${subscription?.utilizationRate}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${getUtilizationColor(subscription?.utilizationRate)}`}>
                        {subscription?.utilizationRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subscription?.status)}`}>
                      {subscription?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        iconName="Edit"
                        onClick={(e) => handleEditClick(subscription, e)}
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        iconName="MoreHorizontal"
                        onClick={(e) => handleMoreActions(subscription, e)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <SubscriptionEditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingSubscription(null);
        }}
        subscription={editingSubscription}
        onSave={handleSaveEdit}
      />
    </>
  );
};

export default SubscriptionInventoryTable;