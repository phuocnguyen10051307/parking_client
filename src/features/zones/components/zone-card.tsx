import { Link } from 'react-router-dom';

import type { Zone } from '../types/zone';

type Props = {
  zone: Zone;
};

export function ZoneCard({ zone }: Props) {
  const capacity = zone.capacity ?? 0;
  const occupied = zone.occupied ?? 0;
  const percent = capacity > 0 ? Math.round((occupied / capacity) * 100) : 0;
  const floorLabel =
    typeof zone.floor === 'string' ? zone.floor : `Level ${zone.floor.floorNumber}`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{zone.name}</h3>
          <p className="text-sm text-slate-500">{floorLabel}</p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {zone.type ?? zone.vehicleType ?? 'N/A'}
        </span>
      </div>

      <div>
        <div className="mb-2 flex justify-between">
          <span className="text-sm text-slate-500">Occupancy</span>
          <span className="font-medium">
            {occupied}/{capacity}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-blue-600" style={{ width: `${percent}%` }} />
        </div>

        <p className="mt-2 text-xs text-slate-500">{zone.note ?? 'No activity note'}</p>
      </div>

      <div className="mt-6">
        <Link
          to="/slots"
          className="block rounded-xl bg-blue-50 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-100"
        >
          View Slots
        </Link>
      </div>
    </div>
  );
}

