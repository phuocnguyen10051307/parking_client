import { Navigate, Route } from 'react-router-dom';

import DashboardPage from '@/features/dashboard/pages/dashboard-page';
import FloorsPage from '@/features/floors/pages/floors-page';
import ParkingSessionsManagementPage from '@/features/parking-sessions/pages/parking-sessions-management-page';
import ParkingSessionDetailPage from '@/features/parking-sessions/pages/parking-session-detail-page';
import PricingPage from '@/features/pricing/pages/pricing-page';
import ProfilePage from '@/features/profile/pages/profile-page';
import ReportsPage from '@/features/reports/pages/reports-page';
import SlotsPage from '@/features/slots/pages/slots-page';
import VehicleEntryPage from '@/features/vehicle-entry/pages/vehicle-entry-page';
import VehicleExitPage from '@/features/vehicle-exit/pages/vehicle-exit-page';
import ZonesPage from '@/features/zones/pages/zones-page';
import FeedbackManagementPage from '@/features/feedback/pages/feedback-management-page';
import FeedbackDetailPage from '@/features/feedback/pages/feedback-detail-page';
import ReservationManagementPage from '@/features/reservations/pages/reservation-management-page';
import ReservationDetailPage from '@/features/reservations/pages/reservation-detail-page';

import { ProtectedRoute } from '@/app/router/protected-route';

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
            <Navigate to="/slots/basement-1" replace />
          </ProtectedRoute>
        }
      />

      <Route
        path="/slots/:floorId"
        element={
          <ProtectedRoute allowedRoles={getAllowedRoles('/slots/:floorId')}>
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
