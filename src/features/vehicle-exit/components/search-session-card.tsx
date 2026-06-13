// src/features/vehicle-exit/components/search-session-card.tsx

import { Search } from 'lucide-react';

export function SearchSessionCard() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Search className="text-blue-900" />

        <h2 className="text-2xl font-semibold text-blue-900">Search Session</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input placeholder="TKT-7829-X" className="rounded-xl border p-3" />

        <input placeholder="ABC-1234" className="rounded-xl border p-3" />
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 py-3 font-semibold text-white">
        <Search size={18} />
        Find Session
      </button>
    </div>
  );
}
