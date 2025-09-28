import React, { useState } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StrategicForecast = ({ data, timeFrame, hasData }) => {
  const [forecastPeriod, setForecastPeriod] = useState('12-months');
  const [scenario, setScenario] = useState('baseline');

  // Mock strategic forecast data
  const mockForecastData = {
    costForecast: [
      { month: 'Jan 2025', baseline: 240000, optimistic: 220000, conservative: 260000, current: 235000 },
      { month: 'Feb 2025', baseline: 248000, optimistic: 225000, conservative: 270000, current: null },
      { month: 'Mar 2025', baseline: 255000, optimistic: 230000, conservative: 280000, current: null },
      { month: 'Apr 2025', baseline: 263000, optimistic: 235000, conservative: 290000, current: null },
      { month: 'May 2025', baseline: 271000, optimistic: 240000, conservative: 300000, current: null },
      { month: 'Jun 2025', baseline: 280000, optimistic: 245000, conservative: 315000, current: null },
      { month: 'Jul 2025', baseline: 289000, optimistic: 250000, conservative: 330000, current: null },
      { month: 'Aug 2025', baseline: 298000, optimistic: 255000, conservative: 345000, current: null },
      { month: 'Sep 2025', baseline: 307000, optimistic: 260000, conservative: 360000, current: null },
      { month: 'Oct 2025', baseline: 316000, optimistic: 265000, conservative: 375000, current: null },
      { month: 'Nov 2025', baseline: 325000, optimistic: 270000, conservative: 390000, current: null },
      { month: 'Dec 2025', baseline: 335000, optimistic: 275000, conservative: 405000, current: null }
    ],
    scenarios: [
      {
        name: 'Baseline Scenario',
        id: 'baseline',
        description: 'Current growth trajectory with existing optimizations',
        yearEndCost: '$3.35M',
        confidence: 75,
        keyAssumptions: ['Current usage patterns continue', '15% annual growth', 'Existing optimization plans']
      },
      {
        name: 'Optimistic Scenario',
        id: 'optimistic',
        description: 'Aggressive optimization and cloud efficiency improvements',
        yearEndCost: '$2.75M',
        confidence: 60,
        keyAssumptions: ['All optimization initiatives successful', '20% efficiency gains', 'Reserved instance adoption']
      },
      {
        name: 'Conservative Scenario',
        id: 'conservative',
        description: 'Higher growth with market expansion and compliance costs',
        yearEndCost: '$4.05M',
        confidence: 85,
        keyAssumptions: ['30% business growth', 'Compliance overhead', 'Market expansion costs']
      }
    ],
    budgetImpact: {
      currentBudget: 3200000,
      forecastVariance: 150000,
      riskLevel: 'medium',
      recommendedActions: [
        'Implement auto-scaling policies',
        'Review and optimize reserved instances',
        'Establish cost anomaly monitoring',
        'Plan budget adjustment for Q3'
      ]
    }
  };

  const forecastData = hasData ? data || mockForecastData : mockForecastData;
  const currentScenario = forecastData?.scenarios?.find(s => s?.id === scenario);

  const scenarioColors = {
    baseline: '#3b82f6',
    optimistic: '#10b981',
    conservative: '#ef4444',
    current: '#6b7280'
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Strategic Forecast</h2>
        <div className="flex items-center space-x-2">
          <select
            value={forecastPeriod}
            onChange={(e) => setForecastPeriod(e?.target?.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1"
          >
            <option value="6-months">6 Months</option>
            <option value="12-months">12 Months</option>
            <option value="24-months">24 Months</option>
          </select>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>
      </div>
      {/* Forecast Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData?.costForecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b" 
              fontSize={12}
              tick={{ angle: -45 }}
              textAnchor="end"
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000)}K`}
            />
            <Tooltip 
              formatter={(value, name) => [`$${(value / 1000)}K`, name]}
              labelStyle={{ color: '#334155' }}
              contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke={scenarioColors?.current} 
              strokeWidth={3}
              dot={{ fill: scenarioColors?.current, r: 4 }}
              connectNulls={false}
              name="Actual"
            />
            <Line 
              type="monotone" 
              dataKey="baseline" 
              stroke={scenarioColors?.baseline} 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Baseline Forecast"
            />
            <Line 
              type="monotone" 
              dataKey="optimistic" 
              stroke={scenarioColors?.optimistic} 
              strokeWidth={2}
              strokeDasharray="3 3"
              name="Optimistic"
            />
            <Line 
              type="monotone" 
              dataKey="conservative" 
              stroke={scenarioColors?.conservative} 
              strokeWidth={2}
              strokeDasharray="7 3"
              name="Conservative"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Scenario Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-3">Forecast Scenarios</h3>
        <div className="grid grid-cols-1 gap-3">
          {forecastData?.scenarios?.map((scenarioOption) => (
            <div 
              key={scenarioOption?.id}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                scenario === scenarioOption?.id 
                  ? 'border-blue-300 bg-blue-50' :'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setScenario(scenarioOption?.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-gray-900">{scenarioOption?.name}</h4>
                    <span className="text-lg font-bold text-blue-600">{scenarioOption?.yearEndCost}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{scenarioOption?.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Confidence</div>
                  <div className="text-sm font-medium">{scenarioOption?.confidence}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Selected Scenario Details */}
      {currentScenario && (
        <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-blue-900 mb-2">Key Assumptions - {currentScenario?.name}</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            {currentScenario?.keyAssumptions?.map((assumption, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-blue-600" />
                <span>{assumption}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Budget Impact Analysis */}
      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-4">Budget Impact Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Current Annual Budget</span>
              <span className="font-semibold">${(forecastData?.budgetImpact?.currentBudget / 1000000)?.toFixed(1)}M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Forecast Variance</span>
              <span className="font-semibold text-yellow-600">
                +${(forecastData?.budgetImpact?.forecastVariance / 1000)?.toFixed(0)}K
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Risk Level</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(forecastData?.budgetImpact?.riskLevel)}`}>
                {forecastData?.budgetImpact?.riskLevel?.toUpperCase()}
              </span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Recommended Actions</h4>
            <ul className="space-y-2">
              {forecastData?.budgetImpact?.recommendedActions?.map((action, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <Icon name="ArrowRight" size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {!hasData && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800 mb-1">Forecast Limitation</h4>
              <p className="text-sm text-yellow-700">
                Forecasts are based on demo data. Connect cloud accounts for accurate strategic forecasting based on your actual usage patterns.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategicForecast;