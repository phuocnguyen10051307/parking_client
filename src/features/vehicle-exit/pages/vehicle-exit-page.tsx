import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { SearchSessionCard } from '../components/search-session-card';
import { ParkingSessionDetails } from '../components/parking-session-details';
import { PaymentSummaryCard } from '../components/payment-summary-card';
import { TerminalStatusCard } from '../components/terminal-status-card';
import { useVehicleExit } from '../hooks/use-vehicle-exit';

export default function VehicleExitPage() {
  const {
    licensePlate,
    setLicensePlate,
    session,
    setExitImage,
    isCheckingOut,
    handlePlateDetected,
    handleSearchSession,
    handleCheckout,
  } = useVehicleExit();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <div className="text-3xl font-semibold text-blue-900">Vehicle Exit</div>

          <p className="mt-2 text-slate-500">Process vehicle departure and payment.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <SearchSessionCard
              licensePlate={licensePlate}
              setLicensePlate={setLicensePlate}
              onImageCaptured={setExitImage}
              onPlateDetected={handlePlateDetected}
              onSearch={handleSearchSession}
            />

            {session && <ParkingSessionDetails session={session} />}
          </div>

          <div className="space-y-6">
            {session && (
              <PaymentSummaryCard
                entryTime={session.entryTime}
                totalFee={session.totalFee}
                vehicleType={session.vehicle.vehicleType}
                isCheckingOut={isCheckingOut}
                onCheckout={handleCheckout}
              />
            )}

            <TerminalStatusCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

