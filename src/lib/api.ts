import axios from 'axios';

import { clearAuthSession, getStoredAccessToken } from '@/features/auth/utils/auth-session';
import { useAuthStore } from '@/store/auth-store';

const api = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:3000/v1' : '/v1',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getStoredAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
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
        const res = await api.post('/auth/refresh-token');
        const newAccessToken = res.data.accessToken;

        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          useAuthStore.getState().setAccessToken(newAccessToken);
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
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
