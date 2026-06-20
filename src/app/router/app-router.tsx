import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRouter } from './auth-router';
import { AdminRouter } from './admin-router';
import { UserRouter } from './user-router';

export function AppRouter() {
  return (
    <Routes>
      {/* Auth routes */}
      {AuthRouter()}

      {/* Admin routes */}
      {AdminRouter()}

      {/* User routes */}
      {UserRouter()}

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
