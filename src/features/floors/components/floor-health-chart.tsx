type Props = {
  values: number[];
};

export function FloorHealthChart({ values }: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h3 className="mb-8 text-xl font-semibold text-blue-900">Facility Health</h3>

      <div className="flex h-56 items-end gap-4">
        {values.map((value, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-xl bg-blue-200"
            style={{
              height: `${value}%`,
            }}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-between text-sm text-slate-500">
        <span>B1</span>
        <span>L1</span>
        <span>L2</span>
        <span>L3</span>
      </div>
    </div>
  );
}
