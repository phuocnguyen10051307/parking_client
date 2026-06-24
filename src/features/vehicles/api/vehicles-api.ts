import api from '@/lib/api';

// APIs của vehicle
export const vehiclesApi = {
  // Lấy xe của user hiện tại
  getMyVehicles: async () => {
    const res = await api.get('/vehicles');
    return res.data.data;
  },

  // Lấy chi tiết xe
  getVehicleById: async (id: string) => {
    const res = await api.get(`/vehicles/${id}`);
    return res.data.data;
  },

  // Tạo xe mới
  createVehicle: async (data: {
    licensePlate: string;
    vehicleType: string;
    brand?: string;
    color?: string;
  }) => {
    const res = await api.post('/vehicles', data);
    return res.data.data;
  },

  // Update xe
  updateVehicle: async (id: string, data: object) => {
    const res = await api.put(`/vehicles/${id}`, data);
    return res.data.data;
  },

  // Xóa xe
  deleteVehicle: async (id: string) => {
    const res = await api.delete(`/vehicles/${id}`);
    return res.data;
  },
};
