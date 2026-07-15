import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { VehicleEntryForm } from '../components/vehicle-entry-form';
import { RecommendedSlotCard } from '../components/recommended-slot-card';
import { ZoneVisualization } from '../components/zone-visualization';
import { VehicleEntryActions } from '../components/vehicle-entry-actions';
import { useVehicleEntry } from '../hooks/use-vehicle-entry';

export default function VehicleEntryPage() {
  const {
    licensePlate,
    setLicensePlate,
    vehicleType,
    entryGate,
    setEntryImage,
    isCheckingIn,
    vehicle,
    floorOptions,
    zoneOptions,
    selectedFloorId,
    setSelectedFloorId,
    selectedZoneId,
    setSelectedZoneId,
    slots,
    selectedSlot,
    setSelectedSlot,
    handleCheckIn,
  } = useVehicleEntry();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <div className="text-3xl font-semibold text-blue-900">New Vehicle Entry</div>

          <p className="mt-2 text-base text-slate-500">
            Register vehicle and assign parking slot for an incoming session.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <VehicleEntryForm
            licensePlate={licensePlate}
            setLicensePlate={setLicensePlate}
            vehicleType={vehicleType}
            entryGate={entryGate}
            vehicle={vehicle}
            onImageCaptured={setEntryImage}
          />

          <div className="space-y-8">
            <RecommendedSlotCard selectedSlot={selectedSlot} />

            <ZoneVisualization
              floorOptions={floorOptions}
              zoneOptions={zoneOptions}
              selectedFloorId={selectedFloorId}
              onSelectFloor={(floorId) => {
                setSelectedFloorId(floorId);
                setSelectedSlot(null);
              }}
              selectedZoneId={selectedZoneId}
              onSelectZone={(zoneId) => {
                setSelectedZoneId(zoneId);
                setSelectedSlot(null);
              }}
              slots={slots}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
            />
          </div>
        </div>

        <VehicleEntryActions
          selectedSlot={selectedSlot}
          isCheckingIn={isCheckingIn}
          onCheckIn={handleCheckIn}
        />
      </div>
    </DashboardLayout>
  );
}
