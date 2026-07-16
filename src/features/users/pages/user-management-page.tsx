import { RefreshCcw, Search, ShieldBan, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { adminUsersApi } from '@/features/users/api/admin-users-api';
import { getErrorMessage } from '@/lib/error';

import type { AdminUser } from '../types/admin-user';

const ROLE_OPTIONS: AdminUser['role'][] = ['ADMIN', 'MANAGER', 'STAFF', 'USER'];

export default function UserManagementPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'' | AdminUser['role']>('');
  const [statusFilter, setStatusFilter] = useState<'' | 'true' | 'false'>('');
  const [savingUserId, setSavingUserId] = useState<string | null>(null);

  const loadUsers = async (
    nextSearch = search,
    nextRole = roleFilter,
    nextStatus = statusFilter
  ) => {
    try {
      setLoading(true);
      const data = await adminUsersApi.getUsers({
        search: nextSearch.trim() || undefined,
        role: nextRole || undefined,
        isActive: nextStatus || undefined,
      });
      setUsers(data);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to load users'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          setLoading(true);
          const data = await adminUsersApi.getUsers();
          setUsers(data);
        } catch (error) {
          toast.error(getErrorMessage(error, 'Failed to load users'));
        } finally {
          setLoading(false);
        }
      })();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleRoleChange = async (userId: string, role: AdminUser['role']) => {
    try {
      setSavingUserId(userId);
      const updated = await adminUsersApi.updateUserRole(userId, role);
      setUsers((current) => current.map((user) => (user.id === userId ? updated : user)));
      toast.success('User role updated');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to update role'));
    } finally {
      setSavingUserId(null);
    }
  };

  const handleStatusToggle = async (user: AdminUser) => {
    try {
      setSavingUserId(user.id);
      const updated = await adminUsersApi.updateUser(user.id, { isActive: !user.isActive });
      setUsers((current) => current.map((item) => (item.id === user.id ? updated : item)));
      toast.success(user.isActive ? 'User deactivated' : 'User activated');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to update user status'));
    } finally {
      setSavingUserId(null);
    }
  };

  const activeCount = users.filter((user) => user.isActive).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Admin User Management
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Manage platform users</h1>
              <p className="mt-2 text-sm text-slate-500">
                Search accounts, update roles, and control account activation from one place.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard label="Total users" value={String(users.length)} />
              <StatCard label="Active users" value={String(activeCount)} />
              <StatCard label="Inactive users" value={String(users.length - activeCount)} />
            </div>
          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_200px_180px_auto]">
            <label className="relative block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, email or phone"
                className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-4 outline-none transition focus:border-blue-400"
              />
            </label>

            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value as '' | AdminUser['role'])}
              className="h-11 rounded-xl border border-slate-200 px-4 outline-none transition focus:border-blue-400"
            >
              <option value="">All roles</option>
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as '' | 'true' | 'false')}
              className="h-11 rounded-xl border border-slate-200 px-4 outline-none transition focus:border-blue-400"
            >
              <option value="">All statuses</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <div className="flex gap-3">
              <Button onClick={() => void loadUsers()} type="button">
                <Search />
                Apply
              </Button>
              <Button
                onClick={() => {
                  setSearch('');
                  setRoleFilter('');
                  setStatusFilter('');
                  void loadUsers('', '', '');
                }}
                type="button"
                variant="outline"
              >
                <RefreshCcw />
                Reset
              </Button>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {loading ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              No users match the current filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="pb-3 pr-4 font-medium">User</th>
                    <th className="pb-3 pr-4 font-medium">Contact</th>
                    <th className="pb-3 pr-4 font-medium">Role</th>
                    <th className="pb-3 pr-4 font-medium">Activity</th>
                    <th className="pb-3 pr-4 font-medium">Created</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const isSaving = savingUserId === user.id;

                    return (
                      <tr key={user.id} className="border-b border-slate-100 align-top">
                        <td className="py-4 pr-4">
                          <div className="font-medium text-slate-900">{user.fullName}</div>
                          <div className="mt-1 text-xs text-slate-500">{user.id}</div>
                        </td>
                        <td className="py-4 pr-4 text-slate-600">
                          <div>{user.email}</div>
                          <div className="mt-1 text-xs text-slate-500">
                            {user.phone || 'No phone'}
                          </div>
                        </td>
                        <td className="py-4 pr-4">
                          <select
                            value={user.role}
                            onChange={(event) =>
                              void handleRoleChange(
                                user.id,
                                event.target.value as AdminUser['role']
                              )
                            }
                            disabled={isSaving}
                            className="h-9 rounded-lg border border-slate-200 px-3 outline-none transition focus:border-blue-400 disabled:opacity-60"
                          >
                            {ROLE_OPTIONS.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-4 pr-4 text-slate-600">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                              Vehicles {user.stats.vehicles}
                            </span>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                              Reservations {user.stats.reservations}
                            </span>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                              Sessions {user.stats.parkingSessions}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 pr-4 text-slate-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                user.isActive
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                            <Button
                              onClick={() => void handleStatusToggle(user)}
                              disabled={isSaving}
                              size="sm"
                              type="button"
                              variant={user.isActive ? 'destructive' : 'outline'}
                            >
                              {user.isActive ? <ShieldBan /> : <ShieldCheck />}
                              {user.isActive ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

type StatCardProps = {
  label: string;
  value: string;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}
