const floors = [
  {
    floor: 'Floor 1 - Premium',
    occupancy: 85,
  },
  {
    floor: 'Floor 2 - Standard',
    occupancy: 62,
  },
  {
    floor: 'Floor 3 - Standard',
    occupancy: 48,
  },
];

export function OccupancyCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="mb-8 text-3xl font-bold">Occupancy by Floor</h2>

      <div className="space-y-8">
        {floors.map((item) => (
          <div key={item.floor}>
            <div className="mb-3 flex justify-between">
              <span>{item.floor}</span>

              <span>{item.occupancy}%</span>
            </div>

            <div className="h-4 rounded-full bg-slate-200">
              <div
                className="h-4 rounded-full bg-blue-900"
                style={{
                  width: `${item.occupancy}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
