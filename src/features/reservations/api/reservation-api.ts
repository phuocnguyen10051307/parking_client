import api from '@/lib/api';

export const reservationApi = {
  getMyReservations: async () => {
    const res = await api.get('/reservations/me');
    return res.data;
  },

  createReservation: async (data: {
    vehicleId: string;
    slotId: string;
    startTime: string;
    endTime: string;
  }) => {
    const res = await api.post('/reservations', data);
    return res.data;
  },

  cancelReservation: async (id: string) => {
    const res = await api.put(`/reservations/${id}/cancel`);
    return res.data;
  },
};
