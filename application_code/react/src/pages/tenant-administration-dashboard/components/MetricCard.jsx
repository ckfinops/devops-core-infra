import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const MetricCard = ({ title, value, change, trend, icon: Icon }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;