import { useEffect, useState } from 'react';

import { parkingSessionApi } from '../api/parking-session-api';
import type { ParkingSession } from '../types/session.type';

export function useMySessionDetail(id: string) {
  const [session, setSession] = useState<ParkingSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await parkingSessionApi.getMyById(id);
        setSession(data);
      } catch {
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  return {
    session,
    loading,
    setSession,
  };
}
