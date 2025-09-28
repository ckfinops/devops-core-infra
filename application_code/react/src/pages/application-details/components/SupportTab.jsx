import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupportTab = ({ application }) => {
  // Mock support data
  const documentationLinks = [
    {
      title: 'User Manual',
      description: 'Complete user guide and feature documentation',
      url: '/docs/user-manual',
      type: 'PDF',
      lastUpdated: '2025-01-05'
    },
    {
      title: 'API Documentation',
      description: 'REST API endpoints and integration guide',
      url: '/docs/api-reference',
      type: 'Web',
      lastUpdated: '2025-01-03'
    },
    {
      title: 'Troubleshooting Guide',
      description: 'Common issues and resolution steps',
      url: '/docs/troubleshooting',
      type: 'Web',
      lastUpdated: '2024-12-28'
    },
    {
      title: 'Architecture Documentation',
      description: 'System architecture and design decisions',
      url: '/docs/architecture',
      type: 'PDF',
      lastUpdated: '2024-12-20'
    }
  ];

  const contactInformation = [
    {
      role: 'Tech Stack Owner',
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      availability: '9 AM - 6 PM EST'
    },
    {
      role: 'IT Owner',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 234-5678',
      availability: '24/7 On-Call'
    },
    {
      role: 'Functional Owner',
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      phone: '+1 (555) 345-6789',
      availability: '8 AM - 5 PM EST'
    }
  ];

  const troubleshootingResources = [
    {
      title: 'Login Issues',
      description: 'Unable to access the application',
      solutions: [
        'Clear browser cache and cookies',
        'Try incognito/private browsing mode',
        'Contact IT support for password reset'
      ]
    },
    {
      title: 'Performance Issues',
      description: 'Application running slowly',
      solutions: [
        'Check internet connection speed',
        'Close other browser tabs/applications',
        'Report to technical team if persistent'
      ]
    },
    {
      title: 'Feature Not Working',
      description: 'Specific functionality unavailable',
      solutions: [
        'Check user permissions and access rights',
        'Verify feature is enabled for your account',
        'Contact functional owner for assistance'
      ]
    }
  ];

  const supportTickets = [
    {
      id: 'SUP-2025-001',
      title: 'Dashboard loading issue',
      priority: 'High',
      status: 'In Progress',
      assignee: 'John Smith',
      created: '2025-01-08',
      lastUpdate: '2025-01-09'
    },
    {
      id: 'SUP-2025-002',
      title: 'API rate limit exceeded',
      priority: 'Medium',
      status: 'Resolved',
      assignee: 'Sarah Johnson',
      created: '2025-01-07',
      lastUpdate: '2025-01-08'
    },
    {
      id: 'SUP-2024-156',
      title: 'Feature enhancement request',
      priority: 'Low',
      status: 'Open',
      assignee: 'Mike Davis',
      created: '2024-12-28',
      lastUpdate: '2025-01-02'
    }
  ];

  const getDocumentIcon = (type) => {
    const iconMap = {
      'PDF': 'FileText',
      'Web': 'Globe',
      'Video': 'Play'
    };
    
    return iconMap?.[type] || 'File';
  };

  const getPriorityBadge = (priority) => {
    const priorityStyles = {
      'High': 'bg-red-100 text-red-800 border-red-200',
      'Medium': 'bg-orange-100 text-orange-800 border-orange-200',
      'Low': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    
    return priorityStyles?.[priority] || priorityStyles?.['Low'];
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Open': 'bg-blue-100 text-blue-800 border-blue-200',
      'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Resolved': 'bg-green-100 text-green-800 border-green-200',
      'Closed': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return statusStyles?.[status] || statusStyles?.['Open'];
  };

  return (
    <div className="space-y-8">
      {/* Documentation Links */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Documentation</h3>
            <p className="text-sm text-muted-foreground">User guides, API docs, and technical documentation</p>
          </div>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Add Document
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {documentationLinks?.map((doc, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-shadow h-full">
              <div className="flex items-start space-x-4 h-full">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={getDocumentIcon(doc?.type)} size={20} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">{doc?.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{doc?.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">Updated: {doc?.lastUpdated}</span>
                      <span className="px-2 py-1 text-xs bg-muted rounded">{doc?.type}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      iconName="ExternalLink"
                      onClick={() => window.open(doc?.url, '_blank')}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-6">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactInformation?.map((contact, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6 h-full">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{contact?.name}</h4>
                  <p className="text-sm text-muted-foreground">{contact?.role}</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} className="text-muted-foreground flex-shrink-0" />
                  <a 
                    href={`mailto:${contact?.email}`} 
                    className="text-primary hover:underline flex-1 truncate"
                  >
                    {contact?.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-muted-foreground flex-shrink-0" />
                  <a 
                    href={`tel:${contact?.phone}`} 
                    className="text-primary hover:underline"
                  >
                    {contact?.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground">{contact?.availability}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting Resources */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-6">Troubleshooting Resources</h3>
        <div className="space-y-6">
          {troubleshootingResources?.map((issue, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="AlertCircle" size={20} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground mb-2">{issue?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{issue?.description}</p>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">Solutions:</p>
                    <ul className="space-y-2">
                      {issue?.solutions?.map((solution, sIndex) => (
                        <li key={sIndex} className="flex items-start space-x-2">
                          <Icon name="ChevronRight" size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Tickets */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Support Tickets</h3>
            <p className="text-sm text-muted-foreground">Open and recent support requests</p>
          </div>
          <Button variant="primary" size="sm" iconName="Plus" iconPosition="left">
            Create Ticket
          </Button>
        </div>
        
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Ticket ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Assignee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Last Update
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {supportTickets?.map((ticket, index) => (
                  <tr key={index} className="hover:bg-muted/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-primary">{ticket?.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground">{ticket?.title}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs rounded-full border ${getPriorityBadge(ticket?.priority)}`}>
                        {ticket?.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs rounded-full border ${getStatusBadge(ticket?.status)}`}>
                        {ticket?.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-foreground">{ticket?.assignee}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-muted-foreground">{ticket?.lastUpdate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <Icon name="AlertTriangle" size={24} className="text-red-600 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-red-800 mb-3">Emergency Support</h4>
            <p className="text-sm text-red-700 mb-4">
              For critical production issues or security incidents, contact the emergency support line:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="tel:+1-800-EMERGENCY" 
                className="inline-flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                <Icon name="Phone" size={16} />
                <span>+1 (800) EMERGENCY</span>
              </a>
              <a 
                href="mailto:emergency@company.com" 
                className="inline-flex items-center justify-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 border border-red-300 transition-colors"
              >
                <Icon name="Mail" size={16} />
                <span>emergency@company.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTab;