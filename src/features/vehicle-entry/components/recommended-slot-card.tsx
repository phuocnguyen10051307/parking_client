export function RecommendedSlotCard() {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-blue-900">Recommended Slot</h2>

          <p className="text-slate-500">Based on EV type and proximity to elevators.</p>
        </div>

        <span className="text-sm font-semibold text-emerald-600">AVAILABLE</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-slate-100 p-4 text-center">
          <p className="text-sm text-slate-500">FLOOR</p>

          <p className="text-4xl font-bold text-blue-900">L2</p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4 text-center">
          <p className="text-sm text-slate-500">ZONE</p>

          <p className="text-4xl font-bold text-blue-900">B</p>
        </div>

        <div className="rounded-xl bg-blue-900 p-4 text-center text-white">
          <p className="text-sm">SLOT</p>

          <p className="text-4xl font-bold">204</p>
        </div>
      </div>
    </section>
  );
}
