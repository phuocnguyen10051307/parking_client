import { Navigate, Route } from 'react-router-dom';

import DashboardPage from '@/features/dashboard/pages/dashboard-page';
import VehicleEntryPage from '@/features/vehicle-entry/pages/vehicle-entry-page';
import VehicleExitPage from '@/features/vehicle-exit/pages/vehicle-exit-page';
import ParkingSessionsPage from '@/features/parking-sessions/pages/parking-sessions-page';
import FloorsPage from '@/features/floors/pages/floors-page';
import ZonesPage from '@/features/zones/pages/zones-page';
import SlotsPage from '@/features/slots/pages/slots-page';
import PricingPage from '@/features/pricing/pages/pricing-page';
import ReportsPage from '@/features/reports/pages/reports-page';
import ProfilePage from '@/features/profile/pages/profile-page';

import { ProtectedRoute } from '@/app/router/protected-route';

export function AdminRouter() {
  return (
    <>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vehicle-entry"
        element={
          <ProtectedRoute>
            <VehicleEntryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vehicle-exit"
        element={
          <ProtectedRoute>
            <VehicleExitPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parking-sessions"
        element={
          <ProtectedRoute>
            <ParkingSessionsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/floors"
        element={
          <ProtectedRoute>
            <FloorsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/zones"
        element={
          <ProtectedRoute>
            <ZonesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/slots"
        element={
          <ProtectedRoute>
            <Navigate to="/slots/basement-1" replace />
          </ProtectedRoute>
        }
      />

      <Route
        path="/slots/:floorId"
        element={
          <ProtectedRoute>
            <SlotsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pricing"
        element={
          <ProtectedRoute>
            <PricingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </>
  );
}
