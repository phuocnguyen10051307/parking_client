export function DashboardHeader() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-5xl font-bold text-blue-900">Manager Overview</h1>

        <p className="text-slate-500">Real-time facility performance and operations metrics.</p>
      </div>

      <div className="flex gap-4">
        <button className="rounded-lg border px-4 py-2">Last 24 Hours</button>

        <button className="rounded-lg bg-blue-900 px-4 py-2 text-white">Export Report</button>
      </div>
    </div>
  );
}
