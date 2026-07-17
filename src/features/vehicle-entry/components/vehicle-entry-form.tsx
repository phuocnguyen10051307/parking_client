import { Car } from 'lucide-react';

import { LicensePlateCamera } from './license-plate-camera';

type Props = {
  licensePlate: string;
  setLicensePlate: (value: string) => void;
  onImageCaptured: (file: File | null) => void;
};

export function VehicleEntryForm({
  licensePlate,
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
      </div>
    </section>
  );
}
