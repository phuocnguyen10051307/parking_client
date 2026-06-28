import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { authApi } from '@/features/auth/api/auth-api';
import { clearAuthSession, getStoredUser } from '@/features/auth/utils/auth-session';

export function UserLayout() {
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    toast('Do you want to logout?', {
      action: {
        label: 'Logout',
        onClick: async () => {
          try {
            await authApi.signout();
          } finally {
            clearAuthSession();
            navigate('/login');
          }
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-8 py-4">
        <Link to="/user" className="text-xl font-bold text-blue-900">
          CityPark
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/user" className="font-medium text-slate-700 transition hover:text-blue-900">
            Dashboard
          </Link>

          <Link
            to="/user/my-profile"
            className="font-medium text-slate-700 transition hover:text-blue-900"
          >
            Profile
          </Link>

          <Link
            to="/user/my-vehicles"
            className="font-medium text-slate-700 transition hover:text-blue-900"
          >
            My Vehicles
          </Link>

          <Link
            to="/user/my-reservations"
            className="font-medium text-slate-700 transition hover:text-blue-900"
          >
            Reservations
          </Link>

          <Link
            to="/user/my-sessions"
            className="font-medium text-slate-700 transition hover:text-blue-900"
          >
            Parking Sessions
          </Link>

          <Link
            to="/user/my-feedbacks"
            className="font-medium text-slate-700 transition hover:text-blue-900"
          >
            Feedbacks
          </Link>

          <div className="flex flex-col text-right">
            {/* Tên ở trên */}
            <span className="font-medium text-slate-800">{user?.displayName || 'Customer'}</span>

            {/* Email ở dưới */}
            <span className="text-xs text-slate-500">{user?.email}</span>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl p-8">
        <Outlet />
      </main>
    </div>
  );
}
