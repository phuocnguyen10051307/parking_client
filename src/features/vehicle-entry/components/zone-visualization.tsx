import type { EntrySlot } from '../types/vehicle-entry.type';

type Props = {
  slots: EntrySlot[];
  selectedSlot: EntrySlot | null;
  onSelectSlot: (slot: EntrySlot) => void;
};

export function ZoneVisualization({ slots, selectedSlot, onSelectSlot }: Props) {
  return (
    <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700">
          Zone Visualization
        </h3>

        {/* Legend */}
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-emerald-500" />
            <span>Available</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-blue-900" />
            <span>Selected</span>
          </div>
        </div>
      </div>

      {/* Grid slots */}
      {slots.length === 0 ? (
        <div className="rounded-xl bg-slate-100 p-6 text-center text-slate-500">
          No available slots loaded.
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {slots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;

            return (
              <button
                key={slot.id}
                onClick={() => onSelectSlot(slot)}
                className={`flex h-14 items-center justify-center rounded-xl border text-sm font-medium transition-all ${
                  isSelected
                    ? 'border-blue-900 bg-blue-900 text-white'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:scale-105'
                }`}
              >
                {slot.slotCode}
              </button>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <button
        className="
          mt-6
          w-full
          rounded-xl
          border
          border-dashed
          border-slate-300
          py-3
          text-sm
          text-slate-500
          transition-all
          hover:border-blue-900
          hover:text-blue-900
        "
      >
        Refresh Parking Map
      </button>
    </div>
  );
}
