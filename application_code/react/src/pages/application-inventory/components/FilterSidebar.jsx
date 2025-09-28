import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterSidebar = ({ filters, onFiltersChange, onClose, applications }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    onFiltersChange({
      appType: 'all',
      hostingEnv: 'all',
      owner: 'all',
      lastUpdated: 'all'
    });
  };

  // Extract unique values for filter options
  const appTypes = [...new Set(applications?.map(app => app?.appType))];
  const hostingEnvs = [...new Set(applications?.map(app => app?.hostingEnv?.split(' ')[0]))];
  const owners = [...new Set([
    ...applications?.map(app => app?.techStackOwner),
    ...applications?.map(app => app?.itOwner),
    ...applications?.map(app => app?.functionalOwner)
  ])];

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
      </div>

      <div className="space-y-4">
        {/* Application Type Filter */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Application Type
          </label>
          <Select
            value={filters?.appType}
            onValueChange={(value) => handleFilterChange('appType', value)}
            className="w-full"
          >
            <option value="all">All Types</option>
            {appTypes?.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </div>

        {/* Hosting Environment Filter */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Hosting Environment
          </label>
          <Select
            value={filters?.hostingEnv}
            onValueChange={(value) => handleFilterChange('hostingEnv', value)}
            className="w-full"
          >
            <option value="all">All Environments</option>
            {hostingEnvs?.map(env => (
              <option key={env} value={env}>{env}</option>
            ))}
          </Select>
        </div>

        {/* Owner Filter */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Owner
          </label>
          <Select
            value={filters?.owner}
            onValueChange={(value) => handleFilterChange('owner', value)}
            className="w-full"
          >
            <option value="all">All Owners</option>
            {owners?.map(owner => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </Select>
        </div>

        {/* Last Updated Filter */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Last Updated
          </label>
          <Select
            value={filters?.lastUpdated}
            onValueChange={(value) => handleFilterChange('lastUpdated', value)}
            className="w-full"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </Select>
        </div>
      </div>

      {/* Saved Filters Section */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Saved Filter Presets</h4>
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start"
            iconName="Star"
            iconPosition="left"
          >
            Critical Applications
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start"
            iconName="Cloud"
            iconPosition="left"
          >
            Cloud Applications
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start"
            iconName="Clock"
            iconPosition="left"
          >
            Recently Updated
          </Button>
        </div>
      </div>

      {/* Filter Actions */}
      <div className="border-t border-border pt-4 space-y-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={handleResetFilters}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset Filters
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full"
          iconName="Save"
          iconPosition="left"
        >
          Save Current Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;