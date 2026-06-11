export function RevenueDistributionCard() {
  return (
    <div className="rounded-3xl border bg-white p-8">
      <h3 className="text-3xl font-bold text-blue-900">Revenue Distribution</h3>

      <div className="mt-8 space-y-6">
        <div>
          <div className="mb-2 flex justify-between">
            <span>Short-stay</span>
            <span>65%</span>
          </div>

          <div className="h-3 rounded-full bg-slate-200">
            <div className="h-3 w-[65%] rounded-full bg-blue-900" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span>Daily Pass</span>
            <span>25%</span>
          </div>

          <div className="h-3 rounded-full bg-slate-200">
            <div className="h-3 w-[25%] rounded-full bg-blue-600" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span>Monthly / VIP</span>
            <span>10%</span>
          </div>

          <div className="h-3 rounded-full bg-slate-200">
            <div className="h-3 w-[10%] rounded-full bg-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
