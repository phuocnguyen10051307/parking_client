import { Search } from 'lucide-react';

export function ZoneFilterBar() {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm">
      {/* Filter label */}
      <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2">
        <Search className="h-4 w-4 text-slate-500" />

        <span className="text-sm font-medium">Filter by:</span>
      </div>

      {/* Floor */}
      <select className="rounded-lg border px-4 py-2 text-sm">
        <option>All Floors</option>
        <option>Basement 1</option>
        <option>Level 1</option>
        <option>Level 2</option>
      </select>

      {/* Vehicle Type */}
      <select className="rounded-lg border px-4 py-2 text-sm">
        <option>All Vehicle Types</option>
        <option>Sedan</option>
        <option>SUV</option>
        <option>Motorcycle</option>
        <option>EV Charger</option>
      </select>

      {/* View mode */}
      <div className="ml-auto flex gap-2">
        <button className="rounded-lg bg-blue-50 p-2 text-blue-700">⊞</button>

        <button className="rounded-lg p-2 hover:bg-slate-100">☰</button>
      </div>
    </div>
  );
}
