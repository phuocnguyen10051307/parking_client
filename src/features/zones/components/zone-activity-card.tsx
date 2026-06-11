export function ZoneActivityCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Real-time Zone Activity</h3>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          Live Monitor
        </span>
      </div>

      <div className="space-y-4">
        <div>
          Vehicle entered Zone A<span className="float-right text-slate-500">14:02</span>
        </div>

        <div>
          Capacity warning Zone B<span className="float-right text-slate-500">13:58</span>
        </div>

        <div>
          VIP reservation confirmed
          <span className="float-right text-slate-500">13:45</span>
        </div>
      </div>
    </div>
  );
}
