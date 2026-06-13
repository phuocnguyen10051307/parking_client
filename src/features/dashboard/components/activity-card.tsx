export function ActivityCard() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-3xl font-bold text-blue-900">Recent Activity</h3>

      <div className="space-y-4">
        <div>
          <p className="font-semibold">ABC-1234</p>

          <p className="text-sm text-slate-500">Entry at Gate 01</p>
        </div>

        <div>
          <p className="font-semibold">XYZ-9876</p>

          <p className="text-sm text-slate-500">Exit at Gate 02</p>
        </div>
      </div>
    </div>
  );
}
