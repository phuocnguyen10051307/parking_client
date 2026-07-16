import type { User } from '@/types/user';

export interface AuthState {
  user: User | null;
  loading: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearState: () => void;
}
