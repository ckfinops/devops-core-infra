import React from 'react';
import Icon from '../../../components/AppIcon';

const ImpactSummaryCard = ({ title, value, subtitle, icon, trend, color = "primary" }) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: "bg-primary/10 text-primary border-primary/20",
      success: "bg-success/10 text-success border-success/20",
      warning: "bg-warning/10 text-warning border-warning/20",
      accent: "bg-accent/10 text-accent border-accent/20"
    };
    return colors?.[colorType] || colors?.primary;
  };

  const getTrendIcon = () => {
    if (trend > 0) return { name: "TrendingUp", color: "text-success" };
    if (trend < 0) return { name: "TrendingDown", color: "text-error" };
    return { name: "Minus", color: "text-muted-foreground" };
  };

  const trendInfo = getTrendIcon();

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
              <Icon name={icon} size={20} />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          
          <div className="space-y-2">
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{subtitle}</span>
              {trend !== undefined && (
                <div className="flex items-center space-x-1">
                  <Icon name={trendInfo?.name} size={14} className={trendInfo?.color} />
                  <span className={`text-xs font-medium ${trendInfo?.color}`}>
                    {Math.abs(trend)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactSummaryCard;