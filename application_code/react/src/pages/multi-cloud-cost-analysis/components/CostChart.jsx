import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CostChart = ({ data, activeProvider }) => {
  const [chartType, setChartType] = useState('area');
  const [timeRange, setTimeRange] = useState('30d');

  const chartTypes = [
    { id: 'area', name: 'Trend Analysis', icon: 'TrendingUp' },
    { id: 'bar', name: 'Provider Comparison', icon: 'BarChart3' },
    { id: 'pie', name: 'Service Distribution', icon: 'PieChart' }
  ];

  const timeRanges = [
    { id: '7d', name: '7 Days' },
    { id: '30d', name: '30 Days' },
    { id: '90d', name: '90 Days' },
    { id: '1y', name: '1 Year' }
  ];

  const colors = {
    aws: '#FF9500',
    azure: '#0078D4',
    gcp: '#4285F4',
    total: '#1E40AF'
  };

  const pieColors = ['#1E40AF', '#FF9500', '#0078D4', '#4285F4', '#059669', '#DC2626'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-popover-foreground mb-2">
            {chartType === 'area' ? formatDate(label) : label}
          </p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{entry?.name}</span>
              </div>
              <span className="text-sm font-medium text-popover-foreground">
                {formatCurrency(entry?.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data?.trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {activeProvider === 'all' ? (
                <>
                  <Area
                    type="monotone"
                    dataKey="aws"
                    stackId="1"
                    stroke={colors?.aws}
                    fill={colors?.aws}
                    fillOpacity={0.6}
                    name="AWS"
                  />
                  <Area
                    type="monotone"
                    dataKey="azure"
                    stackId="1"
                    stroke={colors?.azure}
                    fill={colors?.azure}
                    fillOpacity={0.6}
                    name="Azure"
                  />
                  <Area
                    type="monotone"
                    dataKey="gcp"
                    stackId="1"
                    stroke={colors?.gcp}
                    fill={colors?.gcp}
                    fillOpacity={0.6}
                    name="GCP"
                  />
                </>
              ) : (
                <Area
                  type="monotone"
                  dataKey={activeProvider}
                  stroke={colors?.[activeProvider]}
                  fill={colors?.[activeProvider]}
                  fillOpacity={0.6}
                  name={activeProvider?.toUpperCase()}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data?.comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="service" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="aws" fill={colors?.aws} name="AWS" />
              <Bar dataKey="azure" fill={colors?.azure} name="Azure" />
              <Bar dataKey="gcp" fill={colors?.gcp} name="GCP" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data?.serviceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data?.serviceDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors?.[index % pieColors?.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Cost Visualization</h3>
          <p className="text-sm text-muted-foreground">
            Interactive analysis of your multi-cloud spending patterns
          </p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Chart Type Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {chartTypes?.map((type) => (
              <button
                key={type?.id}
                onClick={() => setChartType(type?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  chartType === type?.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={type?.icon} size={16} />
                <span className="hidden sm:inline">{type?.name}</span>
              </button>
            ))}
          </div>

          {/* Time Range Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {timeRanges?.map((range) => (
              <button
                key={range?.id}
                onClick={() => setTimeRange(range?.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  timeRange === range?.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range?.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        {renderChart()}
        
        {/* Export Options */}
        <div className="absolute top-0 right-0 flex space-x-2">
          <Button variant="ghost" size="icon">
            <Icon name="Download" size={16} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Share" size={16} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </div>
      {/* Chart Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Highest Growth</span>
          </div>
          <p className="text-lg font-semibold text-foreground">AWS Compute</p>
          <p className="text-sm text-muted-foreground">+23% this month</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Cost Anomaly</span>
          </div>
          <p className="text-lg font-semibold text-foreground">Azure Storage</p>
          <p className="text-sm text-muted-foreground">Unusual spike detected</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Optimization</span>
          </div>
          <p className="text-lg font-semibold text-foreground">$12,450</p>
          <p className="text-sm text-muted-foreground">Potential savings</p>
        </div>
      </div>
    </div>
  );
};

export default CostChart;