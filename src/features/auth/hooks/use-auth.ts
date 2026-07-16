import { useEffect, useState } from 'react';

import type { User } from '@/types/user';

import { authApi } from '../api/auth-api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const currentUser = await authApi.me();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  return {
    user,
    loading,
  };
}
