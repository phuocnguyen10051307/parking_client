import { useEffect, useState } from 'react';

import { monthlySubscriptionApi } from '../api/monthly-subscription-api';
import type { MonthlySubscription } from '../types/monthly-subscription.type';

export function useMyMonthlySubscriptions() {
  const [subscriptions, setSubscriptions] = useState<MonthlySubscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const data = await monthlySubscriptionApi.getMySubscriptions();
        setSubscriptions(data);
      } catch {
        setSubscriptions([]);
      } finally {
        setLoading(false);
      }
    };

    void loadSubscriptions();
  }, []);

  return {
    subscriptions,
    loading,
    setSubscriptions,
  };
}
