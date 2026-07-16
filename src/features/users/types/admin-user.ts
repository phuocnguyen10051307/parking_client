export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF' | 'USER';

export type AdminUser = {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  stats: {
    vehicles: number;
    reservations: number;
    parkingSessions: number;
  };
};
