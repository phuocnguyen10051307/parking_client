import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/features/auth/api/auth-api';
import { toast } from 'sonner';

export function UserLayout() {
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    toast('Do you want to logout?', {
      action: {
        label: 'Logout',
        onClick: async () => {
          //gọi api logout
          await authApi.signout();

          //xóa local storage
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');

          navigate('/login');
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar cho driver */}
      <header className="flex items-center justify-between border-b bg-white px-8 py-4">
        <Link to="/" className="text-xl font-bold text-blue-900">
          CityPark
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/my-profile">Profile</Link>
          <Link to="/my-vehicles">My Vehicles</Link>
          <Link to="/my-reservations">Reservations</Link>
          <Link to="/my-history">History</Link>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Nội dung từng page */}
      <main className="mx-auto max-w-6xl p-8">
        <Outlet />
      </main>
    </div>
  );
}
