import { CalendarDays, CarFront, CreditCard, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { getErrorMessage } from '@/lib/error';
import { formatVnd } from '@/lib/pricing';

import { monthlySubscriptionApi } from '../api/monthly-subscription-api';
import type { MonthlySubscription } from '../types/monthly-subscription.type';
import { canCancelMonthlySubscription, getMonthlySubscriptionStatusClassName } from '../utils/monthly-subscription-status';

function SummaryCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
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
      <span className="text-right font-medium text-slate-800">{value || '-'}</span>
    </div>
  );
}

export default function MonthlySubscriptionDetailPage() {
  const { id = '' } = useParams();
  const [subscription, setSubscription] = useState<MonthlySubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const data = await monthlySubscriptionApi.getById(id);
        setSubscription(data);
      } catch (error) {
        toast.error(getErrorMessage(error, 'Failed to load monthly subscription detail'));
      } finally {
        setLoading(false);
      }
    };

    void loadSubscription();
  }, [id]);

  const handleCancel = async () => {
    if (!subscription) {
      return;
    }

    setCancelling(true);

    try {
      const updated = await monthlySubscriptionApi.cancel(subscription.id);
      setSubscription(updated);
      toast.success('Monthly subscription cancelled successfully');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to cancel monthly subscription'));
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-slate-500">Loading monthly subscription detail...</p>;
  }

  if (!subscription) {
    return <p className="p-6 text-slate-500">Monthly subscription not found.</p>;
  }

  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Monthly Subscription Detail</h1>
          <p className="mt-2 text-slate-500">View the current information for your monthly parking pass.</p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${getMonthlySubscriptionStatusClassName(subscription.status)}`}
          >
            {subscription.status}
          </span>

          {canCancelMonthlySubscription(subscription.status) && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="rounded-xl bg-rose-600 px-4 py-2 font-medium text-white disabled:opacity-60"
            >
              {cancelling ? 'Cancelling...' : 'Cancel'}
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <SummaryCard
          icon={<CalendarDays size={18} />}
          title="Start date"
          value={new Date(subscription.startDate).toLocaleDateString()}
        />
        <SummaryCard
          icon={<CalendarDays size={18} />}
          title="End date"
          value={new Date(subscription.endDate).toLocaleDateString()}
        />
        <SummaryCard
          icon={<CreditCard size={18} />}
          title="Price"
          value={
            typeof subscription.price === 'number'
              ? formatVnd(subscription.price)
              : formatVnd(subscription.totalAmount ?? 0)
          }
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <InfoCard title="Vehicle Information" icon={<CarFront size={18} />}>
          <InfoRow label="License Plate" value={subscription.vehicle?.licensePlate} />
          <InfoRow label="Vehicle Type" value={subscription.vehicle?.vehicleType} />
          <InfoRow label="Brand" value={subscription.vehicle?.brand} />
          <InfoRow label="Color" value={subscription.vehicle?.color} />
        </InfoCard>

        <InfoCard title="Subscription Information" icon={<UserRound size={18} />}>
          <InfoRow label="Plan" value={subscription.planName ?? '1 Month'} />
          <InfoRow label="Duration" value={`${subscription.durationMonths} month`} />
          <InfoRow label="Created At" value={new Date(subscription.createdAt).toLocaleString()} />
          <InfoRow label="Subscription ID" value={subscription.id} />
        </InfoCard>
      </div>
    </div>
  );
}
