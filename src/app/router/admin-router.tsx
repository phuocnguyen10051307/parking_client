import { Navigate, Route } from 'react-router-dom';

import DashboardPage from '@/features/dashboard/pages/dashboard-page';
import FloorsPage from '@/features/floors/pages/floors-page';
import ParkingSessionsPage from '@/features/parking-sessions/pages/parking-sessions-page';
import PricingPage from '@/features/pricing/pages/pricing-page';
import ProfilePage from '@/features/profile/pages/profile-page';
import ReportsPage from '@/features/reports/pages/reports-page';
import SlotsPage from '@/features/slots/pages/slots-page';
import VehicleEntryPage from '@/features/vehicle-entry/pages/vehicle-entry-page';
import VehicleExitPage from '@/features/vehicle-exit/pages/vehicle-exit-page';
import ZonesPage from '@/features/zones/pages/zones-page';

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
            <ParkingSessionsPage />
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
