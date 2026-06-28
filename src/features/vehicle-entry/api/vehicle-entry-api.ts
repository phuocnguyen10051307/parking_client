import api from '@/lib/api';
import type { EntryVehicle } from '../types/vehicle-entry.type';

export const vehicleEntryApi = {
  // Tìm vehicle theo biển số
  findVehicleByPlate: async (plate: string): Promise<EntryVehicle[]> => {
    const response = await api.get('/vehicles', {
      params: { licensePlate: plate },
    });

    return response.data.data;
  },

  // Lấy slot available theo loại xe
  getAvailableSlots: async (vehicleType: string) => {
    const res = await api.get('/slots/available', {
      params: { vehicleType },
    });

    return res.data.data;
  },

  // Checkin tạo parking session
  checkIn: async (payload: { vehicleId: string; slotId: string; entryGate?: string }) => {
    const res = await api.post('/parking-sessions/check-in', payload);

    return res.data.data;
  },
};
