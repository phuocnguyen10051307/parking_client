import { CalendarDays, CarFront, Clock3, MapPin, UserRound } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { reservationApi } from '../api/reservation-api';
import { useReservationDetail } from '../hooks/use-reservation-detail';

export default function ReservationDetailPage() {
  const { id = '' } = useParams();

  // Hook lấy chi tiết reservation
  const { reservation, loading, setReservation } = useReservationDetail(id);

  // Badge màu theo status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      case 'EXPIRED':
        return 'bg-slate-200 text-slate-600';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  // Cancel reservation
  const handleCancelReservation = () => {
    toast('Are you sure to cancel this reservation?', {
      action: {
        label: 'Confirm',
        onClick: async () => {
          try {
            const updated = await reservationApi.cancel(id);

            // update local state
            setReservation(updated);

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
        <p>Loading reservation detail...</p>
      </DashboardLayout>
    );
  }

  if (!reservation) {
    return (
      <DashboardLayout>
        <p>Reservation not found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-blue-900">Reservation Detail</h1>

            <p className="mt-2 text-slate-500">
              View full reservation information and customer details
            </p>
          </div>

          {/* Badge status */}
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
              reservation.status
            )}`}
          >
            {reservation.status}
          </span>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-6">
          <SummaryCard
            icon={<Clock3 size={18} />}
            title="Created At"
            value={new Date(reservation.createdAt).toLocaleString()}
          />

          <SummaryCard
            icon={<CalendarDays size={18} />}
            title="Start Time"
            value={new Date(reservation.startTime).toLocaleString()}
          />

          <SummaryCard
            icon={<CalendarDays size={18} />}
            title="End Time"
            value={new Date(reservation.endTime).toLocaleString()}
          />
        </div>

        {/* Main info */}
        <div className="grid grid-cols-2 gap-8">
          <InfoCard title="Customer Information" icon={<UserRound size={18} />}>
            <InfoRow label="Full Name" value={reservation.user?.fullName} />
            <InfoRow label="Email" value={reservation.user?.email} />
            <InfoRow label="Phone" value={reservation.user?.phone} />
          </InfoCard>

          <InfoCard title="Vehicle Information" icon={<CarFront size={18} />}>
            <InfoRow label="License Plate" value={reservation.vehicle?.licensePlate} />
            <InfoRow label="Vehicle Type" value={reservation.vehicle?.vehicleType} />
            <InfoRow label="Brand" value={reservation.vehicle?.brand} />
            <InfoRow label="Color" value={reservation.vehicle?.color} />
          </InfoCard>

          <InfoCard title="Slot Information" icon={<MapPin size={18} />}>
            <InfoRow label="Slot Code" value={reservation.slot?.slotCode} />
            <InfoRow label="Zone" value={reservation.slot?.zone?.name} />
            <InfoRow label="Slot Status" value={reservation.slot?.status} />
          </InfoCard>

          <InfoCard title="Reservation Metadata" icon={<CalendarDays size={18} />}>
            <InfoRow label="Reservation ID" value={reservation.id} />
            <InfoRow label="Status" value={reservation.status} />
          </InfoCard>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          {reservation.status !== 'CANCELLED' && (
            <button
              onClick={handleCancelReservation}
              className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white"
            >
              Cancel Reservation
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

/* Summary card */
function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-sm">{title}</span>
      </div>

      <p className="font-semibold text-slate-800">{value}</p>
    </div>
  );
}

/* Card thông tin */
function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        {icon}
        <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
}

/* Row hiển thị label + value */
function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value || '-'}</span>
    </div>
  );
}
