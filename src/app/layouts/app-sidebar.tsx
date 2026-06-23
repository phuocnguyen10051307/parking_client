import { LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { authApi } from '@/features/auth/api/auth-api';
import { clearAuthSession, getStoredUser } from '@/features/auth/utils/auth-session';

import { SIDEBAR_MENUS, canAccessRole, getRoleLabel } from '@/app/router/rbac-config';

const getUserInitials = (fullName?: string) => {
  if (!fullName) {
    return 'U';
  }

  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
};

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStoredUser();

  const visibleMenus = SIDEBAR_MENUS.filter((menu) => canAccessRole(user?.role, menu.allowedRoles));

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
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="text-lg font-semibold tracking-tight text-blue-900">CityPark Pro</div>
        <p className="mt-1 text-sm text-slate-500">Operations Console</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        {visibleMenus.map((menu) => {
          const Icon = menu.icon;
          const isActive = menu.activeMatchers?.some((matcher) => location.pathname.startsWith(matcher))
            ? true
            : location.pathname === menu.path;

          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActive ? 'bg-blue-50 text-blue-900' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon size={18} />
              {menu.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-200 p-4">
        <Link to="/profile" className="block rounded-xl p-2 transition hover:bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-900">
              {getUserInitials(user?.fullName)}
            </div>

            <div>
              <p className="font-medium">{user?.fullName || 'Parking User'}</p>
              <p className="text-xs text-slate-500">{getRoleLabel(user?.role)}</p>
            </div>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
