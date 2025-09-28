import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    categories: [],
    renewalPeriods: [],
    costThresholds: {
      min: '',
      max: ''
    },
    utilizationRates: [],
    vendors: []
  });

  const filterOptions = {
    categories: [
      'CRM', 'Productivity', 'Communication', 'Design', 'Project Management',
      'Development', 'Marketing', 'HR', 'Finance', 'Security'
    ],
    renewalPeriods: [
      'Next 30 days', 'Next 90 days', 'Next 6 months', 'Next year', 'Overdue'
    ],
    utilizationRates: [
      { label: 'High (80%+)', value: 'high' },
      { label: 'Medium (60-79%)', value: 'medium' },
      { label: 'Low (<60%)', value: 'low' }
    ],
    vendors: [
      'Microsoft', 'Google', 'Salesforce', 'Adobe', 'Atlassian',
      'Slack', 'Zoom', 'Figma', 'Notion', 'Dropbox'
    ]
  };

  const handleCheckboxChange = (category, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked
        ? [...prev?.[category], value]
        : prev?.[category]?.filter(item => item !== value)
    }));
  };

  const handleCostThresholdChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      costThresholds: {
        ...prev?.costThresholds,
        [type]: value
      }
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      renewalPeriods: [],
      costThresholds: { min: '', max: '' },
      utilizationRates: [],
      vendors: []
    });
  };

  const getActiveFiltersCount = () => {
    return filters?.categories?.length + 
           filters?.renewalPeriods?.length + 
           filters?.utilizationRates?.length + 
           filters?.vendors?.length +
           (filters?.costThresholds?.min || filters?.costThresholds?.max ? 1 : 0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border z-50 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Filter Subscriptions</h2>
            <div className="flex items-center space-x-2">
              {getActiveFiltersCount() > 0 && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                  {getActiveFiltersCount()} active
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="Grid" size={16} className="mr-2" />
              Categories
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {filterOptions?.categories?.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters?.categories?.includes(category)}
                    onChange={(checked) => handleCheckboxChange('categories', category, checked)}
                  />
                  <label htmlFor={`category-${category}`} className="text-sm text-foreground cursor-pointer">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Renewal Periods */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="Calendar" size={16} className="mr-2" />
              Renewal Period
            </h3>
            <div className="space-y-2">
              {filterOptions?.renewalPeriods?.map((period) => (
                <div key={period} className="flex items-center space-x-2">
                  <Checkbox
                    id={`period-${period}`}
                    checked={filters?.renewalPeriods?.includes(period)}
                    onChange={(checked) => handleCheckboxChange('renewalPeriods', period, checked)}
                  />
                  <label htmlFor={`period-${period}`} className="text-sm text-foreground cursor-pointer">
                    {period}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Thresholds */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="DollarSign" size={16} className="mr-2" />
              Monthly Cost Range
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters?.costThresholds?.min}
                onChange={(e) => handleCostThresholdChange('min', e?.target?.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters?.costThresholds?.max}
                onChange={(e) => handleCostThresholdChange('max', e?.target?.value)}
              />
            </div>
          </div>

          {/* Utilization Rates */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="Activity" size={16} className="mr-2" />
              Utilization Rate
            </h3>
            <div className="space-y-2">
              {filterOptions?.utilizationRates?.map((rate) => (
                <div key={rate?.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`utilization-${rate?.value}`}
                    checked={filters?.utilizationRates?.includes(rate?.value)}
                    onChange={(checked) => handleCheckboxChange('utilizationRates', rate?.value, checked)}
                  />
                  <label htmlFor={`utilization-${rate?.value}`} className="text-sm text-foreground cursor-pointer">
                    {rate?.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Vendors */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="Building" size={16} className="mr-2" />
              Vendors
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {filterOptions?.vendors?.map((vendor) => (
                <div key={vendor} className="flex items-center space-x-2">
                  <Checkbox
                    id={`vendor-${vendor}`}
                    checked={filters?.vendors?.includes(vendor)}
                    onChange={(checked) => handleCheckboxChange('vendors', vendor, checked)}
                  />
                  <label htmlFor={`vendor-${vendor}`} className="text-sm text-foreground cursor-pointer">
                    {vendor}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-3 pt-6 border-t border-border">
            <Button variant="primary" className="w-full">
              Apply Filters ({getActiveFiltersCount()})
            </Button>
            <Button variant="outline" className="w-full" onClick={clearAllFilters}>
              Clear All Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;