import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { useReservations } from '../hooks/use-reservations';
import { Link } from 'react-router-dom';

export default function ReservationManagementPage() {
  const { reservations, loading } = useReservations();

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
              </tr>
            </thead>

            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="border-t">
                  <td className="p-4">{reservation.user?.fullName}</td>

                  <td>{reservation.vehicle?.licensePlate}</td>

                  <td>{reservation.slot?.slotCode}</td>

                  <td>{new Date(reservation.startTime).toLocaleString()}</td>

                  <td>{new Date(reservation.endTime).toLocaleString()}</td>

                  <td>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                      {reservation.status}
                    </span>
                  </td>

                  <td>
                    <Link
                      to={`/reservations/${reservation.id}`}
                      className="rounded-lg bg-blue-900 px-4 py-2 text-white"
                    >
                      View Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t p-4 text-sm text-slate-500">
            Showing {reservations.length} reservations
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
