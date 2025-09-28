import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, trend, subtitle }) => {
  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      case 'neutral': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
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

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground/70">{subtitle}</p>
            )}
          </div>
        </div>
        {trend && (
          <div className="w-16 h-8 bg-muted/30 rounded flex items-center justify-center">
            <Icon name="TrendingUp" size={14} className="text-success" />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change && (
          <div className="flex items-center space-x-2">
            <Icon 
              name={getChangeIcon(changeType)} 
              size={14} 
              className={getChangeColor(changeType)} 
            />
            <span className={`text-sm font-medium ${getChangeColor(changeType)}`}>
              {change}
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;