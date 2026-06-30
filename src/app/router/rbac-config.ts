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

const OPERATION_ROLES: UserRole[] = ['ADMIN', 'MANAGER', 'STAFF'];
const MANAGEMENT_ROLES: UserRole[] = ['ADMIN', 'MANAGER'];
const STAFF_ROLES: UserRole[] = ['STAFF'];

export const ROUTE_PERMISSIONS: RoutePermission[] = [
  { path: '/', allowedRoles: OPERATION_ROLES },
  { path: '/vehicle-entry', allowedRoles: STAFF_ROLES },
  { path: '/vehicle-exit', allowedRoles: STAFF_ROLES },
  { path: '/parking-sessions', allowedRoles: OPERATION_ROLES },
  { path: '/parking-sessions/:id', allowedRoles: OPERATION_ROLES },
  { path: '/floors', allowedRoles: MANAGEMENT_ROLES },
  { path: '/zones', allowedRoles: MANAGEMENT_ROLES },
  { path: '/slots', allowedRoles: OPERATION_ROLES },
  { path: '/slots/:floorId', allowedRoles: OPERATION_ROLES },
  { path: '/pricing', allowedRoles: MANAGEMENT_ROLES },
  { path: '/reports', allowedRoles: MANAGEMENT_ROLES },
  { path: '/profile', allowedRoles: OPERATION_ROLES },
  { path: '/reservations', allowedRoles: OPERATION_ROLES },
  { path: '/reservations/:id', allowedRoles: OPERATION_ROLES },
  { path: '/feedbacks', allowedRoles: OPERATION_ROLES },
  { path: '/feedbacks/:id', allowedRoles: OPERATION_ROLES },
  { path: '/my-profile', allowedRoles: ['USER'] },
  { path: '/my-vehicles', allowedRoles: ['USER'] },
  { path: '/my-reservations', allowedRoles: ['USER'] },
  { path: '/my-reservations/:id', allowedRoles: ['USER'] },
  { path: '/my-sessions', allowedRoles: ['USER'] },
  { path: '/my-feedbacks', allowedRoles: ['USER'] },
  { path: '/create-feedback', allowedRoles: ['USER'] },
];

export const SIDEBAR_MENUS: SidebarMenuItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard, allowedRoles: OPERATION_ROLES },
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
  { label: 'Floors', path: '/floors', icon: Building2, allowedRoles: MANAGEMENT_ROLES },
  { label: 'Zones', path: '/zones', icon: Map, allowedRoles: MANAGEMENT_ROLES },
  {
    label: 'Slots',
    path: '/slots/basement-1',
    icon: ParkingCircle,
    allowedRoles: OPERATION_ROLES,
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
