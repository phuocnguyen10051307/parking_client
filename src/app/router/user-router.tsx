import { Route } from 'react-router-dom';

import { UserLayout } from '@/app/layouts/user-layout';
import { ProtectedRoute } from '@/app/router/protected-route';
import MyHistoryPage from '@/features/history/pages/my-history-page';
import ProfilePage from '@/features/profile/pages/profile-page';
import MyReservationsPage from '@/features/reservations/pages/create-reservations-page';
import UserDashboardPage from '@/features/user-dashboard/pages/user-dashboard-page';
import MyVehiclesPage from '@/features/vehicles/pages/my-vehicles-page';
import MyFeedbackPage from '@/features/feedback/pages/my-feedback-page';
import type { UserRole } from '@/types/user-role';

const userAllowedRoles: UserRole[] = ['USER'];

export function UserRouter() {
  return (
    <Route
      path="/user"
      element={
        <ProtectedRoute allowedRoles={userAllowedRoles}>
          <UserLayout />
        </ProtectedRoute>
      }
    >
      {/** Dashboard là index route của user layout */}
      <Route index element={<UserDashboardPage />} />
      {/** Route relative, kế thừa path từ layout cha */}
      <Route path="my-profile" element={<ProfilePage />} />
      <Route path="my-vehicles" element={<MyVehiclesPage />} />
      <Route path="my-reservations" element={<MyReservationsPage />} />
      <Route path="my-history" element={<MyHistoryPage />} />
      <Route path="my-feedback" element={<MyFeedbackPage />} />
    </Route>
  );
}
