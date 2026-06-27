import api from '@/lib/api';

export const parkingSessionApi = {
  // Lấy toàn bộ parking session
  getAll: () => api.get('/parking-sessions'),

  // Lấy chi tiết 1 session
  getById: (id: string) => api.get(`/parking-sessions/${id}`),

  // Tạo session khi xe vào
  create: (payload: { vehicleId: string; slotId: string; entryGate?: string }) =>
    api.post('/parking-sessions', payload),

  // Checkout xe
  checkout: (id: string, payload?: { exitGate?: string }) =>
    api.patch(`/parking-sessions/${id}/exit`, payload),
};
