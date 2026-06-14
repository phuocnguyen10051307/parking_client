import { Navigate, Route, Routes } from 'react-router-dom';

import DashboardPage from '@/features/dashboard/pages/dashboard-page';

import { AuthRouter } from './auth-router';
import VehicleEntryPage from '@/features/vehicle-entry/pages/vehicle-entry-page';
import VehicleExitPage from '@/features/vehicle-exit/pages/vehicle-exit-page';
import ParkingSessionsPage from '@/features/parking-sessions/pages/parking-sessions-page';
import FloorsPage from '@/features/floors/pages/floors-page';
import ZonesPage from '@/features/zones/pages/zones-page';
import SlotsPage from '@/features/slots/pages/slots-page';
import PricingPage from '@/features/pricing/pages/pricing-page';
import ReportsPage from '@/features/reports/pages/reports-page';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />

      {AuthRouter()}

      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/vehicle-entry" element={<VehicleEntryPage />} />
      <Route path="/vehicle-exit" element={<VehicleExitPage />} />
      <Route path="/parking-sessions" element={<ParkingSessionsPage />} />
      <Route path="/floors" element={<FloorsPage />} />
      <Route path="/zones" element={<ZonesPage />} />
      <Route path="/slots" element={<Navigate to="/slots/basement-1" replace />} />
      <Route path="/slots/:floorId" element={<SlotsPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/reports" element={<ReportsPage />} />
    </Routes>
  );
}
