import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { formatDateTimeVietnam } from '@/lib/datetime';

import { reservationApi } from '../api/reservation-api';
import { useReservations } from '../hooks/use-reservations';
import type { Reservation } from '../types/reservation.type';

export default function ReservationManagementPage() {
  // Hook lấy danh sách reservation
  const { reservations, loading, setReservations } = useReservations();

  // Quick cancel
  const handleQuickCancel = (reservationId: string) => {
    toast('Cancel this reservation?', {
      action: {
        label: 'Confirm',
        onClick: async () => {
          try {
            const updated = await reservationApi.cancel(reservationId);

            // update local state
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
    return (
      <DashboardLayout>
        <p>Loading reservations...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Reservation Management</h1>

          <p className="mt-2 text-slate-500">Manage all customer reservations</p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="text-left">Vehicle</th>
                <th className="text-left">Slot</th>
                <th className="text-left">Start Time</th>
                <th className="text-left">End Time</th>
                <th className="text-left">Status</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="border-t">
                  <td className="p-4">{reservation.user?.fullName}</td>
                  <td>{reservation.vehicle?.licensePlate}</td>
                  <td>{reservation.slot?.slotCode}</td>
                  <td>{formatDateTimeVietnam(reservation.startTime)}</td>
                  <td>{formatDateTimeVietnam(reservation.endTime)}</td>

                  <td>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                      {reservation.status}
                    </span>
                  </td>

                  <td className="space-x-2">
                    {/* View detail */}
                    <Link
                      to={`/reservations/${reservation.id}`}
                      className="rounded-lg bg-blue-900 px-4 py-2 text-white"
                    >
                      View
                    </Link>

                    {/* Cancel */}
                    {reservation.status !== 'CANCELLED' && (
                      <button
                        onClick={() => handleQuickCancel(reservation.id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="border-t p-4 text-sm text-slate-500">
            Showing {reservations.length} reservations
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
