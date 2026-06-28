import { Search } from 'lucide-react';

type Props = {
  licensePlate: string;
  setLicensePlate: (value: string) => void;
  onSearch: () => void;
};

export function SearchSessionCard({ licensePlate, setLicensePlate, onSearch }: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Search className="text-blue-900" />
        <h2 className="text-2xl font-semibold text-blue-900">Search Session</h2>
      </div>

      <input
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
        placeholder="Enter license plate..."
        className="w-full rounded-xl border p-3"
      />

      <button
        onClick={onSearch}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 py-3 font-semibold text-white"
      >
        <Search size={18} />
        Find Session
      </button>
    </div>
  );
}
