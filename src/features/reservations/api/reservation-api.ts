import api from '@/lib/api';

export const reservationApi = {
  // Lấy toàn bộ reservation
  getAll: (params?: { status?: string; userId?: string }) => api.get('/reservations', { params }),

  // Lấy chi tiết 1 reservation theo id
  getById: (id: string) => api.get(`/reservations/${id}`),

  // Tạo reservation mới
  create: (payload: { vehicleId: string; slotId: string; startTime: string; endTime: string }) =>
    api.post('/reservations', payload),

  // Huỷ reservation
  cancel: (id: string) => api.put(`/reservations/${id}/cancel`),
};
