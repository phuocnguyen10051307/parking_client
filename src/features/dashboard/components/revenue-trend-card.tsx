const revenueData = [40, 60, 85, 65, 95, 35];

export function RevenueTrendCard() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-blue-900">Revenue Trend</h3>

        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-900" />
            Current
          </div>

          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-slate-300" />
            Previous
          </div>
        </div>
      </div>

      <div className="flex h-64 items-end gap-4">
        {revenueData.map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-md bg-blue-900"
            style={{
              height: `${height}%`,
            }}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-between text-sm text-slate-500">
        <span>08:00</span>
        <span>10:00</span>
        <span>12:00</span>
        <span>14:00</span>
        <span>16:00</span>
        <span>18:00</span>
      </div>
    </div>
  );
}
