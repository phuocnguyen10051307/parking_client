import { Link } from 'react-router-dom';

import type { Zone } from '../types/zone';

type Props = {
  zone: Zone;
};

export function ZoneCard({ zone }: Props) {
  const percent = zone.capacity > 0 ? Math.round((zone.occupied / zone.capacity) * 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{zone.name}</h3>
          <p className="text-sm text-slate-500">{zone.floor}</p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {zone.type}
        </span>
      </div>

      <div>
        <div className="mb-2 flex justify-between">
          <span className="text-sm text-slate-500">Occupancy</span>
          <span className="font-medium">
            {zone.occupied}/{zone.capacity}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-blue-600" style={{ width: `${percent}%` }} />
        </div>

        <p className="mt-2 text-xs text-slate-500">{zone.note}</p>
      </div>

      <div className="mt-6">
        <Link
          to={`/slots/${zone.floorId}`}
          className="block rounded-xl bg-blue-50 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-100"
        >
          View Slots
        </Link>
      </div>
    </div>
  );
}