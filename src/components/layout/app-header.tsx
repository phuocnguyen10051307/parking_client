import { Bell, CircleHelp, Search } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
      <div className="relative w-[450px]">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          placeholder="Search sessions, plates or users..."
          className="h-11 w-full rounded-xl border border-slate-200 pl-10 outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
          Building Status: Active
        </div>

        <Bell className="cursor-pointer text-slate-600" />

        <CircleHelp className="cursor-pointer text-slate-600" />
      </div>
    </header>
  );
}
