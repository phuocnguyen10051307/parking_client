import { Car } from 'lucide-react';

import type { EntryVehicle } from '../types/vehicle-entry.type';
import { LicensePlateCamera } from './license-plate-camera';

type Props = {
  licensePlate: string;
  vehicle: EntryVehicle | null;
  setLicensePlate: (value: string) => void;
  onImageCaptured: (file: File | null) => void;
};

export function VehicleEntryForm({
  licensePlate,
  vehicle,
  setLicensePlate,
  onImageCaptured,
}: Props) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3 border-b pb-4">
        <Car className="text-blue-900" />
        <h2 className="text-2xl font-semibold text-blue-900">Vehicle Information</h2>
      </div>

      <div className="space-y-6">
        <LicensePlateCamera onPlateDetected={setLicensePlate} onImageCaptured={onImageCaptured} />

        <div>
          <label className="mb-2 block text-sm text-slate-500">License Plate Number</label>

          <input
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            placeholder="51A-234.44"
            className="w-full rounded-xl bg-slate-100 p-4 text-3xl font-bold tracking-[0.2em]"
          />

          <p className="mt-2 text-sm italic text-slate-400">
            Review the detected plate and edit it before confirming check-in.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-2xl font-semibold text-blue-900">Pre-registration Check</p>

          {vehicle ? (
            <div className="mt-4 space-y-2 text-lg text-slate-700">
              <p>
                <strong>Plate:</strong> {vehicle.licensePlate}
              </p>

              <p>
                <strong>Type:</strong> {vehicle.vehicleType}
              </p>

              <p>
                <strong>Brand:</strong> {vehicle.brand || 'Unknown'}
              </p>

              <p>
                <strong>Color:</strong> {vehicle.color || 'Unknown'}
              </p>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-600">
              This vehicle is not in the system. A guest check-in will be created after confirmation.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
