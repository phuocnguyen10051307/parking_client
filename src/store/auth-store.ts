// Zustand
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AuthState } from '@/types/store';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      loading: false,

      setAccessToken: (accessToken) => set({ accessToken }),
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      clearState: () => set({ accessToken: null, user: null, loading: false }),
    }),
    {
      name: 'parking-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    }
  )
);
