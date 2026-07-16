import { useEffect, useState } from 'react';

import { reservationApi } from '../api/reservation-api';
import type { Reservation } from '../types/reservation.type';

export function useReservationDetail(id: string) {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await reservationApi.getById(id);

        setReservation(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  return {
    reservation,
    loading,
    setReservation,
  };
}
