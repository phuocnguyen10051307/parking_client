import axios from 'axios';

// Tạo axios instance dùng chung
const api = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:3000/v1' : '/v1',
  withCredentials: true,
});

// Tự động gắn access token vào request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Tự động xử lý access token hết hạn
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check xem request hiện tại có phải auth route không
    const isAuthRoute =
      originalRequest.url?.includes('/auth/signin') ||
      originalRequest.url?.includes('/auth/signup') ||
      originalRequest.url?.includes('/auth/refresh-token');

    // Nếu 401 + chưa retry + không phải auth route
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        // Gọi refresh token
        const res = await api.post('/auth/refresh-token');

        const newAccessToken = res.data.accessToken;

        // Lưu access token mới
        localStorage.setItem('accessToken', newAccessToken);

        // Gắn token mới vào request cũ
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry request cũ
        return api(originalRequest);
      } catch {
        // Nếu refresh fail thì logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');

        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
