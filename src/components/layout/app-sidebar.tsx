import {
  Building2,
  CarFront,
  Clock3,
  DollarSign,
  FileBarChart2,
  LayoutDashboard,
  LogOut,
  Map,
  ParkingCircle,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menus = [
  {
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Vehicle Entry',
    path: '/vehicle-entry',
    icon: CarFront,
  },
  {
    label: 'Vehicle Exit',
    path: '/vehicle-exit',
    icon: LogOut,
  },
  {
    label: 'Parking Sessions',
    path: '/parking-sessions',
    icon: Clock3,
  },
  {
    label: 'Floors',
    path: '/floors',
    icon: Building2,
  },
  {
    label: 'Zones',
    path: '/zones',
    icon: Map,
  },
  {
    label: 'Slots',
    path: '/slots',
    icon: ParkingCircle,
  },
  {
    label: 'Pricing',
    path: '/pricing',
    icon: DollarSign,
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: FileBarChart2,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <p className="text-base font-semibold text-blue-900">CityPark Pro</p>

        <p className="mt-1 text-xs text-slate-500">Admin Terminal</p>
      </div>

      <nav className="flex-1 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          const isActive = location.pathname === menu.path;

          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? 'bg-blue-50 font-medium text-blue-900'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon size={18} />

              {menu.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-900">
            A
          </div>

          <div>
            <p className="font-medium">Admin User</p>

            <p className="text-xs text-slate-500">System Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
