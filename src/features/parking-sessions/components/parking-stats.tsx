type Props = {
  title: string;
  value: string;
  note: string;
};

export function SessionStatCard({ title, value, note }: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>

      <h3 className="mt-3 text-5xl font-bold text-blue-900">{value}</h3>

      <p className="mt-3 text-sm text-green-600">{note}</p>
    </div>
  );
}
