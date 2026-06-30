import type { User } from '@/types/user';

export type AuthUserResponse = {
  _id?: string;
  id?: string;
  fullName?: string | null;
  displayName?: string | null;
  email?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  role?: User['role'] | string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthSession = {
  user: User;
};

export type SigninResponse = {
  success: boolean;
  message: string;
  data: {
    user: AuthUserResponse;
  };
};

export type MeResponse = {
  user: AuthUserResponse;
};
