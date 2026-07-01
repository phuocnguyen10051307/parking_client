import api from '@/lib/api';

export type BuildingPayload = {
  address: string;
  name: string;
  totalFloors: number;
};

export const buildingsApi = {
  getBuildings: async () => {
    const res = await api.get('/admin/buildings');
    return res.data.data;
  },
  createBuilding: async (payload: BuildingPayload) => {
    const res = await api.post('/admin/buildings', payload);
    return res.data.data;
  },
  updateBuilding: async (id: string, payload: BuildingPayload) => {
    const res = await api.put(`/admin/buildings/${id}`, payload);
    return res.data.data;
  },
  deleteBuilding: async (id: string) => {
    await api.delete(`/admin/buildings/${id}`);
  },
};
