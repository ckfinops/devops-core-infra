import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const accountOptions = [
    { id: 'prod-001', name: 'Production Account', provider: 'AWS' },
    { id: 'dev-002', name: 'Development Account', provider: 'AWS' },
    { id: 'staging-003', name: 'Staging Environment', provider: 'Azure' },
    { id: 'analytics-004', name: 'Analytics Workspace', provider: 'GCP' },
    { id: 'ml-005', name: 'ML Training Account', provider: 'AWS' }
  ];

  const serviceCategories = [
    { id: 'compute', name: 'Compute', count: 45 },
    { id: 'storage', name: 'Storage', count: 32 },
    { id: 'database', name: 'Database', count: 18 },
    { id: 'networking', name: 'Networking', count: 24 },
    { id: 'ai-ml', name: 'AI/ML', count: 12 },
    { id: 'analytics', name: 'Analytics', count: 8 },
    { id: 'security', name: 'Security', count: 15 }
  ];

  const costThresholds = [
    { id: 'under-100', name: 'Under $100', min: 0, max: 100 },
    { id: '100-500', name: '$100 - $500', min: 100, max: 500 },
    { id: '500-1000', name: '$500 - $1,000', min: 500, max: 1000 },
    { id: '1000-5000', name: '$1,000 - $5,000', min: 1000, max: 5000 },
    { id: 'over-5000', name: 'Over $5,000', min: 5000, max: null }
  ];

  const handleFilterChange = (category, value, checked) => {
    const newFilters = { ...localFilters };
    
    if (!newFilters?.[category]) {
      newFilters[category] = [];
    }

    if (checked) {
      newFilters[category] = [...newFilters?.[category], value];
    } else {
      newFilters[category] = newFilters?.[category]?.filter(item => item !== value);
    }

    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      accounts: [],
      serviceCategories: [],
      costThresholds: [],
      dateRange: { start: '', end: '' },
      tags: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.values(localFilters)?.forEach(filterArray => {
      if (Array.isArray(filterArray)) {
        count += filterArray?.length;
      }
    });
    return count;
  };

  const getProviderIcon = (provider) => {
    switch (provider?.toLowerCase()) {
      case 'aws': return 'Server';
      case 'azure': return 'Database';
      case 'gcp': return 'HardDrive';
      default: return 'Cloud';
    }
  };

  const getProviderColor = (provider) => {
    switch (provider?.toLowerCase()) {
      case 'aws': return 'text-orange-600';
      case 'azure': return 'text-blue-600';
      case 'gcp': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        <Button
          onClick={onToggle}
          variant="default"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
        >
          <Icon name="Filter" size={20} />
          {getActiveFilterCount() > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center font-medium">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 lg:hidden"
        onClick={onToggle}
      ></div>
      {/* Sidebar */}
      <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-card border-l border-border z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Filters</h3>
              {getActiveFilterCount() > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                  {getActiveFilterCount()}
                </span>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onToggle}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Date Range */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Date Range</h4>
            <div className="space-y-3">
              <Input
                type="date"
                label="Start Date"
                value={localFilters?.dateRange?.start || ''}
                onChange={(e) => setLocalFilters({
                  ...localFilters,
                  dateRange: { ...localFilters?.dateRange, start: e?.target?.value }
                })}
              />
              <Input
                type="date"
                label="End Date"
                value={localFilters?.dateRange?.end || ''}
                onChange={(e) => setLocalFilters({
                  ...localFilters,
                  dateRange: { ...localFilters?.dateRange, end: e?.target?.value }
                })}
              />
            </div>
          </div>

          {/* Account Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Accounts</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {accountOptions?.map((account) => (
                <div key={account?.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                  <Checkbox
                    checked={localFilters?.accounts?.includes(account?.id) || false}
                    onChange={(e) => handleFilterChange('accounts', account?.id, e?.target?.checked)}
                  />
                  <div className="flex items-center space-x-2 flex-1">
                    <Icon 
                      name={getProviderIcon(account?.provider)} 
                      size={16} 
                      className={getProviderColor(account?.provider)} 
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{account?.name}</p>
                      <p className="text-xs text-muted-foreground">{account?.provider}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Categories */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Service Categories</h4>
            <div className="space-y-2">
              {serviceCategories?.map((category) => (
                <div key={category?.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={localFilters?.serviceCategories?.includes(category?.id) || false}
                      onChange={(e) => handleFilterChange('serviceCategories', category?.id, e?.target?.checked)}
                    />
                    <span className="text-sm text-foreground">{category?.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {category?.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Thresholds */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Cost Range</h4>
            <div className="space-y-2">
              {costThresholds?.map((threshold) => (
                <div key={threshold?.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                  <Checkbox
                    checked={localFilters?.costThresholds?.includes(threshold?.id) || false}
                    onChange={(e) => handleFilterChange('costThresholds', threshold?.id, e?.target?.checked)}
                  />
                  <span className="text-sm text-foreground">{threshold?.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Tags</h4>
            <Input
              type="text"
              placeholder="Search tags..."
              className="mb-3"
            />
            <div className="flex flex-wrap gap-2">
              {['production', 'development', 'staging', 'ml-training', 'analytics']?.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleFilterChange('tags', tag, !localFilters?.tags?.includes(tag))}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    localFilters?.tags?.includes(tag)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-border">
            <Button 
              onClick={handleApplyFilters}
              className="w-full"
            >
              Apply Filters
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              className="w-full"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;