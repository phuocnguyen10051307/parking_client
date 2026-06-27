import { useReservations } from '../hooks/use-reservations';
import type { Reservation } from '../types/reservation.type';

export default function MyReservationsPage() {
  // Hook lấy reservation của user hiện tại
  const { reservations, loading } = useReservations();

  // Loading state
  if (loading) {
    return <p>Loading reservations...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">My Reservations</h1>

        <p className="mt-2 text-slate-500">Danh sách reservation của bạn.</p>
      </div>

      {/* Danh sách reservation */}
      <div className="space-y-4">
        {reservations.map((reservation: Reservation) => (
          <div key={reservation.id} className="rounded-2xl border bg-white p-5 shadow-sm">
            {/* Slot đã đặt */}
            <p className="font-semibold">Slot: {reservation.slot?.slotCode}</p>

            {/* Xe đã dùng để reserve */}
            <p>Vehicle: {reservation.vehicle?.licensePlate}</p>

            {/* Trạng thái */}
            <p>Status: {reservation.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
