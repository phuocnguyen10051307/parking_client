import api from '@/lib/api';

import type { SystemSetting } from '../types/settings';

export type UpdateSettingsPayload = {
  key: string;
  type: SystemSetting['type'];
  value: string;
};

export const settingsApi = {
  getSettings: async () => {
    const res = await api.get<{ data: { settings: SystemSetting[] } }>('/admin/settings');
    return res.data.data.settings;
  },
  updateSettings: async (settings: UpdateSettingsPayload[]) => {
    const res = await api.put<{ data: { settings: SystemSetting[] } }>('/admin/settings', {
      settings,
    });
    return res.data.data.settings;
  },
};
