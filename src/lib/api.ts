import axios from 'axios';

import { clearAuthSession } from '@/features/auth/utils/auth-session';

const api = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:3000/v1' : '/v1',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute =
      originalRequest.url?.includes('/auth/signin') ||
      originalRequest.url?.includes('/auth/signup') ||
      originalRequest.url?.includes('/auth/refresh-token');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        await api.post('/auth/refresh-token');
        return api(originalRequest);
      } catch {
        clearAuthSession();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
