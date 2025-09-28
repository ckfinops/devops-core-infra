import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetBreakdownTree = () => {
  const [expandedNodes, setExpandedNodes] = useState(['root', 'engineering', 'aws']);
  const [editingNode, setEditingNode] = useState(null);
  const [editValue, setEditValue] = useState('');

  const budgetTree = [
    {
      id: 'engineering',
      name: 'Engineering Department',
      type: 'department',
      allocated: 1200000,
      spent: 820000,
      variance: -380000,
      status: 'under',
      children: [
        {
          id: 'aws',
          name: 'AWS Infrastructure',
          type: 'provider',
          allocated: 500000,
          spent: 340000,
          variance: -160000,
          status: 'under',
          children: [
            {
              id: 'ec2',
              name: 'EC2 Instances',
              type: 'service',
              allocated: 200000,
              spent: 145000,
              variance: -55000,
              status: 'under'
            },
            {
              id: 'rds',
              name: 'RDS Databases',
              type: 'service',
              allocated: 150000,
              spent: 98000,
              variance: -52000,
              status: 'under'
            },
            {
              id: 's3',
              name: 'S3 Storage',
              type: 'service',
              allocated: 80000,
              spent: 52000,
              variance: -28000,
              status: 'under'
            }
          ]
        },
        {
          id: 'azure',
          name: 'Azure Services',
          type: 'provider',
          allocated: 300000,
          spent: 215000,
          variance: -85000,
          status: 'under',
          children: [
            {
              id: 'aks',
              name: 'AKS Clusters',
              type: 'service',
              allocated: 150000,
              spent: 110000,
              variance: -40000,
              status: 'under'
            },
            {
              id: 'cosmosdb',
              name: 'Cosmos DB',
              type: 'service',
              allocated: 100000,
              spent: 75000,
              variance: -25000,
              status: 'under'
            }
          ]
        },
        {
          id: 'saas',
          name: 'SaaS Subscriptions',
          type: 'category',
          allocated: 400000,
          spent: 265000,
          variance: -135000,
          status: 'under',
          children: [
            {
              id: 'github',
              name: 'GitHub Enterprise',
              type: 'service',
              allocated: 120000,
              spent: 95000,
              variance: -25000,
              status: 'under'
            },
            {
              id: 'datadog',
              name: 'Datadog Monitoring',
              type: 'service',
              allocated: 80000,
              spent: 68000,
              variance: -12000,
              status: 'under'
            }
          ]
        }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing Department',
      type: 'department',
      allocated: 800000,
      spent: 620000,
      variance: -180000,
      status: 'under',
      children: [
        {
          id: 'analytics',
          name: 'Analytics Tools',
          type: 'category',
          allocated: 200000,
          spent: 165000,
          variance: -35000,
          status: 'under'
        },
        {
          id: 'advertising',
          name: 'Digital Advertising',
          type: 'category',
          allocated: 600000,
          spent: 455000,
          variance: -145000,
          status: 'under'
        }
      ]
    }
  ];

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => 
      prev?.includes(nodeId) 
        ? prev?.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const startEditing = (node) => {
    setEditingNode(node?.id);
    setEditValue(node?.allocated?.toString());
  };

  const saveEdit = (nodeId) => {
    // In a real app, this would update the backend
    console.log(`Updating budget for ${nodeId} to ${editValue}`);
    setEditingNode(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingNode(null);
    setEditValue('');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'over': return 'text-error';
      case 'under': return 'text-success';
      case 'on-track': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'over': return 'TrendingUp';
      case 'under': return 'TrendingDown';
      case 'on-track': return 'Minus';
      default: return 'AlertCircle';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'department': return 'Building';
      case 'provider': return 'Cloud';
      case 'category': return 'Folder';
      case 'service': return 'Server';
      default: return 'Circle';
    }
  };

  const renderNode = (node, level = 0) => {
    const isExpanded = expandedNodes?.includes(node?.id);
    const hasChildren = node?.children && node?.children?.length > 0;
    const spentPercentage = (node?.spent / node?.allocated) * 100;

    return (
      <div key={node?.id} className="mb-2">
        <div 
          className={`flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors duration-150 ${
            level > 0 ? 'ml-6' : ''
          }`}
          style={{ marginLeft: `${level * 24}px` }}
        >
          <div className="flex items-center space-x-3 flex-1">
            {hasChildren ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleNode(node?.id)}
                className="w-6 h-6"
              >
                <Icon 
                  name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                  size={16} 
                />
              </Button>
            ) : (
              <div className="w-6 h-6"></div>
            )}
            
            <Icon 
              name={getTypeIcon(node?.type)} 
              size={18} 
              className="text-muted-foreground" 
            />
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-card-foreground">{node?.name}</span>
                <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground capitalize">
                  {node?.type}
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <div className="w-32 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      spentPercentage > 90 ? 'bg-error' : 
                      spentPercentage > 75 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {spentPercentage?.toFixed(1)}% spent
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="flex items-center space-x-2">
                {editingNode === node?.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e?.target?.value)}
                      className="w-24 px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => saveEdit(node?.id)}
                      className="w-6 h-6"
                    >
                      <Icon name="Check" size={14} className="text-success" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={cancelEdit}
                      className="w-6 h-6"
                    >
                      <Icon name="X" size={14} className="text-error" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="text-sm font-medium text-card-foreground">
                      {formatCurrency(node?.allocated)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditing(node)}
                      className="w-6 h-6"
                    >
                      <Icon name="Edit2" size={14} />
                    </Button>
                  </>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Allocated
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-card-foreground">
                {formatCurrency(node?.spent)}
              </div>
              <div className="text-xs text-muted-foreground">
                Spent
              </div>
            </div>

            <div className="text-right">
              <div className={`flex items-center space-x-1 text-sm font-medium ${getStatusColor(node?.status)}`}>
                <Icon name={getStatusIcon(node?.status)} size={14} />
                <span>{formatCurrency(Math.abs(node?.variance))}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {node?.status === 'under' ? 'Under' : 'Over'} budget
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <Icon name="MessageSquare" size={14} />
              </Button>
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <Icon name="MoreHorizontal" size={14} />
              </Button>
            </div>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-2">
            {node?.children?.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Budget Breakdown</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Hierarchical view with editable allocations and approval workflows
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="outline" size="sm" iconName="Upload">
            Import
          </Button>
          <Button variant="default" size="sm" iconName="Plus">
            Add Category
          </Button>
        </div>
      </div>
      {/* Column Headers */}
      <div className="flex items-center justify-between p-3 border-b border-border mb-4">
        <div className="flex-1">
          <span className="text-sm font-medium text-muted-foreground">Category / Service</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right w-24">
            <span className="text-sm font-medium text-muted-foreground">Allocated</span>
          </div>
          <div className="text-right w-24">
            <span className="text-sm font-medium text-muted-foreground">Spent</span>
          </div>
          <div className="text-right w-24">
            <span className="text-sm font-medium text-muted-foreground">Variance</span>
          </div>
          <div className="w-16"></div>
        </div>
      </div>
      {/* Budget Tree */}
      <div className="space-y-2">
        {budgetTree?.map(node => renderNode(node))}
      </div>
      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-card-foreground">$2,000,000</div>
            <div className="text-sm text-muted-foreground">Total Allocated</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-card-foreground">$1,440,000</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </div>
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <div className="text-2xl font-bold text-success">$560,000</div>
            <div className="text-sm text-muted-foreground">Total Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetBreakdownTree;