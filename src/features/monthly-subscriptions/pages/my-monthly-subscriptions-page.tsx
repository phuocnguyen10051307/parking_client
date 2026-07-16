import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { getErrorMessage } from '@/lib/error';
import { formatVnd } from '@/lib/pricing';

import { monthlySubscriptionApi } from '../api/monthly-subscription-api';
import type { MonthlySubscription } from '../types/monthly-subscription.type';
import { canCancelMonthlySubscription, getMonthlySubscriptionStatusClassName } from '../utils/monthly-subscription-status';
import { useMyMonthlySubscriptions } from './use-my-monthly-subscriptions';

const formatDate = (value?: string) => {
  if (!value) {
    return '--';
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
};

export default function MyMonthlySubscriptionsPage() {
  const { subscriptions, loading, setSubscriptions } = useMyMonthlySubscriptions();

  const handleCancel = (subscriptionId: string) => {
    toast('Cancel this monthly subscription?', {
      action: {
        label: 'Confirm',
        onClick: async () => {
          try {
            const updated = await monthlySubscriptionApi.cancel(subscriptionId);
            setSubscriptions((current: MonthlySubscription[]) =>
              current.map((item) => (item.id === updated.id ? updated : item))
            );
            toast.success('Monthly subscription cancelled successfully');
          } catch (error) {
            toast.error(getErrorMessage(error, 'Failed to cancel monthly subscription'));
          }
        },
      },
    });
  };

  if (loading) {
    return <p className="p-6 text-slate-500">Loading monthly subscriptions...</p>;
  }

  return (
    <div className="space-y-6 py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">My Monthly Subscriptions</h1>
          <p className="mt-2 text-slate-500">Track your current and past monthly parking passes.</p>
        </div>

        <Link
          to="/user/create-monthly-subscription"
          className="rounded-xl bg-blue-900 px-5 py-3 font-medium text-white"
        >
          Create Monthly Subscription
        </Link>
      </div>

      {subscriptions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">No monthly subscriptions yet</h2>
          <p className="mt-2 text-slate-500">Create your first 1-month pass to continue the demo flow.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <Link key={subscription.id} to={`/user/my-monthly-subscriptions/${subscription.id}`}>
              <div className="rounded-3xl border bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-4">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">
                        {subscription.vehicle?.licensePlate ?? '--'}
                      </p>
                      <p className="mt-1 text-slate-500">
                        {subscription.planName ?? '1 Month'} ? {subscription.vehicle?.vehicleType ?? '--'}
                      </p>
                    </div>

                    <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Start date</p>
                        <p className="mt-1 font-medium text-slate-800">{formatDate(subscription.startDate)}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="text-xs uppercase tracking-wide text-slate-400">End date</p>
                        <p className="mt-1 font-medium text-slate-800">{formatDate(subscription.endDate)}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Price</p>
                        <p className="mt-1 font-medium text-slate-800">
                          {typeof subscription.price === 'number'
                            ? formatVnd(subscription.price)
                            : typeof subscription.totalAmount === 'number'
                              ? formatVnd(subscription.totalAmount)
                              : '--'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex min-w-[180px] flex-col items-start gap-4 lg:items-end">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getMonthlySubscriptionStatusClassName(subscription.status)}`}
                    >
                      {subscription.status}
                    </span>

                    {canCancelMonthlySubscription(subscription.status) && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          handleCancel(subscription.id);
                        }}
                        className="rounded-xl bg-rose-600 px-4 py-2 font-medium text-white transition hover:bg-rose-700"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
