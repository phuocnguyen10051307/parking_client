import { Route } from 'react-router-dom';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { ProtectedRoute } from '@/app/router/protected-route';
import BuildingsPage from '@/features/buildings/pages/buildings-page';
import DashboardPage from '@/features/dashboard/pages/dashboard-page';
import FeedbackDetailPage from '@/features/feedback/pages/feedback-detail-page';
import FeedbackManagementPage from '@/features/feedback/pages/feedback-management-page';
import FloorsPage from '@/features/floors/pages/floors-page';
import MonthlySubscriptionDetailPage from '@/features/monthly-subscriptions/pages/monthly-subscription-detail-page';
import MonthlySubscriptionsManagementPage from '@/features/monthly-subscriptions/pages/monthly-subscriptions-management-page';
import ParkingMapPage from '@/features/parking-map/pages/parking-map-page';
import ParkingSessionDetailPage from '@/features/parking-sessions/pages/parking-session-detail-page';
import ParkingSessionsManagementPage from '@/features/parking-sessions/pages/parking-sessions-management-page';
import PricingPage from '@/features/pricing/pages/pricing-page';
import ProfilePage from '@/features/profile/pages/profile-page';
import ReportsPage from '@/features/reports/pages/reports-page';
import ReservationDetailPage from '@/features/reservations/pages/reservation-detail-page';
import ReservationManagementPage from '@/features/reservations/pages/reservation-management-page';
import RoleManagementPage from '@/features/roles/pages/role-management-page';
import SettingsPage from '@/features/settings/pages/settings-page';
import SlotsPage from '@/features/slots/pages/slots-page';
import UserManagementPage from '@/features/users/pages/user-management-page';
import VehicleEntryPage from '@/features/vehicle-entry/pages/vehicle-entry-page';
import VehicleExitPage from '@/features/vehicle-exit/pages/vehicle-exit-page';
import ZonesPage from '@/features/zones/pages/zones-page';

import { ROUTE_PERMISSIONS } from './rbac-config';

const getAllowedRoles = (path: string) =>
  ROUTE_PERMISSIONS.find((route) => route.path === path)?.allowedRoles ?? [];

export function AdminRouter() {
  return (
    <>
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/')}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parking-map"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/parking-map')}>
            <DashboardLayout>
              <ParkingMapPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/vehicle-entry"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/vehicle-entry')}>
            <VehicleEntryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vehicle-exit"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/vehicle-exit')}>
            <VehicleExitPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parking-sessions"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/parking-sessions')}>
            <ParkingSessionsManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parking-sessions/:id"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/parking-sessions')}>
            <ParkingSessionDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservations"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/reservations')}>
            <ReservationManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservations/:id"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/reservations')}>
            <ReservationDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/monthly-subscriptions"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/monthly-subscriptions')}>
            <MonthlySubscriptionsManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/monthly-subscriptions/:id"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/monthly-subscriptions/:id')}>
            <DashboardLayout>
              <MonthlySubscriptionDetailPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/buildings"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/buildings')}>
            <BuildingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/floors"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/floors')}>
            <FloorsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/zones"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/zones')}>
            <ZonesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/slots"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/slots')}>
            <SlotsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pricing"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/pricing')}>
            <PricingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/reports')}>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedbacks"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/feedbacks')}>
            <FeedbackManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedbacks/:id"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/feedbacks')}>
            <FeedbackDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/users')}>
            <UserManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/roles')}>
            <RoleManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/settings')}>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/profile')}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </>
  );
}


