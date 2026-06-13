type DashboardStatCardProps = {
  title: string;
  value: string;
  growth: string;
};

export function DashboardStatCard({ title, value, growth }: DashboardStatCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex justify-end">
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
          {growth}
        </span>
      </div>

      <p className="mb-2 text-sm text-slate-500">{title}</p>

      <h2 className="text-4xl font-bold text-slate-900">{value}</h2>
    </div>
  );
}
