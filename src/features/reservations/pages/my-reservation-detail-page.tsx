import { CalendarDays, CarFront, Clock3, MapPin } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { formatDateTimeVietnam } from '@/lib/datetime';

import { useReservationDetail } from '../hooks/use-reservation-detail';

export default function MyReservationDetailPage() {
  const { id = '' } = useParams();

  // Hook lấy detail reservation
  const { reservation, loading } = useReservationDetail(id);

  // Badge màu status
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

  if (loading) {
    return <p>Loading reservation detail...</p>;
  }

  if (!reservation) {
    return <p>Reservation not found.</p>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Reservation Detail</h1>

          <p className="mt-2 text-slate-500">View your reservation information</p>
        </div>

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
          value={formatDateTimeVietnam(reservation.createdAt)}
        />

        <SummaryCard
          icon={<CalendarDays size={18} />}
          title="Start Time"
          value={formatDateTimeVietnam(reservation.startTime)}
        />

        <SummaryCard
          icon={<CalendarDays size={18} />}
          title="End Time"
          value={formatDateTimeVietnam(reservation.endTime)}
        />
      </div>

      {/* Detail */}
      <div className="grid grid-cols-2 gap-8">
        {/* Vehicle */}
        <InfoCard title="Vehicle Information" icon={<CarFront size={18} />}>
          <InfoRow label="License Plate" value={reservation.vehicle?.licensePlate} />
          <InfoRow label="Vehicle Type" value={reservation.vehicle?.vehicleType} />
          <InfoRow label="Brand" value={reservation.vehicle?.brand} />
          <InfoRow label="Color" value={reservation.vehicle?.color} />
        </InfoCard>

        {/* Slot */}
        <InfoCard title="Slot Information" icon={<MapPin size={18} />}>
          <InfoRow label="Slot Code" value={reservation.slot?.slotCode} />
          <InfoRow label="Zone" value={reservation.slot?.zone?.name} />
          <InfoRow label="Slot Status" value={reservation.slot?.status} />
        </InfoCard>
      </div>
    </div>
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

/* Row */
function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value || '-'}</span>
    </div>
  );
}
