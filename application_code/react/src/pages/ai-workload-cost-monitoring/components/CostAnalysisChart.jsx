import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const CostAnalysisChart = ({ timeRange, viewMode }) => {
  // Mock chart data based on view mode
  const getChartData = () => {
    switch (viewMode) {
      case 'training':
        return {
          type: 'line',
          data: [
            { time: '00:00', training: 2400, inference: 1200, total: 3600 },
            { time: '04:00', training: 3200, inference: 1100, total: 4300 },
            { time: '08:00', training: 5800, inference: 1400, total: 7200 },
            { time: '12:00', training: 4200, inference: 1800, total: 6000 },
            { time: '16:00', training: 3800, inference: 2200, total: 6000 },
            { time: '20:00', training: 2900, inference: 1900, total: 4800 }
          ],
          title: 'Training vs Inference Costs',
          subtitle: 'Hourly cost breakdown'
        };
      case 'inference':
        return {
          type: 'bar',
          data: [
            { model: 'GPT-4', requests: 15420, cost: 2340 },
            { model: 'BERT', requests: 8920, cost: 890 },
            { model: 'ResNet', requests: 12100, cost: 1210 },
            { model: 'YOLO', requests: 6800, cost: 680 },
            { model: 'Custom LLM', requests: 4500, cost: 1800 }
          ],
          title: 'Model Serving Costs',
          subtitle: 'Cost per model by requests'
        };
      case 'resources':
        return {
          type: 'pie',
          data: [
            { name: 'GPU Compute', value: 45, cost: 40230 },
            { name: 'Storage', value: 25, cost: 22350 },
            { name: 'Data Transfer', value: 15, cost: 13410 },
            { name: 'Memory', value: 10, cost: 8940 },
            { name: 'Other', value: 5, cost: 4470 }
          ],
          title: 'Resource Cost Distribution',
          subtitle: 'Current month breakdown'
        };
      default:
        return { type: 'line', data: [], title: 'Cost Analysis', subtitle: '' };
    }
  };

  const chartData = getChartData();
  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(value);
  };

  const formatNumber = (value) => {
    if (value >= 1000) {
      return `${(value / 1000)?.toFixed(1)}K`;
    }
    return value?.toString();
  };

  const renderChart = () => {
    switch (chartData?.type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData?.data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="time" 
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value) => [formatCurrency(value), '']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="training" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                name="Training Cost"
                dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="inference" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Inference Cost"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData?.data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="model" 
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  name === 'cost' ? formatCurrency(value) : formatNumber(value),
                  name === 'cost' ? 'Cost' : 'Requests'
                ]}
              />
              <Legend />
              <Bar dataKey="cost" fill="#0ea5e9" name="Cost" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData?.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData?.data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value, name, props) => [
                  `${formatCurrency(props?.payload?.cost)} (${value}%)`,
                  'Cost'
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No data available</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{chartData?.title}</h2>
            <p className="text-sm text-muted-foreground">{chartData?.subtitle}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>Range: {timeRange}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        {renderChart()}
      </div>
      {/* Chart Summary */}
      <div className="p-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {viewMode === 'training' && (
            <>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Peak Training Cost</div>
                <div className="text-lg font-semibold text-foreground">$5,800</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Avg Inference Cost</div>
                <div className="text-lg font-semibold text-foreground">$1,622</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Cost Efficiency</div>
                <div className="text-lg font-semibold text-success">+12%</div>
              </div>
            </>
          )}
          
          {viewMode === 'inference' && (
            <>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Total Requests</div>
                <div className="text-lg font-semibold text-foreground">47.74K</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Avg Cost per Request</div>
                <div className="text-lg font-semibold text-foreground">$0.15</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Most Expensive Model</div>
                <div className="text-lg font-semibold text-warning">Custom LLM</div>
              </div>
            </>
          )}
          
          {viewMode === 'resources' && (
            <>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Total Resource Cost</div>
                <div className="text-lg font-semibold text-foreground">$89,400</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Largest Component</div>
                <div className="text-lg font-semibold text-foreground">GPU Compute</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Optimization Score</div>
                <div className="text-lg font-semibold text-success">8.2/10</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CostAnalysisChart;