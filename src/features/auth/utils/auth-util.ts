import { normalizeRole } from '@/app/router/rbac-config';
import type { User } from '@/types/user';

import type { AuthUserResponse } from '../types/auth.types';

export function normalizeAuthUser(user: AuthUserResponse): User {
  return {
    id: user.id ?? user._id ?? '',
    displayName: user.displayName ?? user.fullName ?? '',
    email: user.email ?? '',
    phone: user.phone ?? null,
    avatarUrl: user.avatarUrl ?? null,
    role: normalizeRole(user.role) ?? 'USER',
    isActive: user.isActive ?? true,
    createdAt: user.createdAt ?? '',
    updatedAt: user.updatedAt ?? '',
  };
}
