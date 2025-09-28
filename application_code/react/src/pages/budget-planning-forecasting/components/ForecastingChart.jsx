import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

import Button from '../../../components/ui/Button';

const ForecastingChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('12');
  const [chartType, setChartType] = useState('line');
  const [showProjections, setShowProjections] = useState(true);

  const forecastData = [
    { month: 'Jan 2024', actual: 180000, projected: 185000, budget: 200000 },
    { month: 'Feb 2024', actual: 195000, projected: 190000, budget: 200000 },
    { month: 'Mar 2024', actual: 210000, projected: 205000, budget: 220000 },
    { month: 'Apr 2024', actual: 185000, projected: 195000, budget: 200000 },
    { month: 'May 2024', actual: 220000, projected: 215000, budget: 230000 },
    { month: 'Jun 2024', actual: 205000, projected: 210000, budget: 220000 },
    { month: 'Jul 2024', actual: 235000, projected: 225000, budget: 240000 },
    { month: 'Aug 2024', actual: 215000, projected: 220000, budget: 230000 },
    { month: 'Sep 2024', actual: null, projected: 240000, budget: 250000 },
    { month: 'Oct 2024', actual: null, projected: 255000, budget: 260000 },
    { month: 'Nov 2024', actual: null, projected: 245000, budget: 250000 },
    { month: 'Dec 2024', actual: null, projected: 270000, budget: 280000 }
  ];

  const [forecastParams, setForecastParams] = useState({
    growthRate: 8.5,
    seasonalFactor: 1.2,
    plannedInitiatives: 15000
  });

  const periodOptions = [
    { value: '6', label: '6 Months' },
    { value: '12', label: '12 Months' },
    { value: '24', label: '24 Months' }
  ];

  const handleParamChange = (param, value) => {
    setForecastParams(prev => ({
      ...prev,
      [param]: parseFloat(value)
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-popover-foreground">
                {formatCurrency(entry?.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Cost Forecasting</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Interactive projections with adjustable parameters
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {periodOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={selectedPeriod === option?.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(option?.value)}
              >
                {option?.label}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={chartType === 'line' ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType('line')}
              iconName="TrendingUp"
            >
              Line
            </Button>
            <Button
              variant={chartType === 'area' ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType('area')}
              iconName="BarChart3"
            >
              Area
            </Button>
          </div>
        </div>
      </div>
      {/* Forecast Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Growth Rate (%)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={forecastParams?.growthRate}
              onChange={(e) => handleParamChange('growthRate', e?.target?.value)}
              className="flex-1"
            />
            <span className="text-sm font-medium text-card-foreground w-12">
              {forecastParams?.growthRate}%
            </span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Seasonal Factor
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={forecastParams?.seasonalFactor}
              onChange={(e) => handleParamChange('seasonalFactor', e?.target?.value)}
              className="flex-1"
            />
            <span className="text-sm font-medium text-card-foreground w-12">
              {forecastParams?.seasonalFactor}x
            </span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Planned Initiatives ($)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={forecastParams?.plannedInitiatives}
              onChange={(e) => handleParamChange('plannedInitiatives', e?.target?.value)}
              className="flex-1"
            />
            <span className="text-sm font-medium text-card-foreground w-16">
              {formatCurrency(forecastParams?.plannedInitiatives)}
            </span>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={forecastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                name="Actual Spend"
                connectNulls={false}
              />
              {showProjections && (
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="var(--color-secondary)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Projected Spend"
                />
              )}
              <Line 
                type="monotone" 
                dataKey="budget" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                name="Budget Allocation"
              />
            </LineChart>
          ) : (
            <AreaChart data={forecastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="budget" 
                stackId="1"
                stroke="var(--color-accent)" 
                fill="var(--color-accent)"
                fillOpacity={0.3}
                name="Budget Allocation"
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stackId="2"
                stroke="var(--color-primary)" 
                fill="var(--color-primary)"
                fillOpacity={0.6}
                name="Actual Spend"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-sm text-muted-foreground">Actual Spend</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-secondary rounded-full"></div>
          <span className="text-sm text-muted-foreground">Projected Spend</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <span className="text-sm text-muted-foreground">Budget Allocation</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowProjections(!showProjections)}
          iconName={showProjections ? "EyeOff" : "Eye"}
        >
          {showProjections ? "Hide" : "Show"} Projections
        </Button>
      </div>
    </div>
  );
};

export default ForecastingChart;