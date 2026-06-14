export function TrafficChart() {
  const values = [60, 45, 80, 30, 70, 90];

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold">Vehicle Traffic</h3>

      <div className="space-y-4">
        {values.map((value, index) => (
          <div key={index}>
            <div className="mb-1 flex justify-between text-sm">
              <span>Hour {index + 8}</span>
              <span>{value}%</span>
            </div>

            <div className="h-3 rounded-full bg-slate-200">
              <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
