// Auth api
import api from '@/lib/api';

export type SigninRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
};

export const authApi = {
  signin: async (data: SigninRequest) => {
    const res = await api.post('/auth/signin', data);
    return res.data;
  },

  signup: async (data: SignupRequest) => {
    const res = await api.post('/auth/signup', data);
    return res.data;
  },

  me: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },

  signout: async () => {
    const res = await api.post('/auth/signout');
    return res.data;
  },

  refreshToken: async () => {
    const res = await api.post(
      '/auth/refresh-token',
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
};
