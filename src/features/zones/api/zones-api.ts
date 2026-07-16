import api from '@/lib/api';

export type ZonePayload = {
  floorId: string;
  name: string;
};

export const zonesApi = {
  getZones: async () => {
    const res = await api.get('/admin/zones');
    return res.data.data;
  },
  createZone: async (payload: ZonePayload) => {
    const res = await api.post('/admin/zones', payload);
    return res.data.data;
  },
  updateZone: async (id: string, payload: ZonePayload) => {
    const res = await api.put(`/admin/zones/${id}`, payload);
    return res.data.data;
  },
  deleteZone: async (id: string) => {
    await api.delete(`/admin/zones/${id}`);
  },
};
