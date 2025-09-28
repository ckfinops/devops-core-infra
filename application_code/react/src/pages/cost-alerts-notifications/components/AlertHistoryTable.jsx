import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AlertHistoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState('triggered');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');

  const alertHistory = [
    {
      id: 1,
      alertName: "AWS EC2 Budget Exceeded",
      severity: "critical",
      resource: "Production Environment",
      triggered: "2025-08-23 09:30:00",
      resolved: "2025-08-23 11:15:00",
      status: "resolved",
      responseTime: "1h 45m",
      resolvedBy: "John Doe",
      action: "Budget increased, instances rightsized",
      costImpact: "$1,240",
      category: "Budget Management"
    },
    {
      id: 2,
      alertName: "Azure Compute Anomaly",
      severity: "high",
      resource: "Development Cluster",
      triggered: "2025-08-23 07:20:00",
      resolved: "2025-08-23 08:45:00",
      status: "resolved",
      responseTime: "1h 25m",
      resolvedBy: "Jane Smith",
      action: "Identified runaway process, terminated instances",
      costImpact: "$890",
      category: "Anomaly Detection"
    },
    {
      id: 3,
      alertName: "GCP Storage Cost Increase",
      severity: "medium",
      resource: "Data Lake Storage",
      triggered: "2025-08-23 05:10:00",
      resolved: "2025-08-23 06:30:00",
      status: "resolved",
      responseTime: "1h 20m",
      resolvedBy: "Mike Wilson",
      action: "Implemented lifecycle policies, archived old data",
      costImpact: "$450",
      category: "Storage Optimization"
    },
    {
      id: 4,
      alertName: "Kubernetes Resource Waste",
      severity: "medium",
      resource: "Staging Cluster",
      triggered: "2025-08-22 22:45:00",
      resolved: "2025-08-23 00:15:00",
      status: "resolved",
      responseTime: "1h 30m",
      resolvedBy: "Sarah Johnson",
      action: "Scaled down unused pods, optimized resource requests",
      costImpact: "$320",
      category: "Resource Optimization"
    },
    {
      id: 5,
      alertName: "SaaS License Overage",
      severity: "low",
      resource: "Monitoring Tools",
      triggered: "2025-08-22 20:30:00",
      resolved: "2025-08-22 21:00:00",
      status: "resolved",
      responseTime: "30m",
      resolvedBy: "Alex Chen",
      action: "Removed inactive users, optimized license allocation",
      costImpact: "$180",
      category: "License Management"
    },
    {
      id: 6,
      alertName: "AWS Lambda Cold Start Costs",
      severity: "low",
      resource: "Serverless Functions",
      triggered: "2025-08-22 18:15:00",
      resolved: null,
      status: "investigating",
      responseTime: "17h 24m",
      resolvedBy: null,
      action: "Analysis in progress",
      costImpact: "$95",
      category: "Performance Optimization"
    },
    {
      id: 7,
      alertName: "Multi-Cloud Cost Spike",
      severity: "critical",
      resource: "All Environments",
      triggered: "2025-08-22 16:00:00",
      resolved: "2025-08-22 18:30:00",
      status: "resolved",
      responseTime: "2h 30m",
      resolvedBy: "John Doe",
      action: "Identified DDoS attack, implemented auto-scaling limits",
      costImpact: "$2,150",
      category: "Security Incident"
    },
    {
      id: 8,
      alertName: "Database Storage Growth",
      severity: "medium",
      resource: "RDS Instances",
      triggered: "2025-08-22 14:20:00",
      resolved: "2025-08-22 15:45:00",
      status: "resolved",
      responseTime: "1h 25m",
      resolvedBy: "Maria Garcia",
      action: "Implemented data archiving, optimized queries",
      costImpact: "$680",
      category: "Database Optimization"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10';
      case 'high': return 'text-warning bg-warning/10';
      case 'medium': return 'text-accent bg-accent/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-success bg-success/10';
      case 'investigating': return 'text-warning bg-warning/10';
      case 'acknowledged': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredData = alertHistory?.filter(alert => 
    filterStatus === 'all' || alert?.status === filterStatus
  );

  const sortedData = [...filteredData]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'triggered' || sortField === 'resolved') {
      aValue = new Date(aValue || 0);
      bValue = new Date(bValue || 0);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedData = sortedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Alert History</h2>
          <div className="flex items-center space-x-3">
            <Select
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'resolved', label: 'Resolved' },
                { value: 'investigating', label: 'Investigating' },
                { value: 'acknowledged', label: 'Acknowledged' }
              ]}
              value={filterStatus}
              onChange={setFilterStatus}
              className="w-40"
            />
            <Button variant="outline" size="sm" iconName="Download">
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
                  onClick={() => handleSort('alertName')}
                  className="flex items-center space-x-1 hover:text-primary"
                >
                  <span>Alert Name</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  onClick={() => handleSort('severity')}
                  className="flex items-center space-x-1 hover:text-primary"
                >
                  <span>Severity</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Resource</th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  onClick={() => handleSort('triggered')}
                  className="flex items-center space-x-1 hover:text-primary"
                >
                  <span>Triggered</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">Response Time</th>
              <th className="text-left p-4 font-medium text-foreground">Cost Impact</th>
              <th className="text-left p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData?.map((alert) => (
              <tr key={alert?.id} className="hover:bg-muted/30 transition-colors duration-150">
                <td className="p-4">
                  <div>
                    <div className="font-medium text-foreground">{alert?.alertName}</div>
                    <div className="text-sm text-muted-foreground">{alert?.category}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert?.severity)}`}>
                    {alert?.severity?.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-sm text-foreground">{alert?.resource}</td>
                <td className="p-4 text-sm text-foreground">
                  {new Date(alert.triggered)?.toLocaleString()}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert?.status)}`}>
                    {alert?.status?.charAt(0)?.toUpperCase() + alert?.status?.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-sm text-foreground">{alert?.responseTime}</td>
                <td className="p-4 text-sm font-medium text-error">{alert?.costImpact}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MessageSquare">
                      Notes
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData?.length)} of {sortedData?.length} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
          >
            Previous
          </Button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertHistoryTable;