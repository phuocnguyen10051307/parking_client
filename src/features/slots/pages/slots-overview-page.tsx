import { Link } from 'react-router-dom';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';

const floors = [
  {
    id: 'basement-1',
    name: 'Basement 1',
    total: 250,
    occupied: 180,
  },
  {
    id: 'floor-1',
    name: 'Floor 1',
    total: 350,
    occupied: 315,
  },
  {
    id: 'floor-2',
    name: 'Floor 2',
    total: 300,
    occupied: 120,
  },
  {
    id: 'floor-3',
    name: 'Floor 3',
    total: 350,
    occupied: 45,
  },
];

export default function SlotsOverviewPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Slots Overview</h1>

        <p className="mt-2 text-slate-500">Select a floor to manage parking slots</p>
      </div>

      {/* Danh sách tầng */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {floors.map((floor) => {
          const available = floor.total - floor.occupied;

          return (
            <Link
              key={floor.id}
              to={`/slots/${floor.id}`}
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {/* Tên tầng */}
              <h3 className="text-xl font-bold text-blue-900">{floor.name}</h3>

              {/* Thống kê */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Slots</span>

                  <span className="font-semibold">{floor.total}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Occupied</span>

                  <span className="font-semibold text-red-500">{floor.occupied}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Available</span>

                  <span className="font-semibold text-green-600">{available}</span>
                </div>
              </div>

              {/* Button */}
              <button className="mt-6 w-full rounded-xl bg-blue-900 py-2 text-white">
                View Slots
              </button>
            </Link>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
