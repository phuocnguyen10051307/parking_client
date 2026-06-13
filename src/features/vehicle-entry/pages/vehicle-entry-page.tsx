import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { VehicleEntryForm } from '../components/vehicle-entry-form';
import { RecommendedSlotCard } from '../components/recommended-slot-card';
import { ZoneVisualization } from '../components/zone-visualization';
import { VehicleEntryActions } from '../components/vehicle-entry-actions';

export default function VehicleEntryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <div className="text-3xl font-semibold text-blue-900">New Vehicle Entry</div>

          <p className="mt-2 text-base text-slate-500">
            Register vehicle and assign parking slot for an incoming session.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <VehicleEntryForm />

          <div className="space-y-8">
            <RecommendedSlotCard />

            <ZoneVisualization />
          </div>
        </div>

        <VehicleEntryActions />
      </div>
    </DashboardLayout>
  );
}
