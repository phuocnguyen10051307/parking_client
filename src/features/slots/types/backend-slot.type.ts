// Kiểu dữ liệu slot trả về từ backend
export type BackendSlot = {
  id: string;
  slotCode: string;
  status: string;
  vehicleType: string;
  isActive: boolean;

  zone: {
    id: string;
    name: string;

    floor: {
      id: string;
      floorNumber: number;
    };
  };
};

// Kiểu dữ liệu floor để render dropdown
export type FloorOption = {
  id: string;
  name: string;
  floorNumber: number;
};
