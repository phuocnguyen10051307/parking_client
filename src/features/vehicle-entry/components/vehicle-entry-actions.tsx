export function VehicleEntryActions() {
  return (
    <section className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
      <label className="flex items-center gap-2">
        <input type="checkbox" defaultChecked />

        <span>Print entry ticket automatically</span>
      </label>

      <div className="flex gap-4">
        <button className="text-red-600">Cancel Entry</button>

        <button className="rounded-xl border px-6 py-3">Manual Slot Assignment</button>

        <button className="rounded-xl bg-blue-900 px-6 py-3 text-white">
          Create Parking Session
        </button>
      </div>
    </section>
  );
}
