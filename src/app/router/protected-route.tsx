import { Navigate } from 'react-router-dom';

import { getStoredUser } from '@/features/auth/utils/auth-session';
import type { UserRole } from '@/types/user-role';

import { canAccessRole, getDefaultRouteByRole } from './rbac-config';

type Props = {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
};

export function ProtectedRoute({ allowedRoles, children }: Props) {
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !canAccessRole(user.role, allowedRoles)) {
    return <Navigate to={getDefaultRouteByRole(user.role)} replace />;
  }

  return children;
}
