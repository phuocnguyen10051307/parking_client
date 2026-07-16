import { Link } from 'react-router-dom';

import type { Floor } from '../types/floor';

type Props = {
  floor: Floor;
};

export function FloorCard({ floor }: Props) {
  const totalSlots = floor.totalSlots ?? 0;
  const occupiedSlots = floor.occupiedSlots ?? 0;
  const availability = floor.availability ?? 0;
  const occupiedPercent = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;
  const availableSlots = Math.max(totalSlots - occupiedSlots, 0);
  const status = floor.status ?? 'Operational';

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-blue-900">{floor.name ?? 'Unnamed floor'}</h3>
          <p className="text-sm text-slate-500">{floor.description ?? 'No description'}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Total Slots</span>
          <span className="font-semibold">{totalSlots}</span>
        </div>

        <div className="flex justify-between">
          <span>Occupied</span>
          <span className="font-semibold text-red-500">{occupiedSlots}</span>
        </div>

        <div className="flex justify-between">
          <span>Available Slots</span>
          <span className="font-semibold text-emerald-600">{availableSlots}</span>
        </div>

        <div className="flex justify-between">
          <span>Availability</span>
          <span className="font-semibold text-green-600">{availability}%</span>
        </div>
      </div>

      <div className="mt-5">
        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-900"
            style={{ width: `${occupiedPercent}%` }}
          />
        </div>

        <p className="mt-2 text-sm text-slate-500">Occupancy {occupiedPercent}%</p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            status === 'Operational'
              ? 'bg-green-100 text-green-700'
              : status === 'Near Capacity'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-slate-200 text-slate-700'
          }`}
        >
          {status}
        </span>

        <Link to="/slots" className="font-medium text-blue-900 hover:underline">
          View Slots
        </Link>
      </div>
    </div>
  );
}

