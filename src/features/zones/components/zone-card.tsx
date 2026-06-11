import type { Zone } from '../types/zone';

type Props = {
  zone: Zone;
};

export function ZoneCard({ zone }: Props) {
  const percent = Math.round((zone.occupied / zone.capacity) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{zone.name}</h3>

          <p className="text-sm text-slate-500">{zone.floor}</p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {zone.type}
        </span>
      </div>

      {/* Occupancy */}
      <div>
        <div className="mb-2 flex justify-between">
          <span className="text-sm text-slate-500">Occupancy</span>

          <span className="font-medium">
            {zone.occupied}/{zone.capacity}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600"
            style={{
              width: `${percent}%`,
            }}
          />
        </div>

        <p className="mt-2 text-xs text-slate-500">{zone.note}</p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button className="flex-1 rounded-xl border border-slate-200 py-2 text-sm font-medium hover:bg-slate-50">
          Edit
        </button>

        <button className="flex-1 rounded-xl bg-blue-50 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">
          View Slots
        </button>
      </div>
    </div>
  );
}
