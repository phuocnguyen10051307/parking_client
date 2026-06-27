import { useEffect, useState } from 'react';

import { parkingSessionApi } from '../api/parking-session-api';
import type { ParkingSession } from '../types/session.type';

export function useParkingSessions() {
  // State lưu danh sách sessions
  const [sessions, setSessions] = useState<ParkingSession[]>([]);

  // State loading
  const [loading, setLoading] = useState(true);

  // Fetch dữ liệu từ backend
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await parkingSessionApi.getAll();

        // Backend trả về { success, data }
        setSessions(res.data.data || []);
      } catch {
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return {
    sessions,
    loading,
  };
}
