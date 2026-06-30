import { Loader2 } from 'lucide-react';

import type { EntrySlot } from '../types/vehicle-entry.type';

type Props = {
  selectedSlot: EntrySlot | null;
  isCheckingIn: boolean;
  onCheckIn: () => void;
};

export function VehicleEntryActions({ selectedSlot, isCheckingIn, onCheckIn }: Props) {
  const isDisabled = !selectedSlot || isCheckingIn;

  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <label className="flex items-center gap-2">
        <input type="checkbox" defaultChecked />
        <span>Print entry ticket automatically</span>
      </label>

      <div className="flex flex-wrap gap-4">
        <button className="text-red-600 transition hover:text-red-700">Cancel Entry</button>
        <button className="rounded-xl border px-6 py-3">Manual Slot Assignment</button>
        <button
          onClick={onCheckIn}
          disabled={isDisabled}
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-white transition ${
            isDisabled ? 'cursor-not-allowed bg-slate-300' : 'bg-blue-900 hover:bg-blue-800'
          }`}
        >
          {isCheckingIn ? <Loader2 className="animate-spin" size={18} /> : null}
          {isCheckingIn ? 'Checking in...' : 'Confirm Check-in'}
        </button>
      </div>
    </section>
  );
}
