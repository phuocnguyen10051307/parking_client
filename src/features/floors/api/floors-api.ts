import api from '@/lib/api';

export type FloorPayload = {
  buildingId: string;
  floorNumber: number;
  vehicleType: string;
};

export const floorsApi = {
  getFloors: async () => {
    const res = await api.get('/admin/floors');
    return res.data.data;
  },
  createFloor: async (payload: FloorPayload) => {
    const res = await api.post('/admin/floors', payload);
    return res.data.data;
  },
  updateFloor: async (id: string, payload: FloorPayload) => {
    const res = await api.put(`/admin/floors/${id}`, payload);
    return res.data.data;
  },
  deleteFloor: async (id: string) => {
    await api.delete(`/admin/floors/${id}`);
  },
};
