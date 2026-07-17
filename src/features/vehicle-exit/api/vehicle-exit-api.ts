import api from '@/lib/api';

import type { ExitFeeEstimate, ExitPaymentLink, ExitSession, ExitVehicle } from '../types/vehicle-exit.type';

export const vehicleExitApi = {
  getActiveSessions: async (): Promise<ExitSession[]> => {
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

  estimateFee: async (id: string): Promise<ExitFeeEstimate> => {
    const res = await api.post(`/parking-sessions/${id}/estimate-fee`);
    return res.data.data;
  },

  createPaymentLink: async (payload: {
    id: string;
    paymentMethod: 'BANKING' | 'E_WALLET';
  }): Promise<ExitPaymentLink> => {
    const res = await api.post(`/parking-sessions/${payload.id}/create-payment-link`, {
      paymentMethod: payload.paymentMethod,
    });

    return res.data.data;
  },

  checkout: async (payload: {
    id: string;
    exitGate: string;
    image: File;
    paymentMethod: 'CASH' | 'BANKING' | 'E_WALLET';
  }) => {
    const formData = new FormData();

    formData.append('id', payload.id);
    formData.append('exitGate', payload.exitGate);
    formData.append('paymentMethod', payload.paymentMethod);
    formData.append('image', payload.image);

    const res = await api.post(`/parking-sessions/${payload.id}/check-out`, formData);

    return res.data.data as ExitSession;
  },
};
