import type { EntrySlot } from '../types/vehicle-entry.type';

type Props = {
  selectedSlot: EntrySlot | null;
};

export function RecommendedSlotCard({ selectedSlot }: Props) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-blue-900">Recommended Slot</h2>

          <p className="text-slate-500">
            AI recommendation based on vehicle type and parking availability.
          </p>
        </div>

        <span className="text-sm font-semibold text-emerald-600">
          {selectedSlot ? 'AVAILABLE' : 'NO SLOT'}
        </span>
      </div>

      {selectedSlot ? (
        <div className="grid grid-cols-3 gap-4">
          {/* Floor */}
          <div className="rounded-xl bg-slate-100 p-4 text-center">
            <p className="text-sm text-slate-500">FLOOR</p>

            <p className="text-4xl font-bold text-blue-900">
              L{selectedSlot.zone?.floor?.floorNumber || '-'}
            </p>
          </div>

          {/* Zone */}
          <div className="rounded-xl bg-slate-100 p-4 text-center">
            <p className="text-sm text-slate-500">ZONE</p>

            <p className="text-4xl font-bold text-blue-900">{selectedSlot.zone?.name || '-'}</p>
          </div>

          {/* Slot */}
          <div className="rounded-xl bg-blue-900 p-4 text-center text-white">
            <p className="text-sm">SLOT</p>

            <p className="text-4xl font-bold">{selectedSlot.slotCode}</p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-slate-100 p-6 text-center text-slate-500">
          No recommended slot yet.
        </div>
      )}
    </section>
  );
}
