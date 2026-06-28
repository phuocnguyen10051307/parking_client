import { useEffect, useState } from 'react';

import { parkingSessionApi } from '../api/parking-session-api';
import type { ParkingSession } from '../types/session.type';

export function useMySessions() {
  const [sessions, setSessions] = useState<ParkingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await parkingSessionApi.getMine();
        setSessions(data);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return {
    sessions,
    loading,
    setSessions,
  };
}
