import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TopSpendingServices = () => {
  const [selectedProvider, setSelectedProvider] = useState('all');

  const providers = [
    { value: 'all', label: 'All Providers', icon: 'Cloud' },
    { value: 'aws', label: 'AWS', icon: 'Server' },
    { value: 'azure', label: 'Azure', icon: 'Database' },
    { value: 'gcp', label: 'GCP', icon: 'HardDrive' }
  ];

  const mockServices = [
    {
      id: 1,
      name: 'EC2 Instances',
      provider: 'aws',
      cost: 8420,
      change: 12.5,
      changeType: 'negative',
      usage: 85,
      category: 'Compute',
      icon: 'Server',
      color: 'bg-orange-500'
    },
    {
      id: 2,
      name: 'Azure Virtual Machines',
      provider: 'azure',
      cost: 6890,
      change: -8.2,
      changeType: 'positive',
      usage: 72,
      category: 'Compute',
      icon: 'Monitor',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'S3 Storage',
      provider: 'aws',
      cost: 3240,
      change: 5.1,
      changeType: 'negative',
      usage: 68,
      category: 'Storage',
      icon: 'HardDrive',
      color: 'bg-green-500'
    },
    {
      id: 4,
      name: 'GKE Clusters',
      provider: 'gcp',
      cost: 2890,
      change: -15.3,
      changeType: 'positive',
      usage: 91,
      category: 'Kubernetes',
      icon: 'Box',
      color: 'bg-purple-500'
    },
    {
      id: 5,
      name: 'OpenAI API',
      provider: 'saas',
      cost: 2150,
      change: 28.7,
      changeType: 'negative',
      usage: 94,
      category: 'AI/ML',
      icon: 'Brain',
      color: 'bg-pink-500'
    },
    {
      id: 6,
      name: 'CloudFront CDN',
      provider: 'aws',
      cost: 1680,
      change: 3.2,
      changeType: 'negative',
      usage: 56,
      category: 'Network',
      icon: 'Globe',
      color: 'bg-indigo-500'
    }
  ];

  const filteredServices = selectedProvider === 'all' 
    ? mockServices 
    : mockServices?.filter(service => service?.provider === selectedProvider);

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getUsageColor = (usage) => {
    if (usage >= 90) return 'bg-error';
    if (usage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Top Spending Services</h2>
          <p className="text-sm text-muted-foreground">Highest cost contributors this month</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e?.target?.value)}
            className="px-3 py-1 text-xs bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {providers?.map((provider) => (
              <option key={provider?.value} value={provider?.value}>
                {provider?.label}
              </option>
            ))}
          </select>
          <Button variant="ghost" size="icon">
            <Icon name="MoreVertical" size={16} />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredServices?.map((service, index) => (
          <div key={service?.id} className="flex items-center space-x-4 p-3 hover:bg-muted/30 rounded-lg transition-colors duration-150">
            <div className="flex items-center space-x-3 flex-1">
              <div className="relative">
                <div className={`w-10 h-10 ${service?.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={service?.icon} size={18} color="white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-background border border-border rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-foreground">{index + 1}</span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-foreground truncate">{service?.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                    {service?.category}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={service?.changeType === 'positive' ? 'TrendingDown' : 'TrendingUp'} 
                      size={12} 
                      className={getChangeColor(service?.changeType)} 
                    />
                    <span className={`text-xs font-medium ${getChangeColor(service?.changeType)}`}>
                      {Math.abs(service?.change)}%
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getUsageColor(service?.usage)} transition-all duration-300`}
                        style={{ width: `${service?.usage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{service?.usage}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">
                ${service?.cost?.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">this month</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="ArrowRight" iconPosition="right">
          View All Services
        </Button>
      </div>
    </div>
  );
};

export default TopSpendingServices;