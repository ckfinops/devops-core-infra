import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ isOpen, onClose, viewMode }) => {
  const [filters, setFilters] = useState({
    modelTypes: [],
    computeTypes: [],
    projects: [],
    costRange: {
      min: '',
      max: ''
    },
    status: [],
    timeRange: '7d'
  });

  // Dynamic filter options based on view mode
  const getFilterOptions = () => {
    const commonOptions = {
      projects: ['NLP Research', 'Computer Vision', 'Text Analysis', 'Image Classification', 'Language Models'],
      computeTypes: ['A100', 'V100', 'H100', 'T4', 'CPU'],
      status: viewMode === 'training' 
        ? ['running', 'completed', 'failed', 'queued']
        : viewMode === 'inference' 
        ? ['active', 'scaling', 'inactive']
        : ['active', 'idle', 'scaling', 'terminating']
    };

    switch (viewMode) {
      case 'training':
        return {
          ...commonOptions,
          modelTypes: ['Fine-tuning', 'Training', 'Hyperparameter Tuning', 'Transfer Learning']
        };
      case 'inference':
        return {
          ...commonOptions,
          modelTypes: ['Language Model', 'Computer Vision', 'ML Pipeline', 'Classification']
        };
      case 'resources':
        return {
          ...commonOptions,
          modelTypes: ['GPU Cluster', 'Training Instance', 'Inference Pool', 'Storage']
        };
      default:
        return commonOptions;
    }
  };

  const filterOptions = getFilterOptions();

  const handleCheckboxChange = (category, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked
        ? [...prev?.[category], value]
        : prev?.[category]?.filter(item => item !== value)
    }));
  };

  const handleCostRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      costRange: {
        ...prev?.costRange,
        [type]: value
      }
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      modelTypes: [],
      computeTypes: [],
      projects: [],
      costRange: { min: '', max: '' },
      status: [],
      timeRange: '7d'
    });
  };

  const getActiveFiltersCount = () => {
    return filters?.modelTypes?.length + 
           filters?.computeTypes?.length + 
           filters?.projects?.length + 
           filters?.status?.length +
           (filters?.costRange?.min || filters?.costRange?.max ? 1 : 0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      {/* Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border z-50 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Filter AI Workloads</h2>
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

          {/* Time Range */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="Calendar" size={16} className="mr-2" />
              Time Range
            </h3>
            <div className="grid grid-cols-4 gap-1">
              {['1h', '24h', '7d', '30d']?.map((range) => (
                <button
                  key={range}
                  onClick={() => setFilters(prev => ({ ...prev, timeRange: range }))}
                  className={`px-3 py-2 text-xs rounded transition-colors ${
                    filters?.timeRange === range
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Model/Resource Types */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="Layers" size={16} className="mr-2" />
              {viewMode === 'training' ? 'Training Types' : 
               viewMode === 'inference'? 'Model Types' : 'Resource Types'}
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {filterOptions?.modelTypes?.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters?.modelTypes?.includes(type)}
                    onChange={(checked) => handleCheckboxChange('modelTypes', type, checked)}
                  />
                  <label htmlFor={`type-${type}`} className="text-sm text-foreground cursor-pointer">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Compute Types */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="Cpu" size={16} className="mr-2" />
              Compute Types
            </h3>
            <div className="space-y-2">
              {filterOptions?.computeTypes?.map((compute) => (
                <div key={compute} className="flex items-center space-x-2">
                  <Checkbox
                    id={`compute-${compute}`}
                    checked={filters?.computeTypes?.includes(compute)}
                    onChange={(checked) => handleCheckboxChange('computeTypes', compute, checked)}
                  />
                  <label htmlFor={`compute-${compute}`} className="text-sm text-foreground cursor-pointer">
                    {compute}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="Folder" size={16} className="mr-2" />
              Projects
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {filterOptions?.projects?.map((project) => (
                <div key={project} className="flex items-center space-x-2">
                  <Checkbox
                    id={`project-${project}`}
                    checked={filters?.projects?.includes(project)}
                    onChange={(checked) => handleCheckboxChange('projects', project, checked)}
                  />
                  <label htmlFor={`project-${project}`} className="text-sm text-foreground cursor-pointer">
                    {project}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Range */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="DollarSign" size={16} className="mr-2" />
              Cost Range
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min ($)"
                value={filters?.costRange?.min}
                onChange={(e) => handleCostRangeChange('min', e?.target?.value)}
              />
              <Input
                type="number"
                placeholder="Max ($)"
                value={filters?.costRange?.max}
                onChange={(e) => handleCostRangeChange('max', e?.target?.value)}
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="Activity" size={16} className="mr-2" />
              Status
            </h3>
            <div className="space-y-2">
              {filterOptions?.status?.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={filters?.status?.includes(status)}
                    onChange={(checked) => handleCheckboxChange('status', status, checked)}
                  />
                  <label htmlFor={`status-${status}`} className="text-sm text-foreground cursor-pointer">
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="Settings" size={16} className="mr-2" />
              Advanced
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="high-cost-only"
                  onChange={(checked) => {
                    if (checked) {
                      setFilters(prev => ({ ...prev, costRange: { min: '1000', max: '' }}));
                    }
                  }}
                />
                <label htmlFor="high-cost-only" className="text-sm text-foreground cursor-pointer">
                  High cost workloads only ($1000+)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inefficient-only"
                  onChange={(checked) => {
                    // Filter logic for inefficient workloads
                  }}
                />
                <label htmlFor="inefficient-only" className="text-sm text-foreground cursor-pointer">
                  {viewMode === 'resources' ? 'Low utilization (<60%)' : 'Low efficiency (<60%)'}
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="optimization-candidates"
                  onChange={(checked) => {
                    // Filter logic for optimization candidates
                  }}
                />
                <label htmlFor="optimization-candidates" className="text-sm text-foreground cursor-pointer">
                  Optimization candidates
                </label>
              </div>
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

export default FilterPanel;