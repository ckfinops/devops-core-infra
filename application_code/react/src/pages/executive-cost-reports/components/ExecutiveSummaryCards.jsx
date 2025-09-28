import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutiveSummaryCards = ({ data, timeFrame, hasData, loading }) => {
  // Mock executive data when no real data is available
  const mockExecutiveData = [
    {
      title: 'Total Technology Spend',
      value: hasData ? data?.totalSpend || '$2.4M' : '$2.4M',
      change: '+12.5%',
      changeType: 'negative',
      icon: 'DollarSign',
      subtitle: 'Current period',
      trend: [65, 78, 82, 95, 88, 102, 110],
      insight: 'Above budget by 8.2%'
    },
    {
      title: 'YoY Growth Rate',
      value: hasData ? data?.yoyGrowth || '18.2%' : '18.2%',
      change: '+2.1%',
      changeType: 'neutral',
      icon: 'TrendingUp',
      subtitle: 'Year over year',
      trend: [45, 52, 48, 61, 58, 67, 72],
      insight: 'Within strategic targets'
    },
    {
      title: 'Budget Performance',
      value: hasData ? data?.budgetPerformance || '92.3%' : '92.3%',
      change: '-5.2%',
      changeType: 'positive',
      icon: 'Target',
      subtitle: 'vs planned budget',
      trend: [88, 91, 89, 94, 92, 96, 92],
      insight: 'Optimization opportunities'
    },
    {
      title: 'Cost Efficiency Index',
      value: hasData ? data?.efficiencyIndex || '84.7' : '84.7',
      change: '+3.8%',
      changeType: 'positive',
      icon: 'Zap',
      subtitle: 'Efficiency score',
      trend: [75, 78, 80, 82, 81, 83, 85],
      insight: 'Above industry average'
    }
  ];

  const executiveData = data || mockExecutiveData;

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'neutral': return 'text-yellow-600';
      default: return 'text-gray-500';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      case 'neutral': return 'Minus';
      default: return 'Minus';
    }
  };

  const getChangeBg = (type) => {
    switch (type) {
      case 'positive': return 'bg-green-50 border-green-200';
      case 'negative': return 'bg-red-50 border-red-200';
      case 'neutral': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(4)]?.map((_, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="w-16 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Executive Summary</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Icon name="Calendar" size={16} />
          <span className="capitalize">{timeFrame} Overview</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {executiveData?.map((metric, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Icon name={metric?.icon} size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">{metric?.title}</h3>
                  <p className="text-xs text-gray-500">{metric?.subtitle}</p>
                </div>
              </div>
              
              {/* Mini Trend Chart */}
              <div className="w-20 h-10 relative">
                <svg className="w-full h-full" viewBox="0 0 80 40">
                  <polyline
                    points={metric?.trend?.map((point, idx) => 
                      `${(idx * 80) / (metric?.trend?.length - 1)},${40 - (point / 120) * 40}`
                    )?.join(' ')}
                    fill="none"
                    stroke={metric?.changeType === 'positive' ? '#10b981' : 
                           metric?.changeType === 'negative' ? '#ef4444' : '#f59e0b'}
                    strokeWidth="2"
                    className="opacity-60"
                  />
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={
                        metric?.changeType === 'positive' ? '#10b981' : 
                        metric?.changeType === 'negative' ? '#ef4444' : '#f59e0b'
                      } stopOpacity="0.3"/>
                      <stop offset="100%" stopColor={
                        metric?.changeType === 'positive' ? '#10b981' : 
                        metric?.changeType === 'negative' ? '#ef4444' : '#f59e0b'
                      } stopOpacity="0.05"/>
                    </linearGradient>
                  </defs>
                  <polygon
                    points={`0,40 ${metric?.trend?.map((point, idx) => 
                      `${(idx * 80) / (metric?.trend?.length - 1)},${40 - (point / 120) * 40}`
                    )?.join(' ')} 80,40`}
                    fill={`url(#gradient-${index})`}
                  />
                </svg>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900">{metric?.value}</div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border ${getChangeBg(metric?.changeType)}`}>
                    <Icon 
                      name={getChangeIcon(metric?.changeType)} 
                      size={12} 
                      className={getChangeColor(metric?.changeType)} 
                    />
                    <span className={`text-xs font-medium ${getChangeColor(metric?.changeType)}`}>
                      {metric?.change}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">vs last period</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-600 font-medium">{metric?.insight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveSummaryCards;