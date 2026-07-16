import type { MonthlySubscriptionStatus } from '../types/monthly-subscription.type';

export const getMonthlySubscriptionStatusClassName = (status: MonthlySubscriptionStatus) => {
  switch (status) {
    case 'PENDING':
      return 'bg-amber-100 text-amber-700';
    case 'ACTIVE':
      return 'bg-emerald-100 text-emerald-700';
    case 'EXPIRED':
      return 'bg-slate-200 text-slate-700';
    case 'CANCELLED':
      return 'bg-rose-100 text-rose-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

export const canCancelMonthlySubscription = (status: MonthlySubscriptionStatus) =>
  status === 'PENDING' || status === 'ACTIVE';
