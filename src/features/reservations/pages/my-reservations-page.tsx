import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { formatDateTimeVietnam } from '@/lib/datetime';

import { reservationApi } from '../api/reservation-api';
import { useReservations } from '../hooks/use-reservations';
import type { Reservation } from '../types/reservation.type';

const formatDateTime = (value?: string) => {
  if (!value) return '--';

  return formatDateTimeVietnam(value);
};

export default function MyReservationsPage() {
  // Hook lay reservation cua user hien tai
  const { reservations, loading, setReservations } = useReservations();

  // Mau badge theo status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      case 'EXPIRED':
        return 'bg-slate-200 text-slate-700';
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

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  return (
    <div className="space-y-6">
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

      <div className="space-y-4">
        {reservations.map((reservation: Reservation) => (
          <Link key={reservation.id} to={`/user/my-reservations/${reservation.id}`}>
            <div
              className={`mb-2 rounded-2xl border p-5 shadow-sm transition hover:shadow-md ${
                reservation.status === 'CANCELLED' ? 'border-red-200 bg-red-50 opacity-80' : 'bg-white'
              }`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-slate-800">Slot: {reservation.slot?.slotCode || '--'}</p>
                    <p className="mt-1 text-slate-600">Vehicle: {reservation.vehicle?.licensePlate || '--'}</p>
                  </div>

                  <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Arrival time</p>
                      <p className="mt-1 font-medium text-slate-800">{formatDateTime(reservation.startTime)}</p>
                    </div>

                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Hold until</p>
                      <p className="mt-1 font-medium text-slate-800">{formatDateTime(reservation.endTime)}</p>
                    </div>

                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Created at</p>
                      <p className="mt-1 font-medium text-slate-800">{formatDateTime(reservation.createdAt)}</p>
                    </div>

                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Reservation ID</p>
                      <p className="mt-1 break-all font-medium text-slate-800">{reservation.id}</p>
                    </div>
                  </div>

                  <p className="text-sm text-amber-700">
                    Please arrive within 1 hour of your selected time to avoid losing this reservation.
                  </p>
                </div>

                <div className="flex min-w-[180px] flex-col items-start gap-4 lg:items-end">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                      reservation.status
                    )}`}
                  >
                    {reservation.status}
                  </span>

                  {reservation.status !== 'CANCELLED' && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleCancel(reservation.id);
                      }}
                      className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                    >
                      Cancel Reservation
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
