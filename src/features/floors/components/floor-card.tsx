import { Pencil, Trash2 } from 'lucide-react';

import type { Floor } from '../types/floor';

type Props = {
  floor: Floor;
};

export function FloorCard({ floor }: Props) {
  const occupiedPercent = Math.round((floor.occupiedSlots / floor.totalSlots) * 100);

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-blue-900">{floor.name}</h3>

          <p className="text-sm text-slate-500">{floor.description}</p>
        </div>

        <div className="flex gap-2">
          <button>
            <Pencil size={18} />
          </button>

          <button>
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Thống kê tầng */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Total Slots</span>

          <span className="font-semibold">{floor.totalSlots}</span>
        </div>

        <div className="flex justify-between">
          <span>Occupied</span>

          <span className="font-semibold text-red-500">{floor.occupiedSlots}</span>
        </div>

        <div className="flex justify-between">
          <span>Availability</span>

          <span className="font-semibold text-green-600">{floor.availability}%</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-900"
            style={{
              width: `${occupiedPercent}%`,
            }}
          />
        </div>

        <p className="mt-2 text-sm text-slate-500">Occupancy {occupiedPercent}%</p>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            floor.status === 'Operational'
              ? 'bg-green-100 text-green-700'
              : floor.status === 'Near Capacity'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-slate-200 text-slate-700'
          }`}
        >
          {floor.status}
        </span>

        <button className="font-medium text-blue-900">View Map</button>
      </div>
    </div>
  );
}
