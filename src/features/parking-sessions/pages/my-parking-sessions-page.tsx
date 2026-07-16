import { Link } from 'react-router-dom';

import { useMySessions } from '../hooks/use-my-sessions';

export default function MyParkingSessionsPage() {
  // Hook lấy parking sessions của user hiện tại
  const { sessions, loading } = useMySessions();

  // Badge màu theo status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-700';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-700';
      case 'OVERDUE':
        return 'bg-red-100 text-red-700';
      case 'LOST_TICKET':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  // Loading
  if (loading) {
    return <p>Loading parking sessions...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">My Parking Sessions</h1>

        <p className="mt-2 text-slate-500">
          View all your parking sessions and transaction history.
        </p>
      </div>

      {/* Empty state */}
      {sessions.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <p className="text-slate-500">No parking sessions found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <Link
              key={session.id}
              to={`/user/my-sessions/${session.id}`}
              className="block rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              {/* Header card */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  {/* Biển số xe */}
                  <h3 className="text-lg font-semibold text-slate-800">
                    {session.vehicle?.licensePlate}
                  </h3>

                  {/* Slot */}
                  <p className="mt-1 text-sm text-slate-500">Slot: {session.slot?.slotCode}</p>
                </div>

                {/* Status */}
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                    session.status
                  )}`}
                >
                  {session.status}
                </span>
              </div>

              {/* Timeline */}
              <div className="space-y-2 text-sm text-slate-600">
                <p>
                  <strong>Entry:</strong> {new Date(session.entryTime).toLocaleString()}
                </p>

                <p>
                  <strong>Exit:</strong>{' '}
                  {session.exitTime ? new Date(session.exitTime).toLocaleString() : '-'}
                </p>

                <p>
                  <strong>Total Fee:</strong>{' '}
                  {session.totalFee ? `${session.totalFee} VND` : 'Pending'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
