import api from '@/lib/api';

export const feedbackApi = {
  // Lấy danh sách feedback
  getAll: async () => {
    const res = await api.get('/feedbacks');
    return res.data.data;
  },

  // Lấy chi tiết feedback
  getById: async (id: string) => {
    const res = await api.get(`/feedbacks/${id}`);
    return res.data.data;
  },

  // Tạo feedback mới
  create: async (payload: { title: string; content: string }) => {
    const res = await api.post('/feedbacks', payload);
    return res.data.data;
  },

  // Update trạng thái feedback
  update: async (
    id: string,
    payload: {
      status?: string;
    }
  ) => {
    const res = await api.put(`/feedbacks/${id}`, payload);
    return res.data.data;
  },
};
