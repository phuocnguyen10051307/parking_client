import api from '@/lib/api';

import type { AdminUser } from '../types/admin-user';

export type AdminUsersQuery = {
  isActive?: '' | 'true' | 'false';
  role?: '' | AdminUser['role'];
  search?: string;
};

export type UpdateAdminUserPayload = {
  fullName?: string;
  phone?: string | null;
  isActive?: boolean;
};

export const adminUsersApi = {
  getUsers: async (query: AdminUsersQuery = {}) => {
    const res = await api.get<{ data: { users: AdminUser[] } }>('/admin/users', {
      params: query,
    });
    return res.data.data.users;
  },
  updateUser: async (id: string, payload: UpdateAdminUserPayload) => {
    const res = await api.put<{ data: { user: AdminUser } }>(`/admin/users/${id}`, payload);
    return res.data.data.user;
  },
  updateUserRole: async (id: string, role: AdminUser['role']) => {
    const res = await api.put<{ data: { user: AdminUser } }>(`/admin/users/${id}/role`, { role });
    return res.data.data.user;
  },
};
