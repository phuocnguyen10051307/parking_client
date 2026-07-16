import api from '@/lib/api';

import type { MonthlySubscription, MonthlySubscriptionStatus } from '../types/monthly-subscription.type';

export const monthlySubscriptionApi = {
  getMySubscriptions: async (params?: { status?: MonthlySubscriptionStatus }) => {
    const res = await api.get<{ data: MonthlySubscription[] }>('/monthly-subscriptions/my', { params });
    return res.data.data;
  },
  getAll: async (params?: { status?: MonthlySubscriptionStatus; vehicleId?: string; ownerId?: string }) => {
    const res = await api.get<{ data: MonthlySubscription[] }>('/monthly-subscriptions', { params });
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await api.get<{ data: MonthlySubscription }>(`/monthly-subscriptions/${id}`);
    return res.data.data;
  },
  create: async (payload: { vehicleId: string; startDate: string; durationMonths?: number }) => {
    const res = await api.post<{ data: MonthlySubscription }>('/monthly-subscriptions', payload);
    return res.data.data;
  },
  cancel: async (id: string) => {
    const res = await api.put<{ data: MonthlySubscription }>(`/monthly-subscriptions/${id}/cancel`);
    return res.data.data;
  },
};
