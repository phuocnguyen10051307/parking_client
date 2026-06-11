type Props = {
  title: string;
  value: string;
};

export function ZoneSummaryCard({ title, value }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Tiêu đề */}
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{title}</p>

      {/* Giá trị */}
      <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
    </div>
  );
}
