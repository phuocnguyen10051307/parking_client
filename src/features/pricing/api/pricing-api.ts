import api from '@/lib/api';

import type { PricingPolicy, PricingPolicyPayload } from '../types/pricing';

export const pricingApi = {
  getPolicies: async () => {
    const res = await api.get<{ data: { policies: PricingPolicy[] } }>('/pricing-policies');
    return res.data.data.policies;
  },
  getActivePolicy: async (vehicleType = 'CAR') => {
    const res = await api.get<{ data: { policy: PricingPolicy } }>('/pricing-policies/active', {
      params: { vehicleType },
    });
    return res.data.data.policy;
  },
  createPolicy: async (payload: PricingPolicyPayload) => {
    const res = await api.post<{ data: { policy: PricingPolicy } }>('/pricing-policies', payload);
    return res.data.data.policy;
  },
  updatePolicy: async (id: string, payload: PricingPolicyPayload) => {
    const res = await api.put<{ data: { policy: PricingPolicy } }>(`/pricing-policies/${id}`, payload);
    return res.data.data.policy;
  },
};
