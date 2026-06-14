import type { ReportStat } from '../types/report';

type Props = {
  stat: ReportStat;
};

export function ReportStatCard({ stat }: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      {/* Tiêu đề */}
      <p className="text-sm text-slate-500">{stat.title}</p>

      {/* Giá trị */}
      <h3 className="mt-3 text-4xl font-bold text-blue-900">{stat.value}</h3>

      {/* Ghi chú */}
      <p className="mt-2 text-sm text-green-600">{stat.note}</p>
    </div>
  );
}
