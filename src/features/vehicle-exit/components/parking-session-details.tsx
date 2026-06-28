import type { ExitSession } from '../types/vehicle-exit.type';

type Props = {
  session: ExitSession | null;
};

export function ParkingSessionDetails({ session }: Props) {
  if (!session) return null;

  return (
    <div className="rounded-3xl border bg-white shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-blue-900">Parking Session Details</h2>

      <div className="mt-6 space-y-4">
        <p>
          <strong>Plate:</strong> {session.vehicle.licensePlate}
        </p>
        <p>
          <strong>Type:</strong> {session.vehicle.vehicleType}
        </p>
        <p>
          <strong>Brand:</strong> {session.vehicle.brand}
        </p>
        <p>
          <strong>Color:</strong> {session.vehicle.color}
        </p>
        <p>
          <strong>Slot:</strong> {session.slot.slotCode}
        </p>
        <p>
          <strong>Entry:</strong> {session.entryTime}
        </p>
      </div>
    </div>
  );
}
