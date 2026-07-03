import { CalendarDays, CarFront, Clock3, DollarSign, MapPin, Wallet } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { formatVnd } from '@/lib/pricing';

import { useMySessionDetail } from '../hooks/use-my-session-detail';

export default function MyParkingSessionDetailPage() {
  const { id = '' } = useParams();
  const { session, loading } = useMySessionDetail(id);

  if (loading) {
    return <p>Loading parking session detail...</p>;
  }

  if (!session) {
    return <p>Parking session not found.</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Parking Session Detail</h1>

        <p className="mt-2 text-slate-500">View your parking session information and payment details.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <SummaryCard icon={<Clock3 size={18} />} title="Status" value={session.status} />

        <SummaryCard
          icon={<DollarSign size={18} />}
          title="Total Fee"
          value={session.totalFee != null ? formatVnd(Number(session.totalFee)) : 'Pending'}
        />

        <SummaryCard icon={<MapPin size={18} />} title="Entry Gate" value={session.entryGate || '-'} />
        <SummaryCard icon={<MapPin size={18} />} title="Exit Gate" value={session.exitGate || '-'} />
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <InfoCard title="Vehicle Information" icon={<CarFront size={18} />}>
          <InfoRow label="License Plate" value={session.vehicle?.licensePlate} />
          <InfoRow label="Vehicle Type" value={session.vehicle?.vehicleType} />
          <InfoRow label="Brand" value={session.vehicle?.brand} />
          <InfoRow label="Color" value={session.vehicle?.color} />
        </InfoCard>

        <InfoCard title="Parking Slot" icon={<MapPin size={18} />}>
          <InfoRow label="Slot Code" value={session.slot?.slotCode} />
          <InfoRow label="Slot Status" value={session.slot?.status} />
          <InfoRow label="Vehicle Type" value={session.slot?.vehicleType} />
        </InfoCard>

        <InfoCard title="Timeline" icon={<CalendarDays size={18} />}>
          <InfoRow label="Entry Time" value={new Date(session.entryTime).toLocaleString()} />
          <InfoRow label="Exit Time" value={session.exitTime ? new Date(session.exitTime).toLocaleString() : '-'} />
          <InfoRow label="Created At" value={new Date(session.createdAt).toLocaleString()} />
        </InfoCard>

        <InfoCard title="Payment" icon={<Wallet size={18} />}>
          <InfoRow label="Payment Status" value={session.payment?.status || 'Pending'} />
          <InfoRow label="Method" value={session.payment?.method || '-'} />
          <InfoRow label="Amount" value={session.payment ? formatVnd(session.payment.amount) : '-'} />
          <InfoRow
            label="Paid At"
            value={session.payment?.paidAt ? new Date(session.payment.paidAt).toLocaleString() : '-'}
          />
        </InfoCard>
      </div>

      {session.note && (
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-blue-900">Session Note</h2>

          <p className="text-slate-700">{session.note}</p>
        </div>
      )}
    </div>
  );
}

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

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value || '-'}</span>
    </div>
  );
}
