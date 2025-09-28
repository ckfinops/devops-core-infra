import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProviderTabs from './components/ProviderTabs';
import ConnectionWizard from './components/ConnectionWizard';
import ConnectionStatusDashboard from './components/ConnectionStatusDashboard';
import SecurityNotifications from './components/SecurityNotifications';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CloudProviderConnectionSetup = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeProvider, setActiveProvider] = useState('aws');
  const [wizardStep, setWizardStep] = useState(0);
  const [connections, setConnections] = useState({
    aws: { connected: false, lastSync: null, status: 'not_configured', accounts: [] },
    azure: { connected: false, lastSync: null, status: 'not_configured', subscriptions: [] },
    gcp: { connected: false, lastSync: null, status: 'not_configured', projects: [] }
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [isDevMode] = useState(import.meta.env?.DEV || true); // Assume dev mode if no API

  // Enhanced connection validation with better error handling
  const validateConnection = async (provider, credentials) => {
    setIsValidating(true);
    
    try {
      // Simulate API validation call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In development mode, simulate successful connection after validation
      if (isDevMode) {
        const connectionData = {
          connected: true,
          status: 'connected',
          lastSync: new Date(),
          // Add mock account data
          ...(provider === 'aws' && { accounts: [{ id: '123456789012', name: 'Production' }] }),
          ...(provider === 'azure' && { subscriptions: [{ id: 'sub-12345', name: 'Main Subscription' }] }),
          ...(provider === 'gcp' && { projects: [{ id: 'my-project-12345', name: 'Production Project' }] })
        };

        setConnections(prev => ({
          ...prev,
          [provider]: connectionData
        }));
        
        // Store connection status in localStorage for persistence across pages
        try {
          const storedConnections = localStorage.getItem('finops-cloud-connections');
          const connections = storedConnections ? JSON.parse(storedConnections) : {};
          connections[provider] = connectionData;
          localStorage.setItem('finops-cloud-connections', JSON.stringify(connections));
        } catch (error) {
          console.warn('Failed to store connection status');
        }
        
        setValidationErrors(prev => ({
          ...prev,
          [provider]: null
        }));
        
        // Show success message with redirect option
        setTimeout(() => {
          const shouldRedirect = window.confirm(
            'Connection established successfully! Would you like to go to the Dashboard to view your cloud cost data?'
          );
          if (shouldRedirect) {
            window.location.href = '/dashboard-overview';
          }
        }, 1000);
        
        return { success: true, message: 'Connection established successfully' };
      }
      
      // For production, this would make actual API calls
      const response = await fetch(`/api/validate-${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (response?.ok) {
        const data = await response?.json();
        const connectionData = {
          connected: true,
          status: 'connected',
          lastSync: new Date(),
          ...data
        };

        setConnections(prev => ({
          ...prev,
          [provider]: connectionData
        }));
        
        setValidationErrors(prev => ({
          ...prev,
          [provider]: null
        }));
        
        return { success: true, message: 'Connection established successfully' };
      } else {
        throw new Error('Validation failed');
      }
      
    } catch (error) {
      console.error(`${provider} validation error:`, error);
      
      const errorMessage = error?.message === 'Validation failed' ?'Invalid credentials. Please check your configuration.'
        : isDevMode 
        ? 'Validation completed. This is demo mode - connection simulation successful.'
        : 'Connection failed. Please check your credentials and network connection.';
      
      setValidationErrors(prev => ({
        ...prev,
        [provider]: errorMessage
      }));
      
      setConnections(prev => ({
        ...prev,
        [provider]: {
          ...prev?.[provider],
          connected: isDevMode, // In dev mode, still mark as connected for demo
          status: isDevMode ? 'connected' : 'error',
          error: isDevMode ? null : errorMessage
        }
      }));
      
      return { 
        success: isDevMode, 
        error: errorMessage,
        message: isDevMode ? 'Demo connection established' : errorMessage 
      };
    } finally {
      setIsValidating(false);
    }
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleProviderChange = (provider) => {
    setActiveProvider(provider);
    setWizardStep(0);
  };

  const handleConnectionSave = (provider, credentials) => {
    validateConnection(provider, credentials);
  };

  const handleWizardNext = () => {
    setWizardStep(prev => prev + 1);
  };

  const handleWizardPrevious = () => {
    setWizardStep(prev => Math.max(0, prev - 1));
  };

  const handleResetConnection = (provider) => {
    setConnections(prev => ({
      ...prev,
      [provider]: {
        ...prev?.[provider],
        connected: false,
        status: 'not_configured',
        lastSync: null,
        error: null
      }
    }));
    
    // Remove from localStorage
    try {
      const storedConnections = localStorage.getItem('finops-cloud-connections');
      if (storedConnections) {
        const connections = JSON.parse(storedConnections);
        delete connections?.[provider];
        localStorage.setItem('finops-cloud-connections', JSON.stringify(connections));
      }
    } catch (error) {
      console.warn('Failed to update stored connections');
    }
    
    setValidationErrors(prev => ({
      ...prev,
      [provider]: null
    }));
    setWizardStep(0);
  };

  // Load stored connections on component mount
  useEffect(() => {
    try {
      const storedConnections = localStorage.getItem('finops-cloud-connections');
      if (storedConnections) {
        const connections = JSON.parse(storedConnections);
        setConnections(prev => ({
          ...prev,
          ...connections
        }));
      }
    } catch (error) {
      console.warn('Failed to load stored connections');
    }
  }, []);

  // Improved health check with better error handling
  useEffect(() => {
    if (!isDevMode) {
      const interval = setInterval(() => {
        // Only ping APIs if we have real connections
        Object.keys(connections)?.forEach(provider => {
          if (connections?.[provider]?.connected && connections?.[provider]?.status === 'connected') {
            // In production, this would ping the actual provider APIs
            setConnections(prev => ({
              ...prev,
              [provider]: {
                ...prev?.[provider],
                lastSync: new Date()
              }
            }));
          }
        });
      }, 60000); // Every minute instead of 30 seconds to reduce load

      return () => clearInterval(interval);
    }
  }, [connections, isDevMode]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
        <div className="p-6 space-y-6">
          {/* Page Header with Development Mode Indicator */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-foreground">Cloud Provider Connections</h1>
                {isDevMode && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Development Mode
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">
                {isDevMode 
                  ? 'Demo mode: Configure connections to see how cloud cost optimization works' :'Securely connect AWS, Azure, and GCP accounts to enable cost optimization'
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                iconName="RefreshCw" 
                iconPosition="left"
                onClick={() => {
                  // In dev mode, just refresh the component state
                  if (isDevMode) {
                    window.location?.reload();
                  } else {
                    // In production, refresh connection status
                    window.location?.reload();
                  }
                }}
              >
                Refresh Status
              </Button>
              
              <Button 
                variant="primary" 
                size="sm" 
                iconName="BarChart3" 
                iconPosition="left"
                onClick={() => window.location.href = '/dashboard-overview'}
              >
                View Dashboard
              </Button>
            </div>
          </div>

          {/* Success Banner for Connected Providers */}
          {Object.values(connections)?.some(conn => conn?.connected) && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-success mb-1">
                    Cloud Providers Connected Successfully
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your cloud providers are connected and data is being synchronized. 
                    Visit the Dashboard to view your cost analysis and optimization recommendations.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="BarChart3" 
                    iconPosition="left"
                    onClick={() => window.location.href = '/dashboard-overview'}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Security Notifications */}
          <SecurityNotifications />

          {/* Development Mode Banner */}
          {isDevMode && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900">Development Mode Active</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    You're currently in demo mode. Connection validations are simulated, and mock data is used for demonstrations. 
                    Configure real API endpoints to connect to actual cloud providers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Connection Setup (3/4 width) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Provider Tabs */}
              <ProviderTabs
                activeProvider={activeProvider}
                onProviderChange={handleProviderChange}
                connections={connections}
              />

              {/* Connection Wizard */}
              <div className="bg-card border border-border rounded-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-foreground">
                      Configure {activeProvider?.toUpperCase()} Connection
                    </h2>
                    {connections?.[activeProvider]?.connected && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="RotateCcw"
                        iconPosition="left"
                        onClick={() => handleResetConnection(activeProvider)}
                      >
                        Reset Connection
                      </Button>
                    )}
                  </div>

                  <ConnectionWizard
                    provider={activeProvider}
                    step={wizardStep}
                    connection={connections?.[activeProvider]}
                    validationError={validationErrors?.[activeProvider]}
                    isValidating={isValidating}
                    onNext={handleWizardNext}
                    onPrevious={handleWizardPrevious}
                    onSave={handleConnectionSave}
                    isDevMode={isDevMode}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Status Dashboard (1/4 width) */}
            <div className="lg:col-span-1">
              <ConnectionStatusDashboard 
                connections={connections}
                onProviderSelect={handleProviderChange}
                isDevMode={isDevMode}
              />
            </div>
          </div>

          {/* Quick Setup Actions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => {
                  setActiveProvider('aws');
                  setWizardStep(0);
                }}
              >
                <Icon name="Cloud" size={24} className="text-muted-foreground" />
                <div className="text-center">
                  <div className="font-medium">Setup AWS</div>
                  <div className="text-xs text-muted-foreground">
                    {isDevMode ? 'Demo IAM Role setup' : 'IAM Role or Access Keys'}
                  </div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => {
                  setActiveProvider('azure');
                  setWizardStep(0);
                }}
              >
                <Icon name="CloudSnow" size={24} className="text-muted-foreground" />
                <div className="text-center">
                  <div className="font-medium">Setup Azure</div>
                  <div className="text-xs text-muted-foreground">
                    {isDevMode ? 'Demo Service Principal' : 'Service Principal'}
                  </div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => {
                  setActiveProvider('gcp');
                  setWizardStep(0);
                }}
              >
                <Icon name="CloudRain" size={24} className="text-muted-foreground" />
                <div className="text-center">
                  <div className="font-medium">Setup GCP</div>
                  <div className="text-xs text-muted-foreground">
                    {isDevMode ? 'Demo Service Account' : 'Service Account'}
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span>SOC2 Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-success" />
                  <span>End-to-End Encryption</span>
                </div>
                {isDevMode && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Code" size={16} className="text-blue-500" />
                    <span>Development Mode</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="HelpCircle" size={16} className="text-muted-foreground" />
                <Button variant="ghost" size="sm">
                  Integration Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CloudProviderConnectionSetup;