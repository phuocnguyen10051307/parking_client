import { useEffect, useState } from 'react';

import { parkingSessionApi } from '../api/parking-session-api';
import type { ParkingSession } from '../types/session.type';

export function useParkingSessionDetail(id: string) {
  const [session, setSession] = useState<ParkingSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await parkingSessionApi.getById(id);

        setSession(data);
      } catch {
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSession();
    }
  }, [id]);

  return {
    session,
    loading,
  };
}
