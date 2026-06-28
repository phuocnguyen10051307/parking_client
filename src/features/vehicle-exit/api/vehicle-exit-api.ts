import api from '@/lib/api';

export const vehicleExitApi = {
  // Lấy danh sách session đang active
  getActiveSessions: async () => {
    const res = await api.get('/parking-sessions', {
      params: {
        status: 'ACTIVE',
      },
    });

    return res.data.data;
  },

  // Checkout session
  checkout: async (id: string, exitGate: string) => {
    const res = await api.post('/parking-sessions/check-out', {
      id,
      exitGate,
    });

    return res.data.data;
  },
};
