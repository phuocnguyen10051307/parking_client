import { Route } from 'react-router-dom';

import { UserLayout } from '@/app/layouts/user-layout';
import ProfilePage from '@/features/profile/pages/profile-page';

import { ProtectedRoute } from '@/app/router/protected-route';

export function UserRouter() {
  return (
    <Route
      element={
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/my-profile" element={<ProfilePage />} />
    </Route>
  );
}
