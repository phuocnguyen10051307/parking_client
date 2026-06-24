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

  console.log('[ProtectedRoute]', {
    token: token?.slice(0, 20) + '...',
    userRole: user?.role,
    allowedRoles,
    hasToken: !!token,
    hasUser: !!user,
  });

  if (!token || !user) {
    console.log('[ProtectedRoute] No token or user, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !canAccessRole(user.role, allowedRoles)) {
    const redirectTo = getDefaultRouteByRole(user.role);
    console.log('[ProtectedRoute] Role mismatch', { userRole: user.role, allowedRoles, redirectTo });
    return <Navigate to={redirectTo} replace />;
  }

  console.log('[ProtectedRoute] Access granted, rendering children');
  return children;
}
