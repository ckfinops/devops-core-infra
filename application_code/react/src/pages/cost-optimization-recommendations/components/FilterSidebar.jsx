import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ filters, onFiltersChange, isCollapsed, onToggleCollapse }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (category, value, checked) => {
    const newFilters = { ...localFilters };
    if (checked) {
      newFilters[category] = [...(newFilters?.[category] || []), value];
    } else {
      newFilters[category] = (newFilters?.[category] || [])?.filter(item => item !== value);
    }
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleRangeChange = (category, field, value) => {
    const newFilters = {
      ...localFilters,
      [category]: {
        ...localFilters?.[category],
        [field]: value
      }
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      effort: [],
      risk: [],
      savingsRange: { min: 0, max: 100000 },
      impactScore: { min: 0, max: 10 }
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    count += localFilters?.categories?.length || 0;
    count += localFilters?.effort?.length || 0;
    count += localFilters?.risk?.length || 0;
    return count;
  };

  const filterSections = [
    {
      title: 'Recommendation Type',
      key: 'categories',
      options: [
        { value: 'Rightsizing', label: 'Rightsizing', icon: 'Zap' },
        { value: 'Reserved Instance', label: 'Reserved Instances', icon: 'Shield' },
        { value: 'Unused Resource', label: 'Unused Resources', icon: 'Trash2' },
        { value: 'Storage Optimization', label: 'Storage Optimization', icon: 'HardDrive' },
        { value: 'Network Optimization', label: 'Network Optimization', icon: 'Wifi' }
      ]
    },
    {
      title: 'Implementation Effort',
      key: 'effort',
      options: [
        { value: 'Low', label: 'Low Effort', color: 'text-success' },
        { value: 'Medium', label: 'Medium Effort', color: 'text-warning' },
        { value: 'High', label: 'High Effort', color: 'text-error' }
      ]
    },
    {
      title: 'Risk Level',
      key: 'risk',
      options: [
        { value: 'Low', label: 'Low Risk', color: 'text-success' },
        { value: 'Medium', label: 'Medium Risk', color: 'text-warning' },
        { value: 'High', label: 'High Risk', color: 'text-error' }
      ]
    }
  ];

  if (isCollapsed) {
    return (
      <div className="w-12 lg:w-14 bg-card border-r border-border p-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="w-full mb-4 h-6 lg:h-8"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
        
        {getActiveFilterCount() > 0 && (
          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium mx-auto">
            {getActiveFilterCount()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-64 lg:w-72 bg-card border-r border-border flex-shrink-0">
      <div className="p-4 lg:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} className="text-primary flex-shrink-0" />
            <h2 className="text-base lg:text-lg font-semibold text-foreground">Filters</h2>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="flex-shrink-0"
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
        </div>
        
        {getActiveFilterCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="mt-3 text-error hover:text-error"
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6 max-h-[calc(100vh-240px)] overflow-y-auto">
        {/* Savings Range */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Potential Savings</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min ($)"
                value={localFilters?.savingsRange?.min || ''}
                onChange={(e) => handleRangeChange('savingsRange', 'min', parseInt(e?.target?.value) || 0)}
                className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring min-w-0"
              />
              <span className="text-muted-foreground text-sm flex-shrink-0">to</span>
              <input
                type="number"
                placeholder="Max ($)"
                value={localFilters?.savingsRange?.max || ''}
                onChange={(e) => handleRangeChange('savingsRange', 'max', parseInt(e?.target?.value) || 100000)}
                className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring min-w-0"
              />
            </div>
          </div>
        </div>

        {/* Impact Score Range */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Impact Score</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                max="10"
                placeholder="Min"
                value={localFilters?.impactScore?.min || ''}
                onChange={(e) => handleRangeChange('impactScore', 'min', parseInt(e?.target?.value) || 0)}
                className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring min-w-0"
              />
              <span className="text-muted-foreground text-sm flex-shrink-0">to</span>
              <input
                type="number"
                min="0"
                max="10"
                placeholder="Max"
                value={localFilters?.impactScore?.max || ''}
                onChange={(e) => handleRangeChange('impactScore', 'max', parseInt(e?.target?.value) || 10)}
                className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring min-w-0"
              />
            </div>
          </div>
        </div>

        {/* Filter Sections */}
        {filterSections?.map((section) => (
          <div key={section?.key}>
            <h3 className="font-medium text-foreground mb-3">{section?.title}</h3>
            <div className="space-y-2">
              {section?.options?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={localFilters?.[section?.key]?.includes(option?.value) || false}
                    onChange={(e) => handleFilterChange(section?.key, option?.value, e?.target?.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2 flex-shrink-0"
                  />
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    {option?.icon && (
                      <Icon name={option?.icon} size={16} className="text-muted-foreground flex-shrink-0" />
                    )}
                    <span className={`text-sm group-hover:text-foreground transition-colors duration-150 truncate ${
                      option?.color || 'text-muted-foreground'
                    }`}>
                      {option?.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Filters */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Quick Filters</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-left"
              iconName="Zap"
              iconPosition="left"
            >
              <span className="truncate">High Impact, Low Effort</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-left"
              iconName="DollarSign"
              iconPosition="left"
            >
              <span className="truncate">Savings &gt; $10,000</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-left"
              iconName="Clock"
              iconPosition="left"
            >
              <span className="truncate">Quick Wins (&lt; 1 week)</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;