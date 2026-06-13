import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { zones } from '../data/zone-data';
import { ZoneActivityCard } from '../components/zone-activity-card';
import { ZoneCard } from '../components/zone-card';
import { ZoneSummaryCard } from '../components/zone-summary-card';
import { ZoneFilterBar } from '../components/zone-filter-bar';

export default function ZonesPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-3xl font-semibold text-blue-900">Zone Management</div>

          <p className="mt-2 text-slate-500">Optimize and monitor parking availability.</p>
        </div>

        <button className="rounded-xl bg-blue-900 px-5 py-3 font-medium text-white">
          Add Zone
        </button>
      </div>

      {/* Summary */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <ZoneSummaryCard title="Total Zones" value="12" />

        <ZoneSummaryCard title="EV Chargers" value="2" />

        <ZoneSummaryCard title="VIP Zones" value="1" />

        <ZoneSummaryCard title="Maintenance" value="1" />
      </div>

      <ZoneFilterBar />

      {/* Zone Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {zones.map((zone) => (
          <ZoneCard key={zone.id} zone={zone} />
        ))}
      </div>

      {/* Analytics */}
      <div className="mt-10">
        <ZoneActivityCard />
      </div>
    </DashboardLayout>
  );
}
