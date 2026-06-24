import type { UserRole } from '@/types/user-role';

export interface User {
  id: string;
  displayName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
