import api from '@/lib/api';
import type { EntryVehicle } from '../types/vehicle-entry.type';

type CheckInByPlatePayload = {
  plate: string;
  image: File;
  slotId: string;
  vehicleType: string;
  entryGate?: string;
};

export const vehicleEntryApi = {
  findVehicleByPlate: async (plate: string): Promise<EntryVehicle[]> => {
    const response = await api.get('/vehicles', {
      params: { licensePlate: plate },
    });

    return response.data.data;
  },

  getAvailableSlots: async (vehicleType: string) => {
    const res = await api.get('/slots/available', {
      params: { vehicleType },
    });

    return res.data.data;
  },

  checkIn: async (payload: { vehicleId: string; slotId: string; entryGate?: string }) => {
    const res = await api.post('/parking-sessions/check-in', payload);

    return res.data.data;
  },

  checkInByPlate: async (payload: CheckInByPlatePayload) => {
    const formData = new FormData();

    formData.append('plate', payload.plate);
    formData.append('image', payload.image);
    formData.append('slotId', payload.slotId);
    formData.append('vehicleType', payload.vehicleType);

    if (payload.entryGate) {
      formData.append('entryGate', payload.entryGate);
    }

    const res = await api.post('/parking/check-in', formData);

    return res.data.data;
  },
};
