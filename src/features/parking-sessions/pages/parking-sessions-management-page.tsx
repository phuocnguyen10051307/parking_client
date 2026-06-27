import { Filter, Download } from 'lucide-react';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { SessionStatCard } from '../components/parking-stats';
import { ParkingSessionTable } from '../components/parking-session-table';
import { ParkingAiCard } from '../components/parking-ai-card';
import { RevenueDistributionCard } from '../components/revenue-distribution-card';

export default function ParkingSessionsManagementPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-3xl font-semibold text-blue-900">Session Ledger</div>

            <p className="mt-2 text-lg text-slate-500">
              Theo dõi toàn bộ parking sessions theo thời gian thực
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            {/* Bộ lọc */}
            <button className="flex items-center gap-2 rounded-xl border bg-white px-5 py-3 font-medium shadow-sm">
              <Filter size={18} />
              Filters
            </button>

            {/* Export CSV */}
            <button className="flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 font-medium text-white shadow-sm">
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-4 gap-6">
          <SessionStatCard title="Active Sessions" value="142" note="↗ 8% from yesterday" />

          <SessionStatCard title="Overdue Vehicles" value="12" note="⚠ Requires Attention" />

          <SessionStatCard title="Revenue Today" value="$4,280" note="💵 Real-time tracking" />

          <SessionStatCard title="Average Stay" value="3.2h" note="🕒 Peak 14:00 - 17:00" />
        </div>

        {/* Bảng session */}
        <ParkingSessionTable />

        {/* Phân tích AI + biểu đồ doanh thu */}
        <div className="grid grid-cols-2 gap-8">
          <ParkingAiCard />

          <RevenueDistributionCard />
        </div>
      </div>
    </DashboardLayout>
  );
}
