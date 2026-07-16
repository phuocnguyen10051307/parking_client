import { RefreshCw } from 'lucide-react';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { SessionStatCard } from '../components/parking-stats';
import { ParkingSessionTable } from '../components/parking-session-table';
import { useParkingSessions } from '../hooks/use-parking-sessions';

const getOldestActiveDuration = (entryTimes: string[]) => {
  if (entryTimes.length === 0) {
    return '0h 0m';
  }

  const oldestEntry = Math.min(...entryTimes.map((entryTime) => new Date(entryTime).getTime()));
  const diff = Math.max(0, Math.floor((Date.now() - oldestEntry) / 1000 / 60));
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return `${hours}h ${minutes}m`;
};

export default function ParkingSessionsManagementPage() {
  const { sessions, loading, error, refetch } = useParkingSessions({ status: 'ACTIVE' });

  const occupiedSlots = new Set(sessions.map((session) => session.slot?.id).filter(Boolean)).size;
  const activeZones = new Set(sessions.map((session) => session.slot?.zone?.name).filter(Boolean)).size;
  const activeFloors = new Set(
    sessions.map((session) => session.slot?.zone?.floor?.floorNumber).filter((floor) => typeof floor === 'number')
  ).size;
  const oldestDuration = getOldestActiveDuration(sessions.map((session) => session.entryTime));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-3xl font-semibold text-blue-900">Checked-in Vehicles</div>
            <p className="mt-2 text-base text-slate-500">
              Staff can monitor every vehicle currently inside the parking lot and its assigned position.
            </p>
          </div>

          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center justify-center gap-2 rounded-lg border bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <SessionStatCard title="Vehicles Inside" value={String(sessions.length)} note="Active check-ins" />
          <SessionStatCard title="Occupied Slots" value={String(occupiedSlots)} note="Assigned positions" />
          <SessionStatCard title="Active Zones" value={String(activeZones)} note="Zones with vehicles" />
          <SessionStatCard title="Longest Stay" value={oldestDuration} note={`${activeFloors} active floor${activeFloors === 1 ? '' : 's'}`} />
        </div>

        <ParkingSessionTable sessions={sessions} loading={loading} error={error} onRefresh={refetch} />
      </div>
    </DashboardLayout>
  );
}