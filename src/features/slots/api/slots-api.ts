import api from '@/lib/api';

export type SlotPayload = {
  zoneId: string;
  slotCode: string;
  status: string;
  isActive: boolean;
};

export const slotsApi = {
  getSlots: async (params?: { vehicleType?: string; status?: string }) => {
    const res = await api.get('/slots', {
      params,
    });

    return res.data.data;
  },

  getAvailableSlots: async (vehicleType?: string) => {
    const res = await api.get('/slots/available', {
      params: {
        vehicleType,
      },
    });

    return res.data.data;
  },

  getSlotById: async (id: string) => {
    const res = await api.get(`/slots/${id}`);
    return res.data.data;
  },

  getAdminSlots: async (params?: {
    vehicleType?: string;
    status?: string;
    zoneId?: string;
    isActive?: boolean;
  }) => {
    const res = await api.get('/admin/slots', {
      params,
    });

    return res.data.data;
  },

  getAdminSlotById: async (id: string) => {
    const res = await api.get(`/admin/slots/${id}`);
    return res.data.data;
  },

  createSlot: async (payload: SlotPayload) => {
    const res = await api.post('/admin/slots', payload);
    return res.data.data;
  },

  updateSlot: async (id: string, payload: SlotPayload) => {
    const res = await api.put(`/admin/slots/${id}`, payload);
    return res.data.data;
  },

  deleteSlot: async (id: string) => {
    await api.delete(`/admin/slots/${id}`);
  },
};
