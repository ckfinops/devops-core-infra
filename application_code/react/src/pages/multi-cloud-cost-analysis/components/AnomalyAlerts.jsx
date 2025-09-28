import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnomalyAlerts = ({ anomalies }) => {
  const [expandedAnomaly, setExpandedAnomaly] = useState(null);

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-accent';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-error/10 border-error/20';
      case 'high': return 'bg-warning/10 border-warning/20';
      case 'medium': return 'bg-accent/10 border-accent/20';
      case 'low': return 'bg-success/10 border-success/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'AlertCircle';
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Bell';
    }
  };

  const getProviderIcon = (provider) => {
    switch (provider?.toLowerCase()) {
      case 'aws': return 'Server';
      case 'azure': return 'Database';
      case 'gcp': return 'HardDrive';
      default: return 'Cloud';
    }
  };

  const getProviderColor = (provider) => {
    switch (provider?.toLowerCase()) {
      case 'aws': return 'text-orange-600';
      case 'azure': return 'text-blue-600';
      case 'gcp': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const handleToggleExpand = (anomalyId) => {
    setExpandedAnomaly(expandedAnomaly === anomalyId ? null : anomalyId);
  };

  const handleDismiss = (anomalyId) => {
    // Handle dismissing anomaly
    console.log('Dismissing anomaly:', anomalyId);
  };

  const handleInvestigate = (anomalyId) => {
    // Handle investigating anomaly
    console.log('Investigating anomaly:', anomalyId);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Cost Anomalies</h3>
              <p className="text-sm text-muted-foreground">
                Unusual spending patterns detected across your infrastructure
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Configure
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="History" size={16} className="mr-2" />
              History
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {anomalies?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">No Anomalies Detected</h4>
            <p className="text-muted-foreground">
              Your spending patterns are within expected ranges
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {anomalies?.map((anomaly) => (
              <div
                key={anomaly?.id}
                className={`border rounded-lg transition-all duration-200 ${getSeverityBg(anomaly?.severity)}`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex-shrink-0">
                        <Icon 
                          name={getSeverityIcon(anomaly?.severity)} 
                          size={20} 
                          className={getSeverityColor(anomaly?.severity)} 
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-foreground">{anomaly?.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(anomaly?.severity)} ${getSeverityBg(anomaly?.severity)}`}>
                            {anomaly?.severity}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {anomaly?.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Icon 
                              name={getProviderIcon(anomaly?.provider)} 
                              size={16} 
                              className={getProviderColor(anomaly?.provider)} 
                            />
                            <span className="text-foreground">{anomaly?.provider}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                            <span className="font-medium text-foreground">
                              {formatCurrency(anomaly?.impactAmount)}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Icon name="Clock" size={16} className="text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {formatTimeAgo(anomaly?.detectedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleExpand(anomaly?.id)}
                      >
                        <Icon 
                          name={expandedAnomaly === anomaly?.id ? "ChevronUp" : "ChevronDown"} 
                          size={16} 
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDismiss(anomaly?.id)}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {expandedAnomaly === anomaly?.id && (
                  <div className="border-t border-border bg-muted/30 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Details</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Service:</span>
                            <span className="text-foreground">{anomaly?.service}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Region:</span>
                            <span className="text-foreground">{anomaly?.region}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Expected Cost:</span>
                            <span className="text-foreground">{formatCurrency(anomaly?.expectedCost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Actual Cost:</span>
                            <span className="text-foreground">{formatCurrency(anomaly?.actualCost)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Recommendations</h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {anomaly?.recommendations?.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        onClick={() => handleInvestigate(anomaly?.id)}
                      >
                        <Icon name="Search" size={16} className="mr-2" />
                        Investigate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Icon name="Bell" size={16} className="mr-2" />
                        Create Alert
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Icon name="FileText" size={16} className="mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnomalyAlerts;