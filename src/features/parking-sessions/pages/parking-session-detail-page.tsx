import { BadgeDollarSign, CalendarDays, CarFront, Clock3, MapPin, UserRound } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { useParkingSessionDetail } from '../hooks/use-parking-session-detail';

export default function ParkingSessionDetailPage() {
  const { id = '' } = useParams();
  const { session, loading } = useParkingSessionDetail(id);

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

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading session detail...</p>
      </DashboardLayout>
    );
  }

  if (!session) {
    return (
      <DashboardLayout>
        <p>Session not found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-blue-900">Parking Session Detail</h1>

            <p className="mt-2 text-slate-500">
              View full parking session information and transaction logs
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
              session.status
            )}`}
          >
            {session.status}
          </span>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-6">
          <SummaryCard icon={<Clock3 size={18} />} title="Status" value={session.status} />

          <SummaryCard
            icon={<BadgeDollarSign size={18} />}
            title="Total Fee"
            value={session.totalFee ? `${session.totalFee} VND` : 'Pending'}
          />

          <SummaryCard
            icon={<MapPin size={18} />}
            title="Entry Gate"
            value={session.entryGate || '-'}
          />

          <SummaryCard
            icon={<MapPin size={18} />}
            title="Exit Gate"
            value={session.exitGate || '-'}
          />
        </div>

        {/* Detail cards */}
        <div className="grid grid-cols-2 gap-6">
          <InfoCard title="Customer Information" icon={<UserRound size={18} />}>
            <InfoRow label="Full Name" value={session.user?.fullName} />
            <InfoRow label="Email" value={session.user?.email} />
            <InfoRow label="Phone" value={session.user?.phone} />
          </InfoCard>

          <InfoCard title="Vehicle Information" icon={<CarFront size={18} />}>
            <InfoRow label="License Plate" value={session.vehicle?.licensePlate} />
            <InfoRow label="Vehicle Type" value={session.vehicle?.vehicleType} />
            <InfoRow label="Brand" value={session.vehicle?.brand} />
            <InfoRow label="Color" value={session.vehicle?.color} />
          </InfoCard>

          <InfoCard title="Parking Position" icon={<MapPin size={18} />}>
            <InfoRow label="Slot Code" value={session.slot?.slotCode} />
            <InfoRow label="Zone" value={session.slot?.zone?.name} />
            <InfoRow
              label="Floor"
              value={
                typeof session.slot?.zone?.floor?.floorNumber === 'number'
                  ? String(session.slot.zone.floor.floorNumber)
                  : undefined
              }
            />
            <InfoRow label="Building" value={session.slot?.zone?.floor?.building?.name} />
            <InfoRow label="Slot Status" value={session.slot?.status} />
          </InfoCard>

          <InfoCard title="Timeline" icon={<CalendarDays size={18} />}>
            <InfoRow label="Entry Time" value={new Date(session.entryTime).toLocaleString()} />
            <InfoRow
              label="Exit Time"
              value={
                session.exitTime ? new Date(session.exitTime).toLocaleString() : 'Still parking'
              }
            />
            <InfoRow label="Created At" value={new Date(session.createdAt).toLocaleString()} />
          </InfoCard>
        </div>

        {(session.entryImageUrl || session.exitImageUrl) && (
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-blue-900">Vehicle Photos</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {session.entryImageUrl && (
                <div>
                  <div className="mb-2 text-sm font-medium text-slate-600">Check-in photo</div>
                  <img
                    src={session.entryImageUrl}
                    alt="Vehicle check-in"
                    className="aspect-video w-full rounded-xl object-cover"
                  />
                </div>
              )}
              {session.exitImageUrl && (
                <div>
                  <div className="mb-2 text-sm font-medium text-slate-600">Check-out photo</div>
                  <img
                    src={session.exitImageUrl}
                    alt="Vehicle check-out"
                    className="aspect-video w-full rounded-xl object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {/* Note */}
        {session.note && (
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-blue-900">Session Note</h2>

            <div className="rounded-2xl bg-slate-50 p-4 text-slate-700">{session.note}</div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function SummaryCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-sm">{title}</span>
      </div>

      <p className="text-xl font-semibold text-blue-900">{value}</p>
    </div>
  );
}

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
      <div className="mb-5 flex items-center gap-2 border-b pb-4">
        {icon}
        <h2 className="text-lg font-semibold text-blue-900">{title}</h2>
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value || '-'}</span>
    </div>
  );
}
