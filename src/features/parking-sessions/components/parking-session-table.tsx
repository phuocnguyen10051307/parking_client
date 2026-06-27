import { Car, CarFront, Bike, MoreVertical } from 'lucide-react';
import { useParkingSessions } from '../hooks/use-parking-sessions';
import type { ParkingSession } from '../types/session.type';
import { Link } from 'react-router-dom';

export function ParkingSessionTable() {
  // Lấy data thật từ API
  const { sessions, loading } = useParkingSessions();

  // Lấy current time 1 lần để tránh lỗi purity
  const now = new Date().getTime();

  // Format duration
  const getDuration = (entryTime: string, exitTime?: string | null) => {
    const start = new Date(entryTime).getTime();
    const end = exitTime ? new Date(exitTime).getTime() : now;

    const diff = Math.floor((end - start) / 1000 / 60);

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours}h ${minutes}m`;
  };

  // Render màu status
  const renderStatus = (status: string) => {
    const colors = {
      ACTIVE: 'bg-green-100 text-green-700',
      COMPLETED: 'bg-slate-200 text-slate-600',
      LOST_TICKET: 'bg-red-100 text-red-700',
      OVERDUE: 'bg-orange-100 text-orange-700',
    };

    return (
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          colors[status as keyof typeof colors] || 'bg-slate-100 text-slate-700'
        }`}
      >
        {status}
      </span>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <p>Loading parking sessions...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-6 text-left">Plate ID</th>
            <th className="text-left">Vehicle Type</th>
            <th className="text-left">Slot</th>
            <th className="text-left">Entry Time</th>
            <th className="text-left">Duration</th>
            <th className="text-left">Current Fee</th>
            <th className="text-left">Status</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sessions.map((session: ParkingSession) => (
            <tr key={session.id} className="border-t">
              {/* Plate */}
              <td className="p-6 font-semibold">{session.vehicle?.licensePlate}</td>

              {/* Vehicle type */}
              <td>
                <div className="flex items-center gap-2">
                  {session.vehicle?.vehicleType === 'CAR' && <Car />}
                  {session.vehicle?.vehicleType === 'MOTORBIKE' && <Bike />}
                  {!session.vehicle?.vehicleType && <CarFront />}

                  {session.vehicle?.vehicleType}
                </div>
              </td>

              {/* Slot */}
              <td>{session.slot?.slotCode}</td>

              {/* Entry time */}
              <td>{new Date(session.entryTime).toLocaleString()}</td>

              {/* Duration */}
              <td>{getDuration(session.entryTime, session.exitTime)}</td>

              {/* Fee */}
              <td className="font-semibold text-blue-900">${session.totalFee || 0}</td>

              {/* Status */}
              <td>{renderStatus(session.status)}</td>

              {/* Action */}
              <td>
                <div className="flex items-center gap-4">
                  <Link
                    to={`/parking-sessions/${session.id}`}
                    className="rounded-lg bg-blue-900 px-4 py-2 text-white"
                  >
                    View Details
                  </Link>

                  <MoreVertical size={18} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex items-center justify-between border-t p-6">
        <p className="text-sm text-slate-500">Showing {sessions.length} sessions</p>
      </div>
    </div>
  );
}
