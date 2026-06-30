import { useCallback, useEffect, useState } from 'react';

import { parkingSessionApi } from '../api/parking-session-api';
import type { ParkingSession, SessionStatus } from '../types/session.type';

type UseParkingSessionsOptions = {
  status?: SessionStatus;
};

export function useParkingSessions(options: UseParkingSessionsOptions = {}) {
  const [sessions, setSessions] = useState<ParkingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await parkingSessionApi.getAll({ status: options.status });

      setSessions(res.data.data || []);
    } catch {
      setSessions([]);
      setError('Could not load parking sessions. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [options.status]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return {
    sessions,
    loading,
    error,
    refetch: fetchSessions,
  };
}