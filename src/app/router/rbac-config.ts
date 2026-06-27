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
  MessageSquare,
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

const ALL_STAFF_ROLES: UserRole[] = ['ADMIN', 'MANAGER', 'STAFF'];
const MANAGEMENT_ROLES: UserRole[] = ['ADMIN', 'MANAGER'];

export const ROUTE_PERMISSIONS: RoutePermission[] = [
  { path: '/', allowedRoles: ALL_STAFF_ROLES },
  { path: '/vehicle-entry', allowedRoles: ALL_STAFF_ROLES },
  { path: '/vehicle-exit', allowedRoles: ALL_STAFF_ROLES },
  { path: '/parking-sessions', allowedRoles: ALL_STAFF_ROLES },
  { path: '/parking-sessions/:id', allowedRoles: ALL_STAFF_ROLES },
  { path: '/floors', allowedRoles: MANAGEMENT_ROLES },
  { path: '/zones', allowedRoles: MANAGEMENT_ROLES },
  { path: '/slots', allowedRoles: ALL_STAFF_ROLES },
  { path: '/slots/:floorId', allowedRoles: ALL_STAFF_ROLES },
  { path: '/pricing', allowedRoles: MANAGEMENT_ROLES },
  { path: '/reports', allowedRoles: MANAGEMENT_ROLES },
  { path: '/profile', allowedRoles: ALL_STAFF_ROLES },
  { path: '/reservations', allowedRoles: ALL_STAFF_ROLES },
  { path: '/reservations/:id', allowedRoles: ALL_STAFF_ROLES },
  { path: '/feedbacks', allowedRoles: ALL_STAFF_ROLES },
  { path: '/feedbacks/:id', allowedRoles: ALL_STAFF_ROLES },
  { path: '/my-profile', allowedRoles: ['USER'] },
  { path: '/my-vehicles', allowedRoles: ['USER'] },
  { path: '/my-reservations', allowedRoles: ['USER'] },
  { path: '/my-history', allowedRoles: ['USER'] },
];

export const SIDEBAR_MENUS: SidebarMenuItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard, allowedRoles: ALL_STAFF_ROLES },
  { label: 'Vehicle Entry', path: '/vehicle-entry', icon: CarFront, allowedRoles: ALL_STAFF_ROLES },
  { label: 'Vehicle Exit', path: '/vehicle-exit', icon: LogOut, allowedRoles: ALL_STAFF_ROLES },
  {
    label: 'Reservations',
    path: '/reservations',
    icon: Clock3,
    allowedRoles: ALL_STAFF_ROLES,
  },
  {
    label: 'Parking Sessions',
    path: '/parking-sessions',
    icon: Clock3,
    allowedRoles: ALL_STAFF_ROLES,
  },
  { label: 'Floors', path: '/floors', icon: Building2, allowedRoles: MANAGEMENT_ROLES },
  { label: 'Zones', path: '/zones', icon: Map, allowedRoles: MANAGEMENT_ROLES },
  {
    label: 'Slots',
    path: '/slots/basement-1',
    icon: ParkingCircle,
    allowedRoles: ALL_STAFF_ROLES,
    activeMatchers: ['/slots'],
  },
  { label: 'Pricing', path: '/pricing', icon: DollarSign, allowedRoles: MANAGEMENT_ROLES },
  { label: 'Reports', path: '/reports', icon: FileBarChart2, allowedRoles: MANAGEMENT_ROLES },
  {
    label: 'Feedbacks',
    path: '/feedbacks',
    icon: MessageSquare,
    allowedRoles: ALL_STAFF_ROLES,
  },
];

export function normalizeRole(role?: string | null): UserRole | null {
  if (!role) {
    return null;
  }

  const normalizedRole = role.toUpperCase();

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
