import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InfrastructureTab = ({ application }) => {
  // Mock cloud infrastructure data
  const hostingDetails = {
    provider: 'AWS',
    region: 'us-east-1',
    environment: 'Production',
    vpc: 'vpc-12345678',
    subnets: ['subnet-abc123', 'subnet-def456', 'subnet-ghi789']
  };

  const resources = [
    {
      type: 'EC2 Instances',
      count: 6,
      details: '4x t3.large, 2x t3.xlarge',
      cost: '$142.50/month',
      status: 'Running'
    },
    {
      type: 'RDS Database',
      count: 2,
      details: 'db.t3.medium (Primary + Read Replica)',
      cost: '$89.20/month',
      status: 'Available'
    },
    {
      type: 'Load Balancers',
      count: 1,
      details: 'Application Load Balancer',
      cost: '$16.20/month',
      status: 'Active'
    },
    {
      type: 'CloudFront CDN',
      count: 1,
      details: 'Global distribution',
      cost: '$12.80/month',
      status: 'Deployed'
    },
    {
      type: 'S3 Storage',
      count: 3,
      details: 'Static assets, backups, logs',
      cost: '$23.45/month',
      status: 'Active'
    }
  ];

  const costAttribution = {
    total: '$284.15',
    breakdown: [
      { category: 'Compute', amount: '$142.50', percentage: 50.2 },
      { category: 'Database', amount: '$89.20', percentage: 31.4 },
      { category: 'Storage', amount: '$23.45', percentage: 8.3 },
      { category: 'Networking', amount: '$29.00', percentage: 10.1 }
    ]
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Running': 'bg-green-100 text-green-800 border-green-200',
      'Available': 'bg-green-100 text-green-800 border-green-200',
      'Active': 'bg-green-100 text-green-800 border-green-200',
      'Deployed': 'bg-blue-100 text-blue-800 border-blue-200',
      'Stopped': 'bg-red-100 text-red-800 border-red-200'
    };
    
    return statusStyles?.[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getResourceIcon = (type) => {
    const iconMap = {
      'EC2 Instances': 'Server',
      'RDS Database': 'Database',
      'Load Balancers': 'Network',
      'CloudFront CDN': 'Globe',
      'S3 Storage': 'HardDrive'
    };
    
    return iconMap?.[type] || 'Box';
  };

  return (
    <div className="space-y-8">
      {/* Hosting Details */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Hosting Details</h3>
            <p className="text-sm text-muted-foreground">Cloud provider and infrastructure configuration</p>
          </div>
          <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
            Manage Infrastructure
          </Button>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Cloud Provider</label>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="Cloud" size={16} className="text-orange-500" />
                <p className="text-foreground font-medium">{hostingDetails?.provider}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Region</label>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <p className="text-foreground">{hostingDetails?.region}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Environment</label>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="Settings" size={16} className="text-muted-foreground" />
                <p className="text-foreground">{hostingDetails?.environment}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">VPC ID</label>
              <p className="text-foreground font-mono mt-1">{hostingDetails?.vpc}</p>
            </div>
            
            <div className="lg:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Subnets</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {hostingDetails?.subnets?.map((subnet, index) => (
                  <span key={index} className="px-2 py-1 bg-muted/50 text-foreground text-sm rounded font-mono">
                    {subnet}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Allocation */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Resource Allocation</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {resources?.map((resource, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name={getResourceIcon(resource?.type)} size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{resource?.type}</h4>
                    <p className="text-xs text-muted-foreground">Count: {resource?.count}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(resource?.status)}`}>
                  {resource?.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Configuration:</span>
                  <p className="text-foreground mt-1">{resource?.details}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-muted-foreground">Monthly Cost:</span>
                  <span className="text-foreground font-semibold">{resource?.cost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Attribution */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Cost Attribution</h3>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-foreground">Total Monthly Cost</h4>
            <span className="text-2xl font-bold text-foreground">{costAttribution?.total}</span>
          </div>
          
          <div className="space-y-3">
            {costAttribution?.breakdown?.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{item?.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{item?.percentage}%</span>
                    <span className="text-sm font-semibold text-foreground">{item?.amount}</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${item?.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infrastructure Monitoring */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Infrastructure Monitoring</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { metric: 'CPU Utilization', value: '45%', status: 'Normal', icon: 'Cpu' },
            { metric: 'Memory Usage', value: '62%', status: 'Normal', icon: 'MemoryStick' },
            { metric: 'Network I/O', value: '12 GB/day', status: 'Normal', icon: 'Network' },
            { metric: 'Disk Usage', value: '78%', status: 'Warning', icon: 'HardDrive' },
            { metric: 'Database Connections', value: '23/100', status: 'Normal', icon: 'Database' },
            { metric: 'Response Time', value: '145ms', status: 'Normal', icon: 'Clock' }
          ]?.map((metric, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={metric?.icon} size={16} className="text-muted-foreground" />
                <h4 className="text-sm font-medium text-foreground">{metric?.metric}</h4>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">{metric?.value}</span>
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(metric?.status)}`}>
                  {metric?.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center space-x-4 pt-4 border-t border-border">
        <Button variant="primary" iconName="BarChart3" iconPosition="left">
          View Detailed Metrics
        </Button>
        <Button variant="outline" iconName="DollarSign" iconPosition="left">
          Cost Analysis
        </Button>
        <Button variant="outline" iconName="AlertTriangle" iconPosition="left">
          Set Alerts
        </Button>
        <Button variant="ghost" iconName="Download" iconPosition="left">
          Export Report
        </Button>
      </div>
    </div>
  );
};

export default InfrastructureTab;