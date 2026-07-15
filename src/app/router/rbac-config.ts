import {
  Building2,
  CarFront,
  Clock3,
  DollarSign,
  FileBarChart2,
  LayoutDashboard,
  LogOut,
  Map,
  MessageSquare,
  ParkingCircle,
  Settings,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';

import type { UserRole } from '@/types/user-role';

type RoutePermission = {
  allowedRoles: UserRole[];
  path: string;
};

export type SidebarMenuItem = {
  activeMatchers?: string[];
  allowedRoles: UserRole[];
  icon: LucideIcon;
  label: string;
  path: string;
};

const OPERATION_ROLES: UserRole[] = ['ADMIN', 'MANAGER', 'STAFF'];
const MANAGEMENT_ROLES: UserRole[] = ['ADMIN', 'MANAGER'];
const STAFF_ROLES: UserRole[] = ['STAFF'];
const ADMIN_ONLY_ROLES: UserRole[] = ['ADMIN'];

export const ROUTE_PERMISSIONS: RoutePermission[] = [
  { path: '/', allowedRoles: OPERATION_ROLES },
  { path: '/parking-map', allowedRoles: OPERATION_ROLES },
  { path: '/vehicle-entry', allowedRoles: STAFF_ROLES },
  { path: '/vehicle-exit', allowedRoles: STAFF_ROLES },
  { path: '/parking-sessions', allowedRoles: OPERATION_ROLES },
  { path: '/parking-sessions/:id', allowedRoles: OPERATION_ROLES },
  { path: '/buildings', allowedRoles: MANAGEMENT_ROLES },
  { path: '/floors', allowedRoles: MANAGEMENT_ROLES },
  { path: '/zones', allowedRoles: MANAGEMENT_ROLES },
  { path: '/slots', allowedRoles: MANAGEMENT_ROLES },
  { path: '/pricing', allowedRoles: MANAGEMENT_ROLES },
  { path: '/reports', allowedRoles: MANAGEMENT_ROLES },
  { path: '/profile', allowedRoles: OPERATION_ROLES },
  { path: '/reservations', allowedRoles: OPERATION_ROLES },
  { path: '/reservations/:id', allowedRoles: OPERATION_ROLES },
  { path: '/feedbacks', allowedRoles: OPERATION_ROLES },
  { path: '/feedbacks/:id', allowedRoles: OPERATION_ROLES },
  { path: '/users', allowedRoles: ADMIN_ONLY_ROLES },
  { path: '/roles', allowedRoles: ADMIN_ONLY_ROLES },
  { path: '/settings', allowedRoles: ADMIN_ONLY_ROLES },
  { path: '/my-profile', allowedRoles: ['USER'] },
  { path: '/my-vehicles', allowedRoles: ['USER'] },
  { path: '/my-reservations', allowedRoles: ['USER'] },
  { path: '/my-reservations/:id', allowedRoles: ['USER'] },
  { path: '/my-sessions', allowedRoles: ['USER'] },
  { path: '/my-feedbacks', allowedRoles: ['USER'] },
  { path: '/create-feedback', allowedRoles: ['USER'] },
  { path: '/user/pricing', allowedRoles: ['USER'] },
];

export const SIDEBAR_MENUS: SidebarMenuItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard, allowedRoles: OPERATION_ROLES },
  {
    label: 'Parking Map',
    path: '/parking-map',
    icon: Map,
    allowedRoles: OPERATION_ROLES,
    activeMatchers: ['/parking-map'],
  },
  { label: 'Vehicle Entry', path: '/vehicle-entry', icon: CarFront, allowedRoles: STAFF_ROLES },
  { label: 'Vehicle Exit', path: '/vehicle-exit', icon: LogOut, allowedRoles: STAFF_ROLES },
  {
    label: 'Reservations',
    path: '/reservations',
    icon: Clock3,
    allowedRoles: OPERATION_ROLES,
  },
  {
    label: 'Parking Sessions',
    path: '/parking-sessions',
    icon: Clock3,
    allowedRoles: OPERATION_ROLES,
  },
  { label: 'Buildings', path: '/buildings', icon: Building2, allowedRoles: MANAGEMENT_ROLES },
  { label: 'Floors', path: '/floors', icon: Building2, allowedRoles: MANAGEMENT_ROLES },
  { label: 'Zones', path: '/zones', icon: Map, allowedRoles: MANAGEMENT_ROLES },
  {
    label: 'Slots',
    path: '/slots',
    icon: ParkingCircle,
    allowedRoles: MANAGEMENT_ROLES,
    activeMatchers: ['/slots'],
  },
  { label: 'Pricing', path: '/pricing', icon: DollarSign, allowedRoles: MANAGEMENT_ROLES },
  { label: 'Reports', path: '/reports', icon: FileBarChart2, allowedRoles: MANAGEMENT_ROLES },
  {
    label: 'Feedbacks',
    path: '/feedbacks',
    icon: MessageSquare,
    allowedRoles: OPERATION_ROLES,
  },
  { label: 'Users', path: '/users', icon: Users, allowedRoles: ADMIN_ONLY_ROLES },
  { label: 'Roles', path: '/roles', icon: ShieldCheck, allowedRoles: ADMIN_ONLY_ROLES },
  { label: 'Settings', path: '/settings', icon: Settings, allowedRoles: ADMIN_ONLY_ROLES },
];

export function normalizeRole(role?: string | null): UserRole | null {
  if (!role) {
    return null;
  }

  const normalizedRole = role.trim().toUpperCase();

  if (
    normalizedRole === 'ADMIN' ||
    normalizedRole === 'MANAGER' ||
    normalizedRole === 'STAFF' ||
    normalizedRole === 'USER'
  ) {
    return normalizedRole;
  }

  return null;
}

export function canAccessRole(role: string | null | undefined, allowedRoles: UserRole[]) {
  const normalizedRole = normalizeRole(role);
  return normalizedRole ? allowedRoles.includes(normalizedRole) : false;
}

export function getDefaultRouteByRole(role: string | null | undefined) {
  const normalizedRole = normalizeRole(role);

  if (normalizedRole === 'USER') {
    return '/user';
  }

  if (normalizedRole) {
    return '/';
  }

  return '/login';
}

export function getRoleLabel(role: string | null | undefined) {
  const normalizedRole = normalizeRole(role);

  switch (normalizedRole) {
    case 'ADMIN':
      return 'System Administrator';
    case 'MANAGER':
      return 'Operations Manager';
    case 'STAFF':
      return 'Parking Staff';
    case 'USER':
      return 'Customer';
    default:
      return 'User';
  }
}

