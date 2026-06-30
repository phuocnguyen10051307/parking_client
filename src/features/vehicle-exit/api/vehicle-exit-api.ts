import api from '@/lib/api';

import type { ExitVehicle } from '../types/vehicle-exit.type';

export const vehicleExitApi = {
  // Lấy danh sách session đang active
  getActiveSessions: async () => {
    const res = await api.get('/parking-sessions', {
      params: {
        status: 'ACTIVE',
      },
    });

    return res.data.data;
  },

  findVehicleByPlate: async (plate: string): Promise<ExitVehicle[]> => {
    const res = await api.get('/vehicles', {
      params: { licensePlate: plate },
    });

    return res.data.data;
  },

  checkout: async (payload: { id: string; exitGate: string; image: File }) => {
    const formData = new FormData();

    formData.append('id', payload.id);
    formData.append('exitGate', payload.exitGate);
    formData.append('image', payload.image);

    const res = await api.post(`/parking-sessions/${payload.id}/check-out`, formData);

    return res.data.data;
  },
};
