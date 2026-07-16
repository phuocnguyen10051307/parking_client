import { Route } from 'react-router-dom';

import { UserLayout } from '@/app/layouts/user-layout';
import { ProtectedRoute } from '@/app/router/protected-route';
import ProfilePage from '@/features/profile/pages/profile-page';
import MyReservationsPage from '@/features/reservations/pages/my-reservations-page';
import MyReservationDetailPage from '@/features/reservations/pages/my-reservation-detail-page';
import CreateReservationPage from '@/features/reservations/pages/create-reservations-page';
import UserDashboardPage from '@/features/user-dashboard/pages/user-dashboard-page';
import MyVehiclesPage from '@/features/vehicles/pages/my-vehicles-page';
import MyFeedbackPage from '@/features/feedback/pages/my-feedback-page';
import CreateFeedbackPage from '@/features/feedback/pages/create-feedback-page';
import ParkingMapPage from '@/features/parking-map/pages/parking-map-page';
import MyParkingSessionsPage from '@/features/parking-sessions/pages/my-parking-sessions-page';
import MyParkingSessionDetailPage from '@/features/parking-sessions/pages/my-parking-session-detail-page';
import PublicPricingPage from '@/features/pricing/pages/public-pricing-page';
import UserHomePage from '@/features/home/pages/home-page';
import CreateMonthlySubscriptionPage from '@/features/monthly-subscriptions/pages/create-monthly-subscription-page';
import MyMonthlySubscriptionsPage from '@/features/monthly-subscriptions/pages/my-monthly-subscriptions-page';
import MonthlySubscriptionDetailPage from '@/features/monthly-subscriptions/pages/monthly-subscription-detail-page';
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
      {/** Dashboard la index route cua user layout */}
      <Route index element={<UserHomePage />} />
      {/** Route relative, ke thua path tu layout cha */}
      <Route path="dashboard" element={<UserDashboardPage />} />
      <Route path="my-profile" element={<ProfilePage />} />
      <Route path="my-vehicles" element={<MyVehiclesPage />} />
      <Route path="my-reservations" element={<MyReservationsPage />} />
      <Route path="my-reservations/:id" element={<MyReservationDetailPage />} />
      <Route path="my-monthly-subscriptions" element={<MyMonthlySubscriptionsPage />} />
      <Route path="my-monthly-subscriptions/:id" element={<MonthlySubscriptionDetailPage />} />
      <Route path="parking-map" element={<ParkingMapPage />} />
      <Route path="create-reservation" element={<CreateReservationPage />} />
      <Route path="create-monthly-subscription" element={<CreateMonthlySubscriptionPage />} />
      <Route path="my-feedbacks" element={<MyFeedbackPage />} />
      <Route path="create-feedback" element={<CreateFeedbackPage />} />
      <Route path="my-sessions" element={<MyParkingSessionsPage />} />
      <Route path="my-sessions/:id" element={<MyParkingSessionDetailPage />} />
      <Route path="pricing" element={<PublicPricingPage />} />
    </Route>
  );
}
