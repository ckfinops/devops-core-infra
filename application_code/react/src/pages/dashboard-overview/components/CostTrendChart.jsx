import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CostTrendChart = ({ data, hasData = false }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const categories = [
    { value: 'all', label: 'All Services', color: '#1E40AF' },
    { value: 'compute', label: 'Compute', color: '#059669' },
    { value: 'storage', label: 'Storage', color: '#D97706' },
    { value: 'network', label: 'Network', color: '#DC2626' },
    { value: 'ai', label: 'AI/ML', color: '#6366F1' }
  ];

  // Use provided data or fall back to empty/mock data
  const chartData = data && data?.length > 0 ? data : [];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (value) => {
    return `$${(value / 1000)?.toFixed(1)}k`;
  };

  // Simple SVG chart component to avoid recharts issues
  const SimpleChart = ({ data }) => {
    if (!data || data?.length === 0) return null;
    
    const maxValue = Math.max(...data?.map(d => d?.[selectedCategory] || 0));
    const chartWidth = 600;
    const chartHeight = 200;
    const padding = 40;
    const availableWidth = chartWidth - padding * 2;
    const availableHeight = chartHeight - padding * 2;
    
    const points = data?.map((item, index) => {
      const x = (index / (data?.length - 1)) * availableWidth + padding;
      const y = chartHeight - padding - ((item?.[selectedCategory] || 0) / maxValue) * availableHeight;
      return `${x},${y}`;
    })?.join(' ');

    return (
      <div className="w-full bg-background border border-border rounded-lg p-4">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-64">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2,2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Chart area */}
          <polyline
            fill="none"
            stroke={categories?.find(c => c?.value === selectedCategory)?.color || '#1E40AF'}
            strokeWidth="3"
            points={points}
          />
          
          {/* Data points */}
          {data?.map((item, index) => {
            const x = (index / (data?.length - 1)) * availableWidth + padding;
            const y = chartHeight - padding - ((item?.[selectedCategory] || 0) / maxValue) * availableHeight;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={categories?.find(c => c?.value === selectedCategory)?.color || '#1E40AF'}
              />
            );
          })}
          
          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1]?.map((ratio, index) => {
            const y = chartHeight - padding - (ratio * availableHeight);
            const value = maxValue * ratio;
            return (
              <g key={index}>
                <text
                  x={padding - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-xs fill-muted-foreground"
                >
                  {formatCurrency(value)}
                </text>
              </g>
            );
          })}
          
          {/* X-axis labels */}
          {data?.slice(0, 5)?.map((item, index) => {
            const x = (index / Math.max(data?.length - 1, 1)) * availableWidth + padding;
            return (
              <text
                key={index}
                x={x}
                y={chartHeight - 10}
                textAnchor="middle"
                className="text-xs fill-muted-foreground"
              >
                {formatDate(item?.date)}
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Cost Trends</h2>
          <p className="text-sm text-muted-foreground">Track spending patterns across services</p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Period Selection */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Period:</span>
            <div className="flex bg-muted rounded-lg p-1">
              {periods?.map((period) => (
                <button
                  key={period?.value}
                  onClick={() => setSelectedPeriod(period?.value)}
                  disabled={!hasData}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors duration-150 ${
                    selectedPeriod === period?.value
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  } ${!hasData ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {period?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e?.target?.value)}
              disabled={!hasData}
              className={`px-3 py-1 text-xs bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
                !hasData ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {categories?.map((category) => (
                <option key={category?.value} value={category?.value}>
                  {category?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-80 w-full">
        {hasData && chartData?.length > 0 ? (
          <SimpleChart data={chartData} />
        ) : (
          // No data state
          <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
            <Icon name="BarChart3" size={48} className="text-muted-foreground/30" />
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">
                {hasData ? 'No Chart Data Available' : 'Connect Cloud Providers'}
              </h3>
              <p className="text-xs text-muted-foreground mb-4 max-w-md">
                {hasData 
                  ? 'Cost trend data will appear here once your cloud providers start sending usage data.' :'Connect your AWS, Azure, or GCP accounts to view cost trends and spending patterns.'
                }
              </p>
              {!hasData && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  iconName="Plus" 
                  iconPosition="left"
                  onClick={() => window.location.href = '/cloud-provider-connection-setup'}
                >
                  Setup Connections
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs text-muted-foreground">Optimized</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs text-muted-foreground">Attention Needed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-xs text-muted-foreground">Over Budget</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          iconName="Download" 
          iconPosition="left"
          disabled={!hasData}
        >
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default CostTrendChart;