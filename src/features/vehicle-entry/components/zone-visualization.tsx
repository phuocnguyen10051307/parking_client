import type { EntryFloorOption, EntrySlot, EntryZoneOption } from '../types/vehicle-entry.type';

type Props = {
  floorOptions: EntryFloorOption[];
  zoneOptions: EntryZoneOption[];
  selectedFloorId: string;
  selectedZoneId: string;
  slots: EntrySlot[];
  selectedSlot: EntrySlot | null;
  onSelectFloor: (floorId: string) => void;
  onSelectZone: (zoneId: string) => void;
  onSelectSlot: (slot: EntrySlot) => void;
};

export function ZoneVisualization({
  floorOptions,
  zoneOptions,
  selectedFloorId,
  selectedZoneId,
  slots,
  selectedSlot,
  onSelectFloor,
  onSelectZone,
  onSelectSlot,
}: Props) {
  const hasLoadedFloors = floorOptions.length > 0;
  const hasSelectedZone = Boolean(selectedFloorId && selectedZoneId);

  return (
    <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700">
          Slot Assignment
        </h3>

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

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-600">Floor</span>
          <select
            value={selectedFloorId}
            onChange={(event) => onSelectFloor(event.target.value)}
            disabled={!hasLoadedFloors}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-900 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <option value="">Select floor</option>
            {floorOptions.map((floor) => (
              <option key={floor.id} value={floor.id}>
                {floor.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-600">Zone</span>
          <select
            value={selectedZoneId}
            onChange={(event) => onSelectZone(event.target.value)}
            disabled={!selectedFloorId || zoneOptions.length === 0}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-900 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <option value="">Select zone</option>
            {zoneOptions.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!hasLoadedFloors ? (
        <div className="rounded-xl bg-slate-100 p-6 text-center text-slate-500">
          Capture the entry image, then select a floor and zone.
        </div>
      ) : !hasSelectedZone ? (
        <div className="rounded-xl bg-slate-100 p-6 text-center text-slate-500">
          Select a floor and zone to view available slots.
        </div>
      ) : slots.length === 0 ? (
        <div className="rounded-xl bg-slate-100 p-6 text-center text-slate-500">
          No available slots in this zone.
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
    </div>
  );
}

