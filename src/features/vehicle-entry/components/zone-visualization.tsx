export function ZoneVisualization() {
  const slots = [
    { id: '201', status: 'occupied' },
    { id: '202', status: 'occupied' },
    { id: '203', status: 'reserved' },
    { id: '204', status: 'selected' },

    { id: '205', status: 'available' },
    { id: '206', status: 'available' },
    { id: '207', status: 'occupied' },
    { id: '208', status: 'available' },

    { id: '209', status: 'available' },
    { id: '210', status: 'available' },
    { id: '211', status: 'occupied' },
    { id: '212', status: 'available' },

    { id: '213', status: 'available' },
    { id: '214', status: 'occupied' },
    { id: '215', status: 'available' },
    { id: '216', status: 'reserved' },
  ];

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700">
          Zone B Visualization
        </h3>

        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-emerald-500" />
            <span>Available</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-red-500" />
            <span>Occupied</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-amber-500" />
            <span>Reserved</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`flex h-14 items-center justify-center rounded-xl border text-sm font-medium transition-all ${
              slot.status === 'selected'
                ? 'border-blue-900 bg-blue-900 text-white'
                : slot.status === 'available'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : slot.status === 'occupied'
                    ? 'border-red-200 bg-red-50 text-red-400'
                    : 'border-amber-200 bg-amber-50 text-amber-600'
            }`}
          >
            {slot.id}
          </div>
        ))}
      </div>

      <button
        className="
          mt-6
          w-full
          rounded-xl
          border
          border-dashed
          border-slate-300
          py-3
          text-sm
          text-slate-500
          transition-all
          hover:border-blue-900
          hover:text-blue-900
        "
      >
        View Full L2 Map
      </button>
    </div>
  );
}
