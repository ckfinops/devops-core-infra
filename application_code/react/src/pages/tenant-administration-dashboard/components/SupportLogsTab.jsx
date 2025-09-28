import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { MessageSquare, AlertTriangle, CheckCircle, Clock, Search, Download } from 'lucide-react';

const SupportLogsTab = ({ tenantId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [logType, setLogType] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  // Mock support tickets and logs
  const supportTickets = [
    {
      id: 'ST-001',
      title: 'AWS Connection Issues',
      status: 'Open',
      priority: 'High',
      assignee: 'Support Team',
      created: '2025-01-19T08:30:00Z',
      updated: '2025-01-19T10:15:00Z',
      description: 'Client experiencing intermittent connection issues with AWS EC2 instances'
    },
    {
      id: 'ST-002',
      title: 'User Access Request',
      status: 'In Progress',
      priority: 'Medium',
      assignee: 'John Smith',
      created: '2025-01-18T14:20:00Z',
      updated: '2025-01-19T09:45:00Z',
      description: 'Request to add new user with Analyst Level permissions'
    },
    {
      id: 'ST-003',
      title: 'Cost Anomaly Alert',
      status: 'Resolved',
      priority: 'Low',
      assignee: 'Jane Doe',
      created: '2025-01-17T16:10:00Z',
      updated: '2025-01-18T11:30:00Z',
      description: 'Investigation of unexpected cost spike in GCP services'
    }
  ];

  const auditLogs = [
    {
      id: 'AL-001',
      timestamp: '2025-01-19T10:30:00Z',
      user: 'c3ops-admin',
      action: 'User Impersonation',
      resource: 'joel.kummari',
      details: 'Impersonated user for troubleshooting session',
      status: 'Success'
    },
    {
      id: 'AL-002',
      timestamp: '2025-01-19T09:15:00Z',
      user: 'c3ops-admin',
      action: 'Configuration Change',
      resource: 'AWS Connection Settings',
      details: 'Updated connection timeout parameters',
      status: 'Success'
    },
    {
      id: 'AL-003',
      timestamp: '2025-01-19T08:45:00Z',
      user: 'system',
      action: 'Health Check',
      resource: 'All Cloud Connections',
      details: 'Automated health check completed',
      status: 'Warning'
    }
  ];

  const logTypeOptions = [
    { value: 'all', label: 'All Logs' },
    { value: 'support', label: 'Support Tickets' },
    { value: 'audit', label: 'Audit Logs' },
    { value: 'system', label: 'System Logs' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open': case'In Progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Resolved': case'Success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': case'Success':
        return 'bg-green-100 text-green-800';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Support & Logs</h2>
          <p className="text-sm text-gray-600">Manage support tickets and view audit trails</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Logs</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Create Ticket</span>
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search tickets and logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="pl-10"
          />
        </div>
        <Select
          options={logTypeOptions}
          value={logType}
          onChange={setLogType}
          className="w-48"
        />
        <Select
          options={timeRangeOptions}
          value={timeRange}
          onChange={setTimeRange}
          className="w-48"
        />
      </div>
      {/* Support Tickets */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Support Tickets</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {supportTickets?.map((ticket) => (
            <div key={ticket?.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(ticket?.status)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">{ticket?.title}</h4>
                      <span className="text-sm text-gray-500">#{ticket?.id}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{ticket?.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Assignee: {ticket?.assignee}</span>
                      <span>Created: {formatTimestamp(ticket?.created)}</span>
                      <span>Updated: {formatTimestamp(ticket?.updated)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket?.priority)}`}>
                    {ticket?.priority}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket?.status)}`}>
                    {ticket?.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Audit Logs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Audit Trail</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {auditLogs?.map((log) => (
            <div key={log?.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(log?.status)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">{log?.action}</h4>
                      <span className="text-sm text-gray-500">• {log?.resource}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{log?.details}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>User: {log?.user}</span>
                      <span>Time: {formatTimestamp(log?.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log?.status)}`}>
                  {log?.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {supportTickets?.filter(t => t?.status === 'Open')?.length}
          </div>
          <div className="text-sm text-gray-600">Open Tickets</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {supportTickets?.filter(t => t?.status === 'In Progress')?.length}
          </div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-green-600">
            {supportTickets?.filter(t => t?.status === 'Resolved')?.length}
          </div>
          <div className="text-sm text-gray-600">Resolved Today</div>
        </div>
      </div>
    </div>
  );
};

export default SupportLogsTab;