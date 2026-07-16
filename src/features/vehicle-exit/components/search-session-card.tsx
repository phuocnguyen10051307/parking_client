import { Search } from 'lucide-react';

import { LicensePlateCamera } from '@/features/vehicle-entry/components/license-plate-camera';

type Props = {
  licensePlate: string;
  setLicensePlate: (value: string) => void;
  onImageCaptured: (file: File | null) => void;
  onPlateDetected: (plate: string) => void;
  onSearch: () => void;
};

export function SearchSessionCard({
  licensePlate,
  setLicensePlate,
  onImageCaptured,
  onPlateDetected,
  onSearch,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Search className="text-blue-900" />
        <h2 className="text-2xl font-semibold text-blue-900">Search Session</h2>
      </div>

      <div className="space-y-5">
        <LicensePlateCamera onPlateDetected={onPlateDetected} onImageCaptured={onImageCaptured} />

        <div>
          <label className="mb-2 block text-sm text-slate-500">License Plate Number</label>
          <div className="flex gap-3">
            <input
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="51A-234.44"
              className="w-full rounded-xl bg-slate-100 p-4 text-3xl font-bold tracking-[0.2em]"
            />

            <button onClick={onSearch} className="rounded-xl bg-blue-900 px-4 text-white">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
