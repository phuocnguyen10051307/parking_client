import { BadgeCheck, Shield, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { rolesApi } from '@/features/roles/api/roles-api';
import { adminUsersApi } from '@/features/users/api/admin-users-api';
import type { AdminUser } from '@/features/users/types/admin-user';
import { getErrorMessage } from '@/lib/error';

import type { RoleDefinition } from '../types/role';

export default function RoleManagementPage() {
  const [roles, setRoles] = useState<RoleDefinition[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingUserId, setSavingUserId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [roleData, userData] = await Promise.all([
        rolesApi.getRoles(),
        adminUsersApi.getUsers(),
      ]);
      setRoles(roleData);
      setUsers(userData);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to load roles'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleRoleUpdate = async (userId: string, role: AdminUser['role']) => {
    try {
      setSavingUserId(userId);
      await adminUsersApi.updateUserRole(userId, role);
      toast.success('Role updated');
      await loadData();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to update role'));
    } finally {
      setSavingUserId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Role Management
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                Control platform access
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Review role capabilities and reassign user access levels where needed.
              </p>
            </div>
            <Button onClick={() => void loadData()} type="button" variant="outline">
              <BadgeCheck />
              Refresh roles
            </Button>
          </div>
        </section>

        {loading ? (
          <section className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            Loading roles...
          </section>
        ) : (
          <>
            <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
              {roles.map((role) => (
                <div
                  key={role.key}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                      <Shield size={20} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {role.userCount} users
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-slate-900">{role.label}</h2>
                  <p className="mt-2 text-sm text-slate-500">{role.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                  <Users size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Quick role assignment</h2>
                  <p className="text-sm text-slate-500">
                    Update roles for active accounts without leaving the role dashboard.
                  </p>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="pb-3 pr-4 font-medium">User</th>
                      <th className="pb-3 pr-4 font-medium">Current status</th>
                      <th className="pb-3 pr-4 font-medium">Role</th>
                      <th className="pb-3 pr-4 font-medium">Last updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-slate-100">
                        <td className="py-4 pr-4">
                          <div className="font-medium text-slate-900">{user.fullName}</div>
                          <div className="mt-1 text-xs text-slate-500">{user.email}</div>
                        </td>
                        <td className="py-4 pr-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                              user.isActive
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-4 pr-4">
                          <select
                            value={user.role}
                            onChange={(event) =>
                              void handleRoleUpdate(
                                user.id,
                                event.target.value as AdminUser['role']
                              )
                            }
                            disabled={savingUserId === user.id}
                            className="h-9 rounded-lg border border-slate-200 px-3 outline-none transition focus:border-blue-400 disabled:opacity-60"
                          >
                            {roles.map((role) => (
                              <option key={role.key} value={role.key}>
                                {role.key}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-4 pr-4 text-slate-600">
                          {new Date(user.updatedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
