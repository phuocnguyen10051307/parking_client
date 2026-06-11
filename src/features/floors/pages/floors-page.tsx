import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { floorData } from '../data/floor-data';

import { FloorCard } from '../components/floor-card';
import { FloorHealthChart } from '../components/floor-health-chart';
import { FloorInsightCard } from '../components/floor-insight-card';

export default function FloorsPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-3xl font-semibold text-blue-900">Floor Management</div>

          <p className="mt-2 text-slate-500">Manage parking levels and monitor occupancy.</p>
        </div>

        <button className="rounded-xl bg-blue-900 px-5 py-3 font-medium text-white">
          Add New Floor
        </button>
      </div>

      {/* Summary */}
      {/* Facility Summary */}
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              Facility Overview
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-6">
          {/* Active Floors */}
          <div className="rounded-2xl bg-blue-50 p-5">
            <p className="text-sm text-slate-500">Active Floors</p>

            <h3 className="mt-2 text-4xl font-bold text-blue-900">4</h3>

            <p className="mt-1 text-sm text-green-600">All floors operational</p>
          </div>

          {/* Capacity */}
          <div className="rounded-2xl bg-emerald-50 p-5">
            <p className="text-sm text-slate-500">Total Capacity</p>

            <h3 className="mt-2 text-4xl font-bold text-emerald-700">1,250</h3>

            <p className="mt-1 text-sm text-slate-600">Parking slots available</p>
          </div>

          {/* Occupancy */}
          <div className="rounded-2xl bg-amber-50 p-5">
            <p className="text-sm text-slate-500">Current Occupancy</p>

            <h3 className="mt-2 text-4xl font-bold text-amber-600">53%</h3>

            <p className="mt-1 text-sm text-slate-600">660 / 1250 slots occupied</p>
          </div>
        </div>
      </div>

      {/* Floor cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {floorData.map((floor) => (
          <FloorCard key={floor.id} floor={floor} />
        ))}

        {/* Card thêm tầng */}
        <div className="flex min-h-\[320px\] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-white">
          <div className="text-5xl text-slate-400">+</div>

          <p className="mt-3 font-medium">Add New Floor</p>
        </div>
      </div>

      {/* Analytics */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <FloorHealthChart values={[72, 90, 40, 13]} />

        <FloorInsightCard />
      </div>
    </DashboardLayout>
  );
}
