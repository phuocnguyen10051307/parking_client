const activities = [
  {
    plate: 'ABC-1234',
    detail: 'Entry at Gate 01',
  },
  {
    plate: 'XYZ-9876',
    detail: 'Exit at Gate 02',
  },
];

export function RecentActivityCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="mb-8 text-3xl font-bold">Recent Activity</h2>

      <div className="space-y-6">
        {activities.map((item) => (
          <div key={item.plate} className="border-b pb-4 last:border-none">
            <p className="font-semibold">{item.plate}</p>

            <p className="text-slate-500">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
