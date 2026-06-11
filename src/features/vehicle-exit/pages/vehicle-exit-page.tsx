// src/features/vehicle-exit/pages/vehicle-exit-page.tsx

import { SearchSessionCard } from '../components/search-session-card';
import { ParkingSessionDetails } from '../components/parking-session-details';
import { PaymentSummaryCard } from '../components/payment-summary-card';
import { TerminalStatusCard } from '../components/terminal-status-card';
import { DashboardLayout } from '@/app/layouts/dashboard-layout';

export default function VehicleExitPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <div className="text-3xl font-semibold text-blue-900">Vehicle Exit</div>

          <p className="mt-2 text-slate-500">Process vehicle departure and payment.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <SearchSessionCard />

            <ParkingSessionDetails />
          </div>

          <div className="space-y-6">
            <PaymentSummaryCard />

            <TerminalStatusCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
