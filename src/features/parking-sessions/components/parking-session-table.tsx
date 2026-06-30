import { Bike, Car, CarFront, Eye, MapPin, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { ParkingSession } from '../types/session.type';

type ParkingSessionTableProps = {
  sessions: ParkingSession[];
  loading: boolean;
  error?: string | null;
  onRefresh?: () => void;
};

const formatLocation = (session: ParkingSession) => {
  const slotCode = session.slot?.slotCode || '-';
  const zoneName = session.slot?.zone?.name;
  const floorNumber = session.slot?.zone?.floor?.floorNumber;
  const buildingName = session.slot?.zone?.floor?.building?.name;

  const parts = [
    slotCode,
    zoneName ? `Zone ${zoneName}` : null,
    typeof floorNumber === 'number' ? `Floor ${floorNumber}` : null,
    buildingName,
  ].filter(Boolean);

  return parts.join(' - ');
};

const getDuration = (entryTime: string) => {
  const start = new Date(entryTime).getTime();
  const now = Date.now();
  const diff = Math.max(0, Math.floor((now - start) / 1000 / 60));
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return `${hours}h ${minutes}m`;
};

const getVehicleIcon = (vehicleType?: string) => {
  if (vehicleType === 'CAR') {
    return <Car size={18} />;
  }

  if (vehicleType === 'MOTORBIKE' || vehicleType === 'BICYCLE' || vehicleType === 'ELECTRIC_BIKE') {
    return <Bike size={18} />;
  }

  return <CarFront size={18} />;
};

export function ParkingSessionTable({ sessions, loading, error, onRefresh }: ParkingSessionTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Loading checked-in vehicles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-white p-6 shadow-sm">
        <p className="font-medium text-red-700">{error}</p>
        <button
          type="button"
          onClick={onRefresh}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <MapPin size={22} />
        </div>
        <p className="mt-4 font-semibold text-slate-800">No checked-in vehicles</p>
        <p className="mt-1 text-sm text-slate-500">Active sessions will appear here after staff check in a vehicle.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px]">
          <thead className="bg-slate-50 text-sm text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Plate</th>
              <th className="px-6 py-4 text-left font-semibold">Vehicle</th>
              <th className="px-6 py-4 text-left font-semibold">Current Position</th>
              <th className="px-6 py-4 text-left font-semibold">Entry Gate</th>
              <th className="px-6 py-4 text-left font-semibold">Entry Time</th>
              <th className="px-6 py-4 text-left font-semibold">Parked For</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-right font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {sessions.map((session) => (
              <tr key={session.id} className="text-sm text-slate-700">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-950">{session.vehicle?.licensePlate || '-'}</div>
                  <div className="mt-1 text-xs text-slate-500">{session.vehicle?.color || session.vehicle?.brand || 'Unregistered details'}</div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getVehicleIcon(session.vehicle?.vehicleType)}
                    <span>{session.vehicle?.vehicleType || '-'}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 text-blue-900" size={17} />
                    <div>
                      <div className="font-medium text-slate-900">{session.slot?.slotCode || '-'}</div>
                      <div className="mt-1 text-xs text-slate-500">{formatLocation(session)}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">{session.entryGate || '-'}</td>
                <td className="px-6 py-4">{new Date(session.entryTime).toLocaleString()}</td>
                <td className="px-6 py-4 font-medium">{getDuration(session.entryTime)}</td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Checked in
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/parking-sessions/${session.id}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
                  >
                    <Eye size={16} />
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t px-6 py-4">
        <p className="text-sm text-slate-500">Showing {sessions.length} checked-in vehicles</p>
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>
    </div>
  );
}