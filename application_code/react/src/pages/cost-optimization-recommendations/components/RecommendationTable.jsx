import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationTable = ({ recommendations, onImplement, onViewDetails }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: 'savings', direction: 'desc' });

  const toggleRowExpansion = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(id)) {
      newExpanded?.delete(id);
    } else {
      newExpanded?.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const toggleRowSelection = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected?.has(id)) {
      newSelected?.delete(id);
    } else {
      newSelected?.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedRows?.size === recommendations?.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(recommendations.map(r => r.id)));
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedRecommendations = () => {
    return [...recommendations]?.sort((a, b) => {
      if (sortConfig?.key === 'savings') {
        const aValue = parseFloat(a?.potentialSavings?.replace(/[$,]/g, ''));
        const bValue = parseFloat(b?.potentialSavings?.replace(/[$,]/g, ''));
        return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (sortConfig?.key === 'effort') {
        const effortOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
        const aValue = effortOrder?.[a?.effort];
        const bValue = effortOrder?.[b?.effort];
        return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return sortConfig?.direction === 'asc' 
        ? a?.[sortConfig?.key]?.localeCompare(b?.[sortConfig?.key])
        : b?.[sortConfig?.key]?.localeCompare(a?.[sortConfig?.key]);
    });
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'High': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getEffortColor = (effort) => {
    switch (effort) {
      case 'Low': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'High': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Rightsizing': return 'Zap';
      case 'Reserved Instance': return 'Shield';
      case 'Unused Resource': return 'Trash2';
      case 'Storage Optimization': return 'HardDrive';
      case 'Network Optimization': return 'Wifi';
      default: return 'Settings';
    }
  };

  const sortedRecommendations = getSortedRecommendations();

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedRows?.size === recommendations?.length}
                onChange={toggleSelectAll}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-muted-foreground">
                {selectedRows?.size > 0 ? `${selectedRows?.size} selected` : 'Select all'}
              </span>
            </div>
            {selectedRows?.size > 0 && (
              <Button variant="outline" size="sm" iconName="Play" iconPosition="left">
                Implement Selected ({selectedRows?.size})
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="ghost" size="sm" iconName="Filter">
              Filter
            </Button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20">
            <tr>
              <th className="w-12 px-6 py-3"></th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('type')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Recommendation</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('resource')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Affected Resources</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('savings')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Potential Savings</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('effort')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Effort</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('risk')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Risk</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedRecommendations?.map((recommendation) => (
              <React.Fragment key={recommendation?.id}>
                <tr className="hover:bg-muted/30 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedRows?.has(recommendation?.id)}
                        onChange={() => toggleRowSelection(recommendation?.id)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                      />
                      <button
                        onClick={() => toggleRowExpansion(recommendation?.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Icon 
                          name={expandedRows?.has(recommendation?.id) ? "ChevronDown" : "ChevronRight"} 
                          size={16} 
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name={getTypeIcon(recommendation?.type)} size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{recommendation?.type}</div>
                        <div className="text-sm text-muted-foreground">{recommendation?.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground">{recommendation?.resource}</div>
                    <div className="text-xs text-muted-foreground">{recommendation?.resourceCount} resources</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{recommendation?.potentialSavings}</div>
                    <div className="text-xs text-muted-foreground">{recommendation?.savingsPercentage}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEffortColor(recommendation?.effort)}`}>
                      {recommendation?.effort}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(recommendation?.risk)}`}>
                      {recommendation?.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(recommendation)}
                        iconName="Eye"
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onImplement(recommendation)}
                        iconName="Play"
                      >
                        Implement
                      </Button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Row Details - Fixed text overflow */}
                {expandedRows?.has(recommendation?.id) && (
                  <tr>
                    <td colSpan="7" className="px-4 lg:px-6 py-4 bg-muted/20">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                          <div className="min-w-0">
                            <h4 className="font-medium text-foreground mb-2">Analysis</h4>
                            <div className="bg-background/50 rounded-lg p-3 border border-border">
                              <p className="text-sm text-muted-foreground leading-relaxed break-words">
                                {recommendation?.analysis}
                              </p>
                            </div>
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-medium text-foreground mb-2">Implementation Steps</h4>
                            <div className="bg-background/50 rounded-lg p-3 border border-border max-h-48 overflow-y-auto">
                              <ol className="text-sm text-muted-foreground space-y-2">
                                {recommendation?.steps?.map((step, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <span className="text-primary font-medium flex-shrink-0 mt-0.5">{index + 1}.</span>
                                    <span className="break-words">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Expected Timeline</div>
                            <div className="font-medium text-foreground">{recommendation?.timeline}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Confidence Level</div>
                            <div className="font-medium text-foreground">{recommendation?.confidence}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Impact Score</div>
                            <div className="font-medium text-foreground">{recommendation?.impactScore}/10</div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecommendationTable;