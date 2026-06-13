export function VehicleDistributionCard() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="mb-8 text-2xl font-bold text-blue-900">Vehicle Distribution</h3>

      <div className="flex items-center justify-between">
        <div className="flex h-56 w-56 items-center justify-center rounded-full border-[24px] border-blue-900">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-blue-900">942</h2>

            <p className="text-slate-500">TOTAL</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-blue-900" />

            <span>SUV / Sedan</span>

            <span className="ml-8 font-semibold">65%</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-emerald-400" />

            <span>Electric (EV)</span>

            <span className="ml-8 font-semibold">18%</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-orange-400" />

            <span>Motorcycles</span>

            <span className="ml-8 font-semibold">12%</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-slate-500" />

            <span>Others</span>

            <span className="ml-8 font-semibold">5%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
