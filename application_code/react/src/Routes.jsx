import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { CognitoAuthProvider } from './contexts/CognitoAuthContext';
import NotFound from "pages/NotFound";
import DashboardOverview from './pages/dashboard-overview';
import CostOptimizationRecommendations from './pages/cost-optimization-recommendations';
import Login from './pages/login';
import RequireAuth from './components/RequireAuth';
import MultiCloudCostAnalysis from './pages/multi-cloud-cost-analysis';
import BudgetPlanningForecasting from './pages/budget-planning-forecasting';
import CostAlertsNotifications from './pages/cost-alerts-notifications';
import SaaSSubscriptionManagement from './pages/saa-s-subscription-management';
import AIWorkloadCostMonitoring from './pages/ai-workload-cost-monitoring';
import CloudProviderConnectionSetup from './pages/cloud-provider-connection-setup';
import ExecutiveCostReports from './pages/executive-cost-reports';
import ApplicationInventory from './pages/application-inventory';
import ApplicationDetails from './pages/application-details';
import AWSApplicationsAssets from './pages/aws-applications-assets';
import AzureApplicationsAssets from './pages/azure-applications-assets';
import GCPApplicationsAssets from './pages/gcp-applications-assets';
import UserManagementConsole from './pages/user-management-console';
import RoleBasedAccessControl from './pages/role-based-access-control';
import ProfileSettings from './pages/profile-settings';
import Preferences from './pages/preferences';
import HelpSupport from './pages/help-support';
import ClientManagementConsole from './pages/client-management-console';
import ClientOnboardingWizard from './pages/client-onboarding-wizard';
import TenantAdministrationDashboard from './pages/tenant-administration-dashboard';
import AWSCognitoAuthenticationSetup from './pages/aws-cognito-authentication-setup';
import MultiTenantRoleManagement from './pages/multi-tenant-role-management';
import ClientApplicationHierarchySetup from './pages/client-application-hierarchy-setup';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <CognitoAuthProvider>
          <ScrollToTop />
          <RouterRoutes>
            <Route path="/login" element={<Login />} />

            {/* Protected routes - require authentication */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<BudgetPlanningForecasting />} />
              <Route path="/dashboard-overview" element={<DashboardOverview />} />
              <Route path="/cost-optimization-recommendations" element={<CostOptimizationRecommendations />} />
              <Route path="/multi-cloud-cost-analysis" element={<MultiCloudCostAnalysis />} />
              <Route path="/budget-planning-forecasting" element={<BudgetPlanningForecasting />} />
              <Route path="/cost-alerts-notifications" element={<CostAlertsNotifications />} />
              <Route path="/saa-s-subscription-management" element={<SaaSSubscriptionManagement />} />
              <Route path="/ai-workload-cost-monitoring" element={<AIWorkloadCostMonitoring />} />
              <Route path="/cloud-provider-connection-setup" element={<CloudProviderConnectionSetup />} />
              <Route path="/executive-cost-reports" element={<ExecutiveCostReports />} />
              <Route path="/application-inventory" element={<ApplicationInventory />} />
              <Route path="/application-details" element={<ApplicationDetails />} />
              <Route path="/aws-applications-assets" element={<AWSApplicationsAssets />} />
              <Route path="/azure-applications-assets" element={<AzureApplicationsAssets />} />
              <Route path="/gcp-applications-assets" element={<GCPApplicationsAssets />} />
              <Route path="/user-management-console" element={<UserManagementConsole />} />
              <Route path="/role-based-access-control" element={<RoleBasedAccessControl />} />
              <Route path="/profile-settings" element={<ProfileSettings />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/help-support" element={<HelpSupport />} />
              <Route path="/client-management-console" element={<ClientManagementConsole />} />
              <Route path="/client-onboarding-wizard" element={<ClientOnboardingWizard />} />
              <Route path="/tenant-administration-dashboard" element={<TenantAdministrationDashboard />} />
              <Route path="/aws-cognito-authentication-setup" element={<AWSCognitoAuthenticationSetup />} />
              <Route path="/multi-tenant-role-management" element={<MultiTenantRoleManagement />} />
              <Route path="/client-application-hierarchy-setup" element={<ClientApplicationHierarchySetup />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </CognitoAuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;