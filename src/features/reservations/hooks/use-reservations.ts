import { useEffect, useState } from 'react';

import { reservationApi } from '../api/reservation-api';
import type { Reservation } from '../types/reservation.type';

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await reservationApi.getAll();

        // Backend trả về { success, data }
        setReservations(res.data.data || []);
      } catch {
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return {
    reservations,
    loading,
  };
}
