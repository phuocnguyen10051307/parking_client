import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { reservationApi } from '../api/reservation-api';
import { useReservations } from '../hooks/use-reservations';
import type { Reservation } from '../types/reservation.type';

export default function MyReservationsPage() {
  // Hook lấy reservation của user hiện tại
  const { reservations, loading, setReservations } = useReservations();

  // Màu badge theo status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  // Cancel reservation
  const handleCancel = (id: string) => {
    toast('Are you sure to cancel this reservation?', {
      action: {
        label: 'Confirm',
        onClick: async () => {
          try {
            const updated = await reservationApi.cancel(id);

            // Update state local ngay lập tức
            setReservations((prev: Reservation[]) =>
              prev.map((item: Reservation) => (item.id === updated.id ? updated : item))
            );

            toast.success('Reservation cancelled successfully');
          } catch {
            toast.error('Failed to cancel reservation');
          }
        },
      },
    });
  };

  // Loading state
  if (loading) {
    return <p>Loading reservations...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">My Reservations</h1>

          <p className="mt-2 text-slate-500">Manage your parking reservations.</p>
        </div>

        <Link
          to="/user/create-reservation"
          className="rounded-xl bg-blue-900 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-blue-800"
        >
          Create Reservation
        </Link>
      </div>

      {/* Reservation list */}
      <div className="space-y-4">
        {reservations.map((reservation: Reservation) => (
          <Link key={reservation.id} to={`/user/my-reservations/${reservation.id}`}>
            <div
              className={`rounded-2xl border p-5 shadow-sm transition hover:shadow-md mb-2 ${
                reservation.status === 'CANCELLED'
                  ? 'border-red-200 bg-red-50 opacity-80'
                  : 'bg-white'
              }`}
            >
              {/* Slot */}
              <p className="font-semibold text-slate-800">Slot: {reservation.slot?.slotCode}</p>

              {/* Vehicle */}
              <p className="mt-2 text-slate-600">Vehicle: {reservation.vehicle?.licensePlate}</p>

              {/* Status */}
              <div className="mt-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                    reservation.status
                  )}`}
                >
                  {reservation.status}
                </span>
              </div>

              {/* Action */}
              {reservation.status !== 'CANCELLED' && (
                <button
                  onClick={(e) => {
                    e.preventDefault(); // chặn click Link khi bấm cancel
                    handleCancel(reservation.id);
                  }}
                  className="mt-5 rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                >
                  Cancel Reservation
                </button>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
