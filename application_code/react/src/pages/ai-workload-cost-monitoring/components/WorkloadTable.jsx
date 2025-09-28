import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WorkloadTable = ({ viewMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('cost');
  const [sortDirection, setSortDirection] = useState('desc');

  // Mock workload data based on view mode
  const getWorkloadData = () => {
    switch (viewMode) {
      case 'training':
        return [
          {
            id: 1,
            name: 'GPT-4-Fine-Tune-v2',
            type: 'Fine-tuning',
            status: 'running',
            duration: '2h 45m',
            cost: 2340.50,
            efficiency: 87,
            resources: 'A100 x 8',
            project: 'NLP Research'
          },
          {
            id: 2,
            name: 'Vision-Transformer-Large',
            type: 'Training',
            status: 'completed',
            duration: '4h 12m',
            cost: 3200.25,
            efficiency: 92,
            resources: 'V100 x 16',
            project: 'Computer Vision'
          },
          {
            id: 3,
            name: 'BERT-Optimization-v3',
            type: 'Hyperparameter Tuning',
            status: 'failed',
            duration: '1h 23m',
            cost: 890.75,
            efficiency: 45,
            resources: 'T4 x 4',
            project: 'Text Analysis'
          },
          {
            id: 4,
            name: 'ResNet50-Transfer-Learning',
            type: 'Transfer Learning',
            status: 'queued',
            duration: '0h 0m',
            cost: 0,
            efficiency: 0,
            resources: 'A100 x 4',
            project: 'Image Classification'
          },
          {
            id: 5,
            name: 'Custom-LLM-Training',
            type: 'Training',
            status: 'running',
            duration: '6h 30m',
            cost: 4520.80,
            efficiency: 78,
            resources: 'H100 x 32',
            project: 'Language Models'
          }
        ];
      
      case 'inference':
        return [
          {
            id: 1,
            name: 'GPT-4-API-Endpoint',
            type: 'Language Model',
            status: 'active',
            requests: 15420,
            cost: 2340.50,
            latency: '120ms',
            resources: 'A100 x 2',
            project: 'Production API'
          },
          {
            id: 2,
            name: 'Image-Classification-Service',
            type: 'Computer Vision',
            status: 'active',
            requests: 8920,
            cost: 890.25,
            latency: '45ms',
            resources: 'V100 x 1',
            project: 'Mobile App'
          },
          {
            id: 3,
            name: 'Recommendation-Engine',
            type: 'ML Pipeline',
            status: 'scaling',
            requests: 12100,
            cost: 1210.75,
            latency: '80ms',
            resources: 'T4 x 4',
            project: 'E-commerce'
          },
          {
            id: 4,
            name: 'Fraud-Detection-Model',
            type: 'Classification',
            status: 'active',
            requests: 6800,
            cost: 680.50,
            latency: '25ms',
            resources: 'CPU x 8',
            project: 'Finance'
          }
        ];
      
      case 'resources':
        return [
          {
            id: 1,
            name: 'ml-cluster-prod-01',
            type: 'GPU Cluster',
            status: 'active',
            utilization: 87,
            cost: 12340.50,
            capacity: '32x A100',
            resources: 'A100 x 32',
            project: 'Production'
          },
          {
            id: 2,
            name: 'training-node-02',
            type: 'Training Instance',
            status: 'idle',
            utilization: 12,
            cost: 890.25,
            capacity: '8x V100',
            resources: 'V100 x 8',
            project: 'Development'
          },
          {
            id: 3,
            name: 'inference-pool-03',
            type: 'Inference Pool',
            status: 'scaling',
            utilization: 78,
            cost: 2210.75,
            capacity: '16x T4',
            resources: 'T4 x 16',
            project: 'Staging'
          }
        ];
      
      default:
        return [];
    }
  };

  const workloadData = getWorkloadData();

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': case'active': return 'text-success bg-success/10';
      case 'completed': return 'text-primary bg-primary/10';
      case 'failed': return 'text-error bg-error/10';
      case 'queued': return 'text-warning bg-warning/10';
      case 'scaling': return 'text-orange-500 bg-orange-500/10';
      case 'idle': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 80) return 'text-success';
    if (efficiency >= 60) return 'text-warning';
    if (efficiency > 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const filteredWorkloads = workloadData?.filter(workload =>
    workload?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    workload?.project?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    workload?.type?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const sortedWorkloads = [...filteredWorkloads]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getTableColumns = () => {
    switch (viewMode) {
      case 'training':
        return [
          { key: 'name', label: 'Job Name' },
          { key: 'type', label: 'Type' },
          { key: 'status', label: 'Status' },
          { key: 'duration', label: 'Duration' },
          { key: 'cost', label: 'Cost' },
          { key: 'efficiency', label: 'Efficiency' },
          { key: 'resources', label: 'Resources' },
          { key: 'actions', label: 'Actions' }
        ];
      case 'inference':
        return [
          { key: 'name', label: 'Endpoint Name' },
          { key: 'type', label: 'Type' },
          { key: 'status', label: 'Status' },
          { key: 'requests', label: 'Requests' },
          { key: 'cost', label: 'Cost' },
          { key: 'latency', label: 'Latency' },
          { key: 'resources', label: 'Resources' },
          { key: 'actions', label: 'Actions' }
        ];
      case 'resources':
        return [
          { key: 'name', label: 'Resource Name' },
          { key: 'type', label: 'Type' },
          { key: 'status', label: 'Status' },
          { key: 'utilization', label: 'Utilization' },
          { key: 'cost', label: 'Cost' },
          { key: 'capacity', label: 'Capacity' },
          { key: 'project', label: 'Project' },
          { key: 'actions', label: 'Actions' }
        ];
      default:
        return [];
    }
  };

  const columns = getTableColumns();

  const renderCellValue = (workload, column) => {
    switch (column?.key) {
      case 'name':
        return (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon 
                name={
                  viewMode === 'training' ? 'BookOpen' :
                  viewMode === 'inference'? 'Play' : 'Server'
                } 
                size={18} 
                className="text-primary" 
              />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{workload?.name}</div>
              <div className="text-xs text-muted-foreground">{workload?.project}</div>
            </div>
          </div>
        );
      
      case 'status':
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workload?.status)}`}>
            {workload?.status}
          </span>
        );
      
      case 'cost':
        return (
          <div className="text-sm font-medium text-foreground">
            {formatCurrency(workload?.cost)}
          </div>
        );
      
      case 'efficiency':
        return workload?.efficiency > 0 ? (
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted rounded-full h-2 w-16">
              <div 
                className={`h-2 rounded-full ${getEfficiencyColor(workload?.efficiency) === 'text-success' ? 'bg-success' :
                  getEfficiencyColor(workload?.efficiency) === 'text-warning' ? 'bg-warning' : 'bg-error'}`}
                style={{ width: `${workload?.efficiency}%` }}
              />
            </div>
            <span className={`text-sm font-medium ${getEfficiencyColor(workload?.efficiency)}`}>
              {workload?.efficiency}%
            </span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">-</span>
        );
      
      case 'utilization':
        return (
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted rounded-full h-2 w-16">
              <div 
                className={`h-2 rounded-full ${
                  workload?.utilization >= 80 ? 'bg-success' :
                  workload?.utilization >= 60 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${workload?.utilization}%` }}
              />
            </div>
            <span className={`text-sm font-medium ${
              workload?.utilization >= 80 ? 'text-success' :
              workload?.utilization >= 60 ? 'text-warning' : 'text-error'
            }`}>
              {workload?.utilization}%
            </span>
          </div>
        );
      
      case 'requests':
        return (
          <div className="text-sm font-medium text-foreground">
            {workload?.requests?.toLocaleString()}
          </div>
        );
      
      case 'actions':
        return (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Play" />
            <Button variant="ghost" size="sm" iconName="Square" />
            <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
          </div>
        );
      
      default:
        return (
          <div className="text-sm text-foreground">
            {workload?.[column?.key]}
          </div>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h2 className="text-lg font-semibold text-foreground">
            {viewMode === 'training' ? 'AI Training Jobs' :
             viewMode === 'inference'? 'Model Serving Endpoints' : 'ML Infrastructure Resources'}
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search workloads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pl-10 w-80"
              />
            </div>
            
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {columns?.map((column) => (
                <th key={column?.key} className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {column?.key !== 'actions' ? (
                    <button
                      onClick={() => handleSort(column?.key)}
                      className="flex items-center space-x-1 hover:text-foreground transition-colors"
                    >
                      <span>{column?.label}</span>
                      <Icon name="ArrowUpDown" size={14} />
                    </button>
                  ) : (
                    <span>{column?.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedWorkloads?.map((workload) => (
              <tr key={workload?.id} className="hover:bg-muted/50 transition-colors">
                {columns?.map((column) => (
                  <td key={column?.key} className="px-6 py-4">
                    {renderCellValue(workload, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkloadTable;