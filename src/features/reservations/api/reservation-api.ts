import api from '@/lib/api';

export const reservationApi = {
  // Lấy toàn bộ reservation
  getAll: (params?: { status?: string; userId?: string }) => api.get('/reservations', { params }),

  // Lấy chi tiết 1 reservation theo id
  getById: (id: string) => api.get(`/reservations/${id}`),

  // Tạo reservation mới
  create: async (payload: {
    vehicleId: string;
    slotId: string;
    startTime: string;
    endTime: string;
  }) => {
    const res = await api.post('/reservations', payload);
    return res.data.data;
  },

  // Huỷ reservation
  cancel: async (id: string) => {
    const res = await api.put(`/reservations/${id}/cancel`);
    return res.data.data;
  },
};
