import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { DashboardStatCard } from '../components/dashboard-stat-card';
import { OccupancyCard } from '../components/occupancy-card';
import { RecentActivityCard } from '../components/recent-activity-card';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-blue-950">Manager Overview</h1>

          <p className="mt-2 text-slate-500">
            Real-time facility performance and operations metrics.
          </p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-4 gap-6">
        <DashboardStatCard title="Total Slots" value="1250" growth="+100%" />

        <DashboardStatCard title="Occupied Today" value="942" growth="+8.4%" />

        <DashboardStatCard title="Active Sessions" value="418" growth="Stable" />

        <DashboardStatCard title="Daily Revenue" value="$14,208" growth="+12.2%" />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <OccupancyCard />

        <RecentActivityCard />
      </div>
    </DashboardLayout>
  );
}
