import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { monthlySubscriptionApi } from '../api/monthly-subscription-api';
import type { MonthlySubscription } from '../types/monthly-subscription.type';
import { getMonthlySubscriptionStatusClassName } from '../utils/monthly-subscription-status';

const formatDate = (value?: string) => {
  if (!value) {
    return '--';
  }

  return new Date(value).toLocaleDateString();
};

export default function MonthlySubscriptionsManagementPage() {
  const [subscriptions, setSubscriptions] = useState<MonthlySubscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const data = await monthlySubscriptionApi.getAll();
        setSubscriptions(data);
      } catch {
        setSubscriptions([]);
      } finally {
        setLoading(false);
      }
    };

    void loadSubscriptions();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-slate-500">Loading monthly subscriptions...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Monthly Subscriptions Management</h1>
          <p className="mt-2 text-slate-500">Review all monthly parking registrations for the demo.</p>
        </div>

        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          <table className="w-full min-w-[860px]">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-5 py-4 text-left font-medium">License Plate</th>
                <th className="px-5 py-4 text-left font-medium">Owner</th>
                <th className="px-5 py-4 text-left font-medium">Start Date</th>
                <th className="px-5 py-4 text-left font-medium">End Date</th>
                <th className="px-5 py-4 text-left font-medium">Status</th>
                <th className="px-5 py-4 text-left font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-500">
                    No monthly subscriptions found.
                  </td>
                </tr>
              ) : (
                subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-medium text-slate-900">
                      {subscription.vehicle?.licensePlate ?? '--'}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{subscription.user?.fullName ?? '--'}</td>
                    <td className="px-5 py-4 text-slate-600">{formatDate(subscription.startDate)}</td>
                    <td className="px-5 py-4 text-slate-600">{formatDate(subscription.endDate)}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${getMonthlySubscriptionStatusClassName(subscription.status)}`}
                      >
                        {subscription.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        to={`/monthly-subscriptions/${subscription.id}`}
                        className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
