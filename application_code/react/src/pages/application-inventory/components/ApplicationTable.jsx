import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ApplicationTable = ({ 
  applications, 
  sortBy, 
  sortOrder, 
  onSort, 
  selectedApps, 
  onSelectApp, 
  onSelectAll 
}) => {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowExpand = (appId) => {
    setExpandedRows(prev => 
      prev?.includes(appId) 
        ? prev?.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  const handleViewDetails = (appId) => {
    navigate(`/application-details?id=${appId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800 border-green-200',
      'Maintenance': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Inactive': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return statusStyles?.[status] || statusStyles?.['Inactive'];
  };

  const getCriticalityBadge = (criticality) => {
    const criticalityStyles = {
      'Critical': 'bg-red-100 text-red-800 border-red-200',
      'High': 'bg-orange-100 text-orange-800 border-orange-200',
      'Medium': 'bg-blue-100 text-blue-800 border-blue-200',
      'Low': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return criticalityStyles?.[criticality] || criticalityStyles?.['Low'];
  };

  const SortableHeader = ({ column, children }) => (
    <th 
      className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => onSort(column)}
    >
      <div className="flex items-center space-x-2">
        <span>{children}</span>
        {sortBy === column && (
          <Icon 
            name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
            size={14} 
          />
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-4 py-3 w-12">
                <Checkbox
                  checked={selectedApps?.length === applications?.length && applications?.length > 0}
                  onChange={onSelectAll}
                />
              </th>
              <SortableHeader column="name">Application Name</SortableHeader>
              <SortableHeader column="techStackOwner">Tech Stack Owner</SortableHeader>
              <SortableHeader column="itOwner">IT Owner</SortableHeader>
              <SortableHeader column="functionalOwner">Functional Owner</SortableHeader>
              <SortableHeader column="appType">App Type</SortableHeader>
              <SortableHeader column="hostingEnv">Hosting Environment</SortableHeader>
              <SortableHeader column="lastUpdated">Last Updated</SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {applications?.map((app) => (
              <React.Fragment key={app?.id}>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-4">
                    <Checkbox
                      checked={selectedApps?.includes(app?.id)}
                      onChange={() => onSelectApp(app?.id)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="Package" size={20} className="text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{app?.name}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(app?.status)}`}>
                            {app?.status}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getCriticalityBadge(app?.criticality)}`}>
                            {app?.criticality}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">{app?.techStackOwner}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{app?.itOwner}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{app?.functionalOwner}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{app?.appType}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{app?.hostingEnv}</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {formatDate(app?.lastUpdated)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRowExpand(app?.id)}
                        iconName={expandedRows?.includes(app?.id) ? 'ChevronUp' : 'ChevronDown'}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(app?.id)}
                        iconName="ExternalLink"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreVertical"
                      />
                    </div>
                  </td>
                </tr>
                
                {expandedRows?.includes(app?.id) && (
                  <tr>
                    <td colSpan="9" className="px-4 py-4 bg-muted/20">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground">Quick Info</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>Status: <span className="text-foreground">{app?.status}</span></div>
                            <div>Criticality: <span className="text-foreground">{app?.criticality}</span></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground">Technical Details</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>Environment: <span className="text-foreground">{app?.hostingEnv}</span></div>
                            <div>Type: <span className="text-foreground">{app?.appType}</span></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground">Quick Actions</h4>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDetails(app?.id)}
                            >
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm">Edit</Button>
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
      {applications?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Applications Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationTable;