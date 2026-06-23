import { Route } from 'react-router-dom';

import { UserLayout } from '@/app/layouts/user-layout';
import ProfilePage from '@/features/profile/pages/profile-page';

import { ProtectedRoute } from '@/app/router/protected-route';

import { ROUTE_PERMISSIONS } from './rbac-config';

const myProfileRoles = ROUTE_PERMISSIONS.find((route) => route.path === '/my-profile')?.allowedRoles ?? [];

export function UserRouter() {
  return (
    <Route
      element={
        <ProtectedRoute allowedRoles={myProfileRoles}>
          <UserLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/my-profile" element={<ProfilePage />} />
    </Route>
  );
}
