import { Car, Bike, Truck, Filter } from 'lucide-react';

export function SlotFilterBar() {
  return (
    <div className="mb-8 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-6">
        {/* Filter loại xe */}
        <div className="flex items-center gap-3">
          <Filter size={16} />

          <span className="text-xs font-bold uppercase text-slate-500">Vehicle Type</span>

          <button className="rounded-lg bg-blue-900 p-2 text-white">All</button>

          <button className="rounded-lg bg-slate-100 p-2">
            <Car size={16} />
          </button>

          <button className="rounded-lg bg-slate-100 p-2">
            <Bike size={16} />
          </button>

          <button className="rounded-lg bg-slate-100 p-2">
            <Truck size={16} />
          </button>
        </div>

        {/* Filter trạng thái */}
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full border border-emerald-500 px-3 py-1 text-xs font-semibold text-emerald-600">
            Available
          </button>

          <button className="rounded-full border border-blue-900 px-3 py-1 text-xs font-semibold text-blue-900">
            Occupied
          </button>

          <button className="rounded-full border border-amber-500 px-3 py-1 text-xs font-semibold text-amber-500">
            Reserved
          </button>

          <button className="rounded-full border border-slate-400 px-3 py-1 text-xs font-semibold text-slate-500">
            Maintenance
          </button>
        </div>
      </div>
    </div>
  );
}
