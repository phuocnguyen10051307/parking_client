export function MaintenanceBanner() {
  return (
    <div className="rounded-2xl bg-blue-900 p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Floor 4 Maintenance Scheduled</h3>

          <p className="mt-1 text-blue-100">
            Section B will be closed for light repairs tomorrow between 02:00 AM - 04:00 AM.
          </p>
        </div>

        <button className="rounded-lg bg-white px-6 py-3 font-medium text-blue-900">
          Acknowledge
        </button>
      </div>
    </div>
  );
}
