import React, { useState, useEffect } from 'react';
import { Search, Plus, Building2 } from 'lucide-react';
import { useCognitoAuth } from '../../contexts/CognitoAuthContext';
import { dynamoService } from '../../utils/dynamoDBService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ClientOverviewCards from './components/ClientOverviewCards';
import ClientDirectoryTable from './components/ClientDirectoryTable';
import ClientFilters from './components/ClientFilters';
import ClientOnboardingModal from './components/ClientOnboardingModal';

const ClientManagementConsole = () => {
  const { user, canManageClients, isC3OpsUser } = useCognitoAuth();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    subscriptionTier: 'all',
    status: 'all',
    cloudProvider: 'all'
  });
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    filterClients();
  }, [clients, searchTerm, selectedFilters]);

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const loadClients = async () => {
    try {
      setLoading(true);
      const clientsData = await dynamoService?.getClients();
      setClients(clientsData);
    } catch (err) {
      setError('Failed to load clients');
      console.error('Error loading clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterClients = () => {
    let filtered = clients;

    // Search filter
    if (searchTerm) {
      filtered = filtered?.filter(client =>
        client?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        client?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Subscription tier filter
    if (selectedFilters?.subscriptionTier !== 'all') {
      filtered = filtered?.filter(client => 
        client?.subscriptionTier === selectedFilters?.subscriptionTier
      );
    }

    // Status filter
    if (selectedFilters?.status !== 'all') {
      filtered = filtered?.filter(client => 
        client?.status === selectedFilters?.status
      );
    }

    // Cloud provider filter
    if (selectedFilters?.cloudProvider !== 'all') {
      filtered = filtered?.filter(client =>
        client?.cloudProviders?.includes(selectedFilters?.cloudProvider)
      );
    }

    setFilteredClients(filtered);
  };

  const handleClientCreated = (newClient) => {
    setClients(prev => [...prev, newClient]);
    setShowOnboardingModal(false);
  };

  // Check permissions
  if (!isC3OpsUser()) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar onToggleCollapse={handleToggleCollapse} />
          <main className="flex-1 p-8">
            <div className="max-w-lg mx-auto mt-20 text-center">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Access Restricted
                </h2>
                <p className="text-gray-600">
                  This console is only available for C3Ops administrators.
                  Please contact your system administrator for access.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar onToggleCollapse={handleToggleCollapse} />
          <main className="flex-1 p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4]?.map(i => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar onToggleCollapse={handleToggleCollapse} />
        <main className="flex-1 p-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Client Management Console
                </h1>
                <p className="text-gray-600 mt-1">
                  Comprehensive multi-tenant client management for C3Ops administrators
                </p>
                {/* Demo Banner */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-blue-600 text-sm">
                      <strong>Demo Mode:</strong> This simulates AWS Cognito + DynamoDB integration. 
                      Export this project to integrate with your actual AWS services.
                    </div>
                  </div>
                </div>
              </div>
              {canManageClients() && (
                <Button 
                  onClick={() => setShowOnboardingModal(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Onboard Client
                </Button>
              )}
            </div>
          </div>

          {/* Overview Cards */}
          <ClientOverviewCards clients={clients} />

          {/* Main Content Area */}
          <div className="flex gap-8">
            {/* Client Directory */}
            <div className="flex-1">
              {/* Search and Actions Bar */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Client Directory</h2>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e?.target?.value)}
                        className="pl-10 pr-4 py-2 w-64"
                      />
                    </div>
                  </div>
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <ClientDirectoryTable 
                  clients={filteredClients}
                  onRefresh={loadClients}
                />
              </div>
            </div>

            {/* Filters Sidebar */}
            <div className="w-80">
              <ClientFilters
                filters={selectedFilters}
                onFiltersChange={setSelectedFilters}
              />
            </div>
          </div>
        </main>
      </div>
      {/* Client Onboarding Modal */}
      {showOnboardingModal && (
        <ClientOnboardingModal
          onClose={() => setShowOnboardingModal(false)}
          onClientCreated={handleClientCreated}
        />
      )}
    </div>
  );
};

export default ClientManagementConsole;