export function FloorInsightCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-blue-900 p-8 text-white">
      <div className="text-2xl font-semibold">Operational Excellence</div>

      <p className="mt-4 max-w-md text-blue-100">
        Urban Flow predicts peak occupancy for L1 within the next 45 minutes.
      </p>

      <button className="mt-6 rounded-xl bg-white px-6 py-3 font-medium text-blue-900">
        Review Analytics
      </button>
    </div>
  );
}
