import api from '@/lib/api';

export const parkingSessionApi = {
  // Lấy toàn bộ parking session
  getAll: () => api.get('/parking-sessions'),

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
