import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowLeft, ArrowRight, Save, Building2 } from 'lucide-react';
import { useCognitoAuth } from '../../contexts/CognitoAuthContext';
import { dynamoService } from '../../utils/dynamoDBService';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ClientInfoStep from './components/ClientInfoStep';
import CloudProviderStep from './components/CloudProviderStep';
import UserHierarchyStep from './components/UserHierarchyStep';
import ApplicationDiscoveryStep from './components/ApplicationDiscoveryStep';
import PlatformCustomizationStep from './components/PlatformCustomizationStep';

const ClientOnboardingWizard = () => {
  const { user, canManageClients, isC3OpsUser } = useCognitoAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Client Information
    clientInfo: {
      companyName: '',
      contactEmail: '',
      contactPhone: '',
      industry: '',
      companySize: '',
      subscriptionTier: 'Professional',
      estimatedUsers: 5
    },
    // Step 2: Cloud Provider Setup
    cloudProviders: {
      aws: { enabled: false, accountId: '', region: 'us-east-1', credentials: {} },
      azure: { enabled: false, subscriptionId: '', resourceGroup: '', credentials: {} },
      gcp: { enabled: false, projectId: '', region: 'us-central1', credentials: {} }
    },
    // Step 3: User Hierarchy
    userHierarchy: {
      executive: [],
      management: [],
      operational: [],
      analyst: [],
      readonly: []
    },
    // Step 4: Application Discovery
    applications: {
      discoveryMethod: 'automated',
      manualApps: [],
      discoveryConfig: {}
    },
    // Step 5: Platform Customization
    customization: {
      branding: {
        companyLogo: '',
        primaryColor: '#3B82F6',
        secondaryColor: '#10B981'
      },
      dashboard: {
        defaultView: 'overview',
        widgets: []
      },
      notifications: {
        email: true,
        slack: false,
        webhooks: false
      }
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedData, setSavedData] = useState(null);

  const steps = [
    {
      id: 'client-info',
      title: 'Client Information',
      description: 'Company details and subscription setup',
      component: ClientInfoStep
    },
    {
      id: 'cloud-setup',
      title: 'Cloud Provider Setup',
      description: 'Configure AWS, Azure, and GCP connections',
      component: CloudProviderStep
    },
    {
      id: 'user-hierarchy',
      title: 'User Hierarchy',
      description: 'Define roles and assign initial users',
      component: UserHierarchyStep
    },
    {
      id: 'app-discovery',
      title: 'Application Discovery',
      description: 'Discover and register applications',
      component: ApplicationDiscoveryStep
    },
    {
      id: 'customization',
      title: 'Platform Customization',
      description: 'White-label branding and preferences',
      component: PlatformCustomizationStep
    }
  ];

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev?.[section], ...data }
    }));
  };

  const validateStep = (stepIndex) => {
    const step = steps?.[stepIndex];
    
    switch (step?.id) {
      case 'client-info':
        return formData?.clientInfo?.companyName && formData?.clientInfo?.contactEmail;
      case 'cloud-setup':
        return Object.values(formData?.cloudProviders)?.some(provider => provider?.enabled);
      case 'user-hierarchy':
        return Object.values(formData?.userHierarchy)?.some(roles => roles?.length > 0);
      case 'app-discovery':
        return formData?.applications?.discoveryMethod;
      case 'customization':
        return true; // Optional step
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < steps?.length - 1) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
        setError(null);
      } else {
        setError('Please complete all required fields before continuing.');
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate saving to DynamoDB
      const clientData = {
        name: formData?.clientInfo?.companyName,
        contactEmail: formData?.clientInfo?.contactEmail,
        subscriptionTier: formData?.clientInfo?.subscriptionTier,
        status: 'Onboarding',
        activeUsers: parseInt(formData?.clientInfo?.estimatedUsers),
        cloudProviders: Object.keys(formData?.cloudProviders)?.filter(
          provider => formData?.cloudProviders?.[provider]?.enabled
        )?.map(provider => provider?.toUpperCase()),
        monthlySpend: 0,
        applications: formData?.applications?.manualApps,
        roles: [
          ...formData?.userHierarchy?.executive?.map(user => ({ ...user, level: 'Executive Level' })),
          ...formData?.userHierarchy?.management?.map(user => ({ ...user, level: 'Management Level' })),
          ...formData?.userHierarchy?.operational?.map(user => ({ ...user, level: 'Operational Level' })),
          ...formData?.userHierarchy?.analyst?.map(user => ({ ...user, level: 'Analyst Level' })),
          ...formData?.userHierarchy?.readonly?.map(user => ({ ...user, level: 'Read-Only Access' }))
        ]
      };

      const newClient = await dynamoService?.createClient(clientData);
      setSavedData(newClient);
      
    } catch (err) {
      setError('Failed to save client data. Please try again.');
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    await handleSave();
    // Redirect to client management console
    window.location.href = '/client-management-console';
  };

  // Check permissions
  if (!isC3OpsUser()) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <main className="flex-1 p-8">
            <div className="max-w-lg mx-auto mt-20 text-center">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Access Restricted
                </h2>
                <p className="text-gray-600">
                  This onboarding wizard is only available for C3Ops administrators.
                  Please contact your system administrator for access.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const CurrentStepComponent = steps?.[currentStep]?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Client Onboarding Wizard</h1>
              <p className="text-gray-600 mt-1">
                Comprehensive multi-step client setup with automated provisioning
              </p>
              
              {/* Demo Banner */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-blue-600 text-sm">
                  <strong>Demo Mode:</strong> This simulates AWS Cognito + DynamoDB + Lambda integration. 
                  Export this project to integrate with your actual AWS services.
                </div>
              </div>
            </div>

            {/* Progress Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Step {currentStep + 1} of {steps?.length}: {steps?.[currentStep]?.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {steps?.[currentStep]?.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Progress
                </Button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center space-x-4">
                {steps?.map((step, index) => (
                  <div key={step?.id} className="flex items-center">
                    <div className="flex items-center">
                      {index < currentStep ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : index === currentStep ? (
                        <Circle className="h-6 w-6 text-blue-500 fill-current" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-300" />
                      )}
                      <span className={`ml-2 text-sm font-medium ${
                        index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step?.title}
                      </span>
                    </div>
                    {index < steps?.length - 1 && (
                      <div className={`ml-4 h-px w-12 ${
                        index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Estimated Time */}
              <div className="mt-4 text-sm text-gray-600">
                Estimated completion time: {15 - (currentStep * 3)} minutes remaining
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {/* Success Display */}
            {savedData && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600">
                  Progress saved successfully! Client ID: {savedData?.id}
                </p>
              </div>
            )}

            {/* Step Content */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <CurrentStepComponent
                data={formData}
                updateData={updateFormData}
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0 || loading}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="text-sm text-gray-600">
                Step {currentStep + 1} of {steps?.length}
              </div>

              {currentStep === steps?.length - 1 ? (
                <Button
                  onClick={handleComplete}
                  disabled={loading || !validateStep(currentStep)}
                  className="flex items-center gap-2"
                >
                  {loading ? 'Processing...' : 'Complete Onboarding'}
                  <CheckCircle className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={loading || !validateStep(currentStep)}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientOnboardingWizard;