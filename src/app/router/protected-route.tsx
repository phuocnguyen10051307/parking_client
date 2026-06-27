import { Navigate } from 'react-router-dom';

import { getStoredAccessToken, getStoredUser } from '@/features/auth/utils/auth-session';
import type { UserRole } from '@/types/user-role';

import { canAccessRole, getDefaultRouteByRole } from './rbac-config';

type Props = {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
};

export function ProtectedRoute({ allowedRoles, children }: Props) {
  const token = getStoredAccessToken();
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !canAccessRole(user.role, allowedRoles)) {
    return <Navigate to={getDefaultRouteByRole(user.role)} replace />;
  }

  return children;
}
