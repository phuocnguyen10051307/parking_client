import api from '@/lib/api';

// APIs của slot
export const slotsApi = {
  // Lấy tất cả slots
  getSlots: async (params?: { vehicleType?: string; status?: string }) => {
    const res = await api.get('/slots', {
      params,
    });

    return res.data.data;
  },

  // Lấy slot available
  getAvailableSlots: async (vehicleType?: string) => {
    const res = await api.get('/slots/available', {
      params: {
        vehicleType,
      },
    });

    return res.data.data;
  },

  // Lấy detail slot
  getSlotById: async (id: string) => {
    const res = await api.get(`/slots/${id}`);
    return res.data.data;
  },
};
