import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { VehicleEntryForm } from '../components/vehicle-entry-form';
import { RecommendedSlotCard } from '../components/recommended-slot-card';
import { ZoneVisualization } from '../components/zone-visualization';
import { VehicleEntryActions } from '../components/vehicle-entry-actions';
import { useVehicleEntry } from '../hooks/use-vehicle-entry';

export default function VehicleEntryPage() {
  // Hook quản lý toàn bộ flow check-in
  const {
    licensePlate,
    setLicensePlate,
    vehicleType,
    setVehicleType,
    entryGate,
    setEntryGate,
    vehicle,
    slots,
    selectedSlot,
    setSelectedSlot,
    handleSearchVehicle,
    loadAvailableSlots,
    handleCheckIn,
  } = useVehicleEntry();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="text-3xl font-semibold text-blue-900">New Vehicle Entry</div>

          <p className="mt-2 text-base text-slate-500">
            Register vehicle and assign parking slot for an incoming session.
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form nhập thông tin xe */}
          <VehicleEntryForm
            licensePlate={licensePlate}
            setLicensePlate={setLicensePlate}
            vehicleType={vehicleType}
            setVehicleType={setVehicleType}
            entryGate={entryGate}
            setEntryGate={setEntryGate}
            vehicle={vehicle}
            onSearch={handleSearchVehicle}
            onLoadSlots={loadAvailableSlots}
          />

          <div className="space-y-8">
            {/* Slot được recommend */}
            <RecommendedSlotCard selectedSlot={selectedSlot} />

            {/* Danh sách slot */}
            <ZoneVisualization
              slots={slots}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
            />
          </div>
        </div>

        {/* Action cuối */}
        <VehicleEntryActions selectedSlot={selectedSlot} onCheckIn={handleCheckIn} />
      </div>
    </DashboardLayout>
  );
}
