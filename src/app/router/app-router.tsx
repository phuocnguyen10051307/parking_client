import { Navigate, Route, Routes } from 'react-router-dom';

import { getStoredUser } from '@/features/auth/utils/auth-session';

import { AdminRouter } from './admin-router';
import { AuthRouter } from './auth-router';
import { getDefaultRouteByRole } from './rbac-config';
import { UserRouter } from './user-router';

function AppFallback() {
  const user = getStoredUser();

  return <Navigate to={getDefaultRouteByRole(user?.role)} replace />;
}

export function AppRouter() {
  return (
    <Routes>
      {AuthRouter()}
      {AdminRouter()}
      {UserRouter()}
      <Route path="*" element={<AppFallback />} />
    </Routes>
  );
}
