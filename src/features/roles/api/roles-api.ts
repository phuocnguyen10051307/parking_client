import api from '@/lib/api';

import type { RoleDefinition } from '../types/role';

export const rolesApi = {
  getRoles: async () => {
    const res = await api.get<{ data: { roles: RoleDefinition[] } }>('/admin/roles');
    return res.data.data.roles;
  },
};
