import { useAuthStore } from '@/store/auth-store';

import type { User } from '@/types/user';

// Lấy user từ Zustand persist
export function getStoredUser() {
  return useAuthStore.getState().user;
}

// Lưu user vào Zustand. Token được giữ trong HTTP-only cookie.
export function persistAuthSession(user: User) {
  useAuthStore.getState().setUser(user);
}

// Xóa session phía client. Cookie sẽ được backend clear khi gọi signout.
export function clearAuthSession() {
  useAuthStore.getState().clearState();
}
