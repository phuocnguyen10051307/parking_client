import { Car, Search } from 'lucide-react';

import { LicensePlateCamera } from './license-plate-camera';

import type { EntryVehicle } from '../types/vehicle-entry.type';

type Props = {
  licensePlate: string;
  setLicensePlate: (value: string) => void;
  vehicleType: string;
  entryGate: string;
  vehicle: EntryVehicle | null;
  onSearch: () => void;
  onLoadSlots: () => void;
  onImageCaptured: (file: File | null) => void;
};

export function VehicleEntryForm({
  licensePlate,
  setLicensePlate,
  vehicleType,
  entryGate,
  vehicle,
  onSearch,
  onLoadSlots,
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

          <div className="flex gap-3">
            <input
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="ABC-1234"
              className="w-full rounded-xl bg-slate-100 p-4 text-3xl font-bold tracking-[0.2em]"
            />

            <button onClick={onSearch} className="rounded-xl bg-blue-900 px-4 text-white">
              <Search size={20} />
            </button>
          </div>

          <p className="mt-2 text-sm italic text-slate-400">
            Review the detected plate and edit it before confirming check-in.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-100 p-3">
            <p className="text-xs font-medium uppercase text-slate-500">Vehicle Type</p>
            <p className="mt-1 font-semibold text-slate-800">{vehicleType}</p>
          </div>

          <div className="rounded-xl bg-slate-100 p-3">
            <p className="text-xs font-medium uppercase text-slate-500">Entry Gate</p>
            <p className="mt-1 font-semibold text-slate-800">{entryGate}</p>
          </div>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="font-semibold text-blue-900">Pre-registration Check</p>

          {vehicle ? (
            <div className="mt-2 space-y-1 text-sm text-slate-700">
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
            <p className="mt-1 text-sm text-slate-600">
              This vehicle is not in the system. New guest profile will be created.
            </p>
          )}
        </div>

        <button
          onClick={onLoadSlots}
          className="w-full rounded-xl bg-emerald-600 py-3 font-medium text-white"
        >
          Load Available Slots
        </button>
      </div>
    </section>
  );
}

