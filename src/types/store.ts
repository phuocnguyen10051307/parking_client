import type { User } from '@/types/user';

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;

  setAccessToken: (accessToken: string | null) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearState: () => void;
}
