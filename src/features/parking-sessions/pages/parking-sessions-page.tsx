import { Filter, Download } from 'lucide-react';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { SessionStatCard } from '../components/parking-stats';
import { ParkingSessionTable } from '../components/parking-session-table';
import { ParkingAiCard } from '../components/parking-ai-card';
import { RevenueDistributionCard } from '../components/revenue-distribution-card';

export default function ParkingSessionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-3xl font-semibold text-blue-900">Session Ledger</div>

            <p className="mt-2 text-lg text-slate-500">Monitor all parking sessions in real time</p>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 rounded-xl border bg-white px-5 py-3 font-medium shadow-sm">
              <Filter size={18} />
              Filters
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 font-medium text-white shadow-sm">
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-6">
          <SessionStatCard title="Active Sessions" value="142" note="↗ 8% from yesterday" />

          <SessionStatCard title="Overdue Vehicles" value="12" note="⚠ Requires Attention" />

          <SessionStatCard title="Revenue Today" value="$4,280" note="💵 Real-time tracking" />

          <SessionStatCard title="Average Stay" value="3.2h" note="🕒 Peak 14:00 - 17:00" />
        </div>

        {/* Session Table */}
        <ParkingSessionTable />

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-8">
          <ParkingAiCard />

          <RevenueDistributionCard />
        </div>
      </div>
    </DashboardLayout>
  );
}
