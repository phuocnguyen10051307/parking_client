import api from '@/lib/api';

type UpdateProfilePayload = {
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
};

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export const profileApi = {
  // Lấy thông tin profile
  getProfile: async () => {
    const res = await api.get('/users/profile');
    return res.data.data.user;
  },

  // Update profile
  updateProfile: async (data: UpdateProfilePayload) => {
    const res = await api.put('/users/profile', data);
    return res.data.data.user;
  },

  // Đổi mật khẩu
  changePassword: async (data: ChangePasswordPayload) => {
    const res = await api.put('/users/change-password', data);
    return res.data;
  },
};
