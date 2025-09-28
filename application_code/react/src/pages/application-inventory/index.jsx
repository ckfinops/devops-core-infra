import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ApplicationTable from './components/ApplicationTable';
import FilterSidebar from './components/FilterSidebar';
import SummaryCards from './components/SummaryCards';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const ApplicationInventory = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedApps, setSelectedApps] = useState([]);
  const [filters, setFilters] = useState({
    appType: 'all',
    hostingEnv: 'all',
    owner: 'all',
    lastUpdated: 'all'
  });
  const [loading, setLoading] = useState(false);

  // Mock data for applications
  const [applications] = useState([
    {
      id: 1,
      name: 'Customer Portal',
      techStackOwner: 'John Smith',
      itOwner: 'Sarah Johnson',
      functionalOwner: 'Mike Davis',
      appType: 'Web Application',
      hostingEnv: 'AWS Production',
      lastUpdated: '2025-01-08T10:30:00Z',
      status: 'Active',
      criticality: 'High'
    },
    {
      id: 2,
      name: 'Analytics Dashboard',
      techStackOwner: 'Emily Chen',
      itOwner: 'Robert Wilson',
      functionalOwner: 'Lisa Brown',
      appType: 'Dashboard',
      hostingEnv: 'Azure Production',
      lastUpdated: '2025-01-07T14:15:00Z',
      status: 'Active',
      criticality: 'Medium'
    },
    {
      id: 3,
      name: 'Mobile Banking App',
      techStackOwner: 'David Kim',
      itOwner: 'Amanda White',
      functionalOwner: 'Thomas Lee',
      appType: 'Mobile Application',
      hostingEnv: 'GCP Production',
      lastUpdated: '2025-01-06T09:45:00Z',
      status: 'Active',
      criticality: 'Critical'
    },
    {
      id: 4,
      name: 'Inventory Management',
      techStackOwner: 'Jennifer Taylor',
      itOwner: 'Mark Anderson',
      functionalOwner: 'Patricia Garcia',
      appType: 'Enterprise Software',
      hostingEnv: 'On-Premise',
      lastUpdated: '2025-01-05T16:20:00Z',
      status: 'Maintenance',
      criticality: 'Medium'
    },
    {
      id: 5,
      name: 'API Gateway',
      techStackOwner: 'Christopher Martinez',
      itOwner: 'Michelle Rodriguez',
      functionalOwner: 'Kevin Thompson',
      appType: 'API Service',
      hostingEnv: 'AWS Production',
      lastUpdated: '2025-01-09T11:10:00Z',
      status: 'Active',
      criticality: 'High'
    }
  ]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleFilterToggle = () => {
    setFilterSidebarOpen(!filterSidebarOpen);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSelectApp = (appId) => {
    setSelectedApps(prev => 
      prev?.includes(appId) 
        ? prev?.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  const handleSelectAll = () => {
    if (selectedApps?.length === filteredAndSortedApplications?.length) {
      setSelectedApps([]);
    } else {
      setSelectedApps(filteredAndSortedApplications?.map(app => app?.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for apps:`, selectedApps);
    setSelectedApps([]);
  };

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      console.log('Exporting applications...');
      setLoading(false);
    }, 2000);
  };

  // Filter and search logic
  const filteredAndSortedApplications = applications?.filter(app => {
    const matchesSearch = app?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         app?.techStackOwner?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         app?.itOwner?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    const matchesAppType = filters?.appType === 'all' || app?.appType === filters?.appType;
    const matchesHostingEnv = filters?.hostingEnv === 'all' || app?.hostingEnv?.includes(filters?.hostingEnv);
    const matchesOwner = filters?.owner === 'all' || 
                        app?.techStackOwner === filters?.owner || 
                        app?.itOwner === filters?.owner || 
                        app?.functionalOwner === filters?.owner;

    return matchesSearch && matchesAppType && matchesHostingEnv && matchesOwner;
  })?.sort((a, b) => {
    const aValue = a?.[sortBy] || '';
    const bValue = b?.[sortBy] || '';
    
    if (sortOrder === 'asc') {
      return aValue?.toString()?.localeCompare(bValue?.toString());
    } else {
      return bValue?.toString()?.localeCompare(aValue?.toString());
    }
  });

  // Summary calculations
  const summaryData = {
    totalApplications: applications?.length,
    activeApplications: applications?.filter(app => app?.status === 'Active')?.length,
    criticalApplications: applications?.filter(app => app?.criticality === 'Critical')?.length,
    recentlyUpdated: applications?.filter(app => {
      const updateDate = new Date(app?.lastUpdated);
      const threeDaysAgo = new Date();
      threeDaysAgo?.setDate(threeDaysAgo?.getDate() - 3);
      return updateDate > threeDaysAgo;
    })?.length
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Application Inventory</h1>
              <p className="text-muted-foreground">
                Comprehensive asset management for enterprise applications
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleFilterToggle}
                iconName="Filter" 
                iconPosition="left"
              >
                Filters
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExport}
                loading={loading}
                iconName="Download" 
                iconPosition="left"
              >
                Export CSV
              </Button>
              
              <Button 
                variant="primary" 
                size="sm" 
                iconName="Plus" 
                iconPosition="left"
              >
                Add Application
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <SummaryCards data={summaryData} />

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search applications, owners..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e?.target?.value)}
                  className="pl-10"
                />
              </div>
              
              <Select
                value={sortBy}
                onValueChange={setSortBy}
                className="w-48"
              >
                <option value="name">Sort by Name</option>
                <option value="techStackOwner">Sort by Tech Owner</option>
                <option value="appType">Sort by App Type</option>
                <option value="lastUpdated">Sort by Last Updated</option>
              </Select>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
                iconPosition="left"
              >
                {sortOrder?.toUpperCase()}
              </Button>
            </div>

            {selectedApps?.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {selectedApps?.length} selected
                </span>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('edit')}>
                  Bulk Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('delete')}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Main Content with Filter Sidebar */}
          <div className="flex space-x-6">
            <div className="flex-1">
              <ApplicationTable
                applications={filteredAndSortedApplications}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
                selectedApps={selectedApps}
                onSelectApp={handleSelectApp}
                onSelectAll={handleSelectAll}
              />
            </div>
            
            {filterSidebarOpen && (
              <div className="w-80 flex-shrink-0">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClose={handleFilterToggle}
                  applications={applications}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationInventory;