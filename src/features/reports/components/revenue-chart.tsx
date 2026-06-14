export function RevenueChart() {
  const values = [40, 70, 55, 90, 65, 80, 60];

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold">Revenue Overview</h3>

      <div className="flex h-64 items-end gap-4">
        {values.map((value, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-xl bg-blue-900"
            style={{ height: `${value}%` }}
          />
        ))}
      </div>
    </div>
  );
}
