import { Car, Search } from 'lucide-react';

import type { EntryVehicle } from '../types/vehicle-entry.type';

type Props = {
  licensePlate: string;
  setLicensePlate: (value: string) => void;
  vehicleType: string;
  setVehicleType: (value: string) => void;
  entryGate: string;
  setEntryGate: (value: string) => void;
  vehicle: EntryVehicle | null;
  onSearch: () => void;
  onLoadSlots: () => void;
};

export function VehicleEntryForm({
  licensePlate,
  setLicensePlate,
  vehicleType,
  setVehicleType,
  entryGate,
  setEntryGate,
  vehicle,
  onSearch,
  onLoadSlots,
}: Props) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3 border-b pb-4">
        <Car className="text-blue-900" />

        <h2 className="text-2xl font-semibold text-blue-900">Vehicle Information</h2>
      </div>

      <div className="space-y-6">
        {/* Input biển số */}
        <div>
          <label className="mb-2 block text-sm text-slate-500">License Plate Number</label>

          <div className="flex gap-3">
            <input
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="ABC-1234"
              className="w-full rounded-xl bg-slate-100 p-4 text-3xl font-bold tracking-[0.2em]"
            />

            {/* Nút search xe */}
            <button onClick={onSearch} className="rounded-xl bg-blue-900 px-4 text-white">
              <Search size={20} />
            </button>
          </div>

          <p className="mt-2 text-sm italic text-slate-400">
            Standard or specialized formats supported.
          </p>
        </div>

        {/* Vehicle type + Gate */}
        <div className="grid grid-cols-2 gap-4">
          {/* Chọn loại xe */}
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="rounded-xl bg-slate-100 p-3"
          >
            <option value="CAR">Car</option>
            <option value="MOTORBIKE">Motorbike</option>
            <option value="BICYCLE">Bicycle</option>
            <option value="ELECTRIC_BIKE">Electric Bike</option>
          </select>

          {/* Chọn cổng vào */}
          <select
            value={entryGate}
            onChange={(e) => setEntryGate(e.target.value)}
            className="rounded-xl bg-slate-100 p-3"
          >
            <option value="North Main Entrance">North Main Entrance</option>
            <option value="South Gate">South Gate</option>
            <option value="West Gate">West Gate</option>
          </select>
        </div>

        {/* Trạng thái tìm xe */}
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

        {/* Load slot */}
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
