import type { EntrySlot } from '../types/vehicle-entry.type';

type Props = {
  selectedSlot: EntrySlot | null;
  onCheckIn: () => void;
};

export function VehicleEntryActions({ selectedSlot, onCheckIn }: Props) {
  return (
    <section className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
      {/* Option in vé */}
      <label className="flex items-center gap-2">
        <input type="checkbox" defaultChecked />

        <span>Print entry ticket automatically</span>
      </label>

      {/* Action buttons */}
      <div className="flex gap-4">
        {/* Cancel */}
        <button className="text-red-600 transition hover:text-red-700">Cancel Entry</button>

        {/* Manual info */}
        <button className="rounded-xl border px-6 py-3">Manual Slot Assignment</button>

        {/* Create parking session */}
        <button
          onClick={onCheckIn}
          disabled={!selectedSlot}
          className={`rounded-xl px-6 py-3 text-white transition ${
            selectedSlot ? 'bg-blue-900 hover:bg-blue-800' : 'cursor-not-allowed bg-slate-300'
          }`}
        >
          Create Parking Session
        </button>
      </div>
    </section>
  );
}
