import { useEffect, useState } from 'react';

import { authApi } from '../api/auth-api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user hiện tại
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await authApi.me();

        setUser(res.user);
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
