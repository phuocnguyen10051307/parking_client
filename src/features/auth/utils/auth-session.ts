import { useAuthStore } from '@/store/auth-store';

import type { User } from '@/types/user';

// Lấy access token từ Zustand persist
export function getStoredAccessToken() {
  return useAuthStore.getState().accessToken;
}

// Lấy user từ Zustand persist
export function getStoredUser() {
  return useAuthStore.getState().user;
}

// Lưu session vào Zustand
// Zustand persist sẽ tự sync xuống localStorage (key: parking-auth)
export function persistAuthSession(accessToken: string, user: User) {
  const { setAccessToken, setUser } = useAuthStore.getState();

  setAccessToken(accessToken);
  setUser(user);
}

// Xóa session
export function clearAuthSession() {
  useAuthStore.getState().clearState();
}
