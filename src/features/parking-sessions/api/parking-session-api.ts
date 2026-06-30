import api from '@/lib/api';

export const parkingSessionApi = {
  getAll: (params?: { status?: string }) => api.get('/parking-sessions', { params }),

  // Lấy session của user hiện tại
  getMine: async () => {
    const res = await api.get('/parking-sessions');
    return res.data.data;
  },

  getMyById: async (id: string) => {
    const res = await api.get(`/parking-sessions/${id}`);
    return res.data.data;
  },

  // Lấy chi tiết session
  getById: async (id: string) => {
    const res = await api.get(`/parking-sessions/${id}`);
    return res.data.data;
  },
};
