import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExecutiveDashboard = ({ data, timeFrame, selectedMetrics, onMetricsChange, hasData }) => {
  const [activeWidget, setActiveWidget] = useState('cost-trends');

  // Mock executive dashboard data
  const mockDashboardData = {
    costTrends: [
      { month: 'Jan', current: 180000, previous: 165000, budget: 175000, forecast: 185000 },
      { month: 'Feb', current: 195000, previous: 170000, budget: 185000, forecast: 200000 },
      { month: 'Mar', current: 210000, previous: 185000, budget: 195000, forecast: 215000 },
      { month: 'Apr', current: 225000, previous: 200000, budget: 205000, forecast: 230000 },
      { month: 'May', current: 240000, previous: 215000, budget: 215000, forecast: 245000 },
      { month: 'Jun', current: 255000, previous: 230000, budget: 225000, forecast: 260000 }
    ],
    departmentSpending: [
      { department: 'Engineering', spend: 850000, budget: 800000, efficiency: 94 },
      { department: 'Data Science', spend: 420000, budget: 450000, efficiency: 107 },
      { department: 'DevOps', spend: 320000, budget: 300000, efficiency: 94 },
      { department: 'QA', spend: 180000, budget: 200000, efficiency: 111 },
      { department: 'Security', spend: 150000, budget: 140000, efficiency: 93 }
    ],
    cloudProviderDistribution: [
      { provider: 'AWS', spend: 1200000, percentage: 62, growth: 15 },
      { provider: 'Azure', spend: 480000, percentage: 25, growth: 22 },
      { provider: 'GCP', spend: 250000, percentage: 13, growth: 8 }
    ],
    roiAnalysis: [
      { initiative: 'Cloud Migration', investment: 500000, savings: 1200000, roi: 140, timeframe: '12 months' },
      { initiative: 'Auto Scaling', investment: 50000, savings: 300000, roi: 500, timeframe: '6 months' },
      { initiative: 'Reserved Instances', investment: 200000, savings: 450000, roi: 125, timeframe: '24 months' },
      { initiative: 'Spot Instances', investment: 25000, savings: 180000, roi: 620, timeframe: '3 months' }
    ]
  };

  const dashboardData = hasData ? data || mockDashboardData : mockDashboardData;

  const widgets = [
    { id: 'cost-trends', name: 'Cost Trends', icon: 'TrendingUp' },
    { id: 'department-comparison', name: 'Department Analysis', icon: 'Users' },
    { id: 'provider-distribution', name: 'Cloud Providers', icon: 'Cloud' },
    { id: 'roi-analysis', name: 'ROI Analysis', icon: 'Target' }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const renderCostTrends = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dashboardData?.costTrends}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
          <YAxis 
            stroke="#64748b" 
            fontSize={12}
            tickFormatter={(value) => `$${(value / 1000)}K`}
          />
          <Tooltip 
            formatter={(value) => [`$${(value / 1000)}K`, '']}
            labelStyle={{ color: '#334155' }}
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="current" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            name="Current Period"
          />
          <Line 
            type="monotone" 
            dataKey="budget" 
            stroke="#10b981" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Budget"
          />
          <Line 
            type="monotone" 
            dataKey="forecast" 
            stroke="#f59e0b" 
            strokeWidth={2}
            strokeDasharray="3 3"
            name="Forecast"
          />
          <Line 
            type="monotone" 
            dataKey="previous" 
            stroke="#64748b" 
            strokeWidth={2}
            name="Previous Period"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderDepartmentComparison = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dashboardData?.departmentSpending} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="department" stroke="#64748b" fontSize={12} />
          <YAxis 
            stroke="#64748b" 
            fontSize={12}
            tickFormatter={(value) => `$${(value / 1000)}K`}
          />
          <Tooltip 
            formatter={(value, name) => [
              name === 'spend' ? `$${(value / 1000)}K` : `${value}%`,
              name === 'spend' ? 'Actual Spend' : 'Efficiency Score'
            ]}
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
          />
          <Legend />
          <Bar dataKey="spend" fill="#3b82f6" name="Actual Spend" radius={[4, 4, 0, 0]} />
          <Bar dataKey="budget" fill="#e2e8f0" name="Budget" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderProviderDistribution = () => (
    <div className="h-80 flex items-center">
      <div className="w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dashboardData?.cloudProviderDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="spend"
              label={({ provider, percentage }) => `${provider}: ${percentage}%`}
            >
              {dashboardData?.cloudProviderDistribution?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${(value / 1000)}K`, 'Spend']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-1/2 space-y-4">
        {dashboardData?.cloudProviderDistribution?.map((provider, index) => (
          <div key={provider?.provider} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
              ></div>
              <span className="font-medium text-gray-900">{provider?.provider}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                ${(provider?.spend / 1000)}K
              </div>
              <div className="text-xs text-gray-500">
                {provider?.growth > 0 ? '+' : ''}{provider?.growth}% growth
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderROIAnalysis = () => (
    <div className="h-80 overflow-y-auto">
      <div className="space-y-4">
        {dashboardData?.roiAnalysis?.map((initiative, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{initiative?.initiative}</h4>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  initiative?.roi >= 200 ? 'bg-green-100 text-green-800' :
                  initiative?.roi >= 100 ? 'bg-yellow-100 text-yellow-800': 'bg-red-100 text-red-800'
                }`}>
                  {initiative?.roi}% ROI
                </span>
                <span className="text-xs text-gray-500">{initiative?.timeframe}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Investment</span>
                <div className="font-semibold">${(initiative?.investment / 1000)}K</div>
              </div>
              <div>
                <span className="text-gray-500">Savings</span>
                <div className="font-semibold text-green-600">${(initiative?.savings / 1000)}K</div>
              </div>
              <div>
                <span className="text-gray-500">Net Benefit</span>
                <div className="font-semibold text-blue-600">
                  ${((initiative?.savings - initiative?.investment) / 1000)}K
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWidget = () => {
    switch (activeWidget) {
      case 'cost-trends': return renderCostTrends();
      case 'department-comparison': return renderDepartmentComparison();
      case 'provider-distribution': return renderProviderDistribution();
      case 'roi-analysis': return renderROIAnalysis();
      default: return renderCostTrends();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 lg:mb-0">Executive Dashboard</h2>
        
        <div className="flex items-center space-x-4">
          {/* Widget Selector */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            {widgets?.map((widget) => (
              <button
                key={widget?.id}
                onClick={() => setActiveWidget(widget?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeWidget === widget?.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon name={widget?.icon} size={16} />
                <span>{widget?.name}</span>
              </button>
            ))}
          </div>
          
          <Button variant="outline" size="sm" iconName="Maximize2" iconPosition="left">
            Fullscreen
          </Button>
        </div>
      </div>
      {/* Dashboard Content */}
      <div className="relative">
        {!hasData && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <span className="text-xs text-blue-700 font-medium">Demo Data</span>
            </div>
          </div>
        )}
        {renderWidget()}
      </div>
      {/* Dashboard Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Interactive widgets available</span>
            <div className="flex items-center space-x-2">
              <Icon name="Download" size={14} />
              <span>Export to Excel/PDF</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Settings" iconPosition="left">
              Customize
            </Button>
            <Button variant="outline" size="sm" iconName="Share" iconPosition="left">
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;