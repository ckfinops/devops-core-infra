import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CostBreakdownTable = ({ data }) => {
  const [sortField, setSortField] = useState('cost');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData?.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const formatUsage = (usage, unit) => {
    return `${usage?.toLocaleString()} ${unit}`;
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 80) return 'text-success';
    if (efficiency >= 60) return 'text-warning';
    return 'text-error';
  };

  const getEfficiencyBg = (efficiency) => {
    if (efficiency >= 80) return 'bg-success/10';
    if (efficiency >= 60) return 'bg-warning/10';
    return 'bg-error/10';
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

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Detailed Cost Breakdown</h3>
            <p className="text-sm text-muted-foreground">
              Service-level analysis across all cloud providers
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Icon name="Filter" size={16} className="mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('service')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Service</span>
                  <SortIcon field="service" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('provider')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Provider</span>
                  <SortIcon field="provider" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('region')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Region</span>
                  <SortIcon field="region" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('cost')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors ml-auto"
                >
                  <span>Cost</span>
                  <SortIcon field="cost" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('usage')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors ml-auto"
                >
                  <span>Usage</span>
                  <SortIcon field="usage" />
                </button>
              </th>
              <th className="text-center p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('efficiency')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors mx-auto"
                >
                  <span>Efficiency</span>
                  <SortIcon field="efficiency" />
                </button>
              </th>
              <th className="text-center p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name="Box" size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item?.service}</p>
                      <p className="text-sm text-muted-foreground">{item?.resourceType}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getProviderIcon(item?.provider)} 
                      size={16} 
                      className={getProviderColor(item?.provider)} 
                    />
                    <span className="font-medium text-foreground">{item?.provider}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-foreground">{item?.region}</span>
                </td>
                <td className="p-4 text-right">
                  <div>
                    <p className="font-semibold text-foreground">{formatCurrency(item?.cost)}</p>
                    <p className={`text-sm ${item?.costChange >= 0 ? 'text-error' : 'text-success'}`}>
                      {item?.costChange >= 0 ? '+' : ''}{item?.costChange}%
                    </p>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <span className="text-foreground">{formatUsage(item?.usage, item?.usageUnit)}</span>
                </td>
                <td className="p-4 text-center">
                  <div className="inline-flex items-center justify-center">
                    <div className={`px-3 py-1 rounded-full ${getEfficiencyBg(item?.efficiency)}`}>
                      <span className={`text-sm font-medium ${getEfficiencyColor(item?.efficiency)}`}>
                        {item?.efficiency}%
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="Settings" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData?.length)} of {sortedData?.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdownTable;