import { useParkingSessions } from '@/features/parking-sessions/hooks/use-parking-sessions';
import type { ParkingSession } from '@/features/parking-sessions/types/session.type';

export default function MyHistoryPage() {
  // Hook lấy lịch sử gửi xe
  const { sessions, loading } = useParkingSessions();

  // Loading state
  if (loading) {
    return <p>Loading history...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-blue-900">Parking History</h1>

      {/* Danh sách session */}
      {sessions.map((session: ParkingSession) => (
        <div key={session.id} className="rounded-xl border bg-white p-4">
          {/* Biển số xe */}
          <p>Vehicle: {session.vehicle?.licensePlate}</p>

          {/* Slot */}
          <p>Slot: {session.slot?.slotCode}</p>

          {/* Trạng thái */}
          <p>Status: {session.status}</p>
        </div>
      ))}
    </div>
  );
}
