type DashboardKpiCardProps = {
  title: string;
  value: string;
  change: string;
};

export function DashboardKpiCard({ title, value, change }: DashboardKpiCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-3 flex justify-end">
        <span className="text-sm font-semibold text-green-500">{change}</span>
      </div>

      <p className="text-slate-500">{title}</p>

      <h2 className="mt-3 text-5xl font-bold">{value}</h2>
    </div>
  );
}
