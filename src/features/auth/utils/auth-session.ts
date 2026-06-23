import { useAuthStore } from '@/store/auth-store';

import type { User } from '@/types/user';

const ACCESS_TOKEN_KEY = 'accessToken';
const USER_KEY = 'user';

export function getStoredAccessToken() {
  return useAuthStore.getState().accessToken ?? localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredUser() {
  const storeUser = useAuthStore.getState().user;

  if (storeUser) {
    return storeUser;
  }

  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as User;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function persistAuthSession(accessToken: string, user: User) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  const { setAccessToken, setUser } = useAuthStore.getState();
  setAccessToken(accessToken);
  setUser(user);
}

export function clearAuthSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  useAuthStore.getState().clearState();
}
