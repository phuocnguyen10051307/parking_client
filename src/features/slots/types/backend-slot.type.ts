export type BackendSlot = {
  id: string;
  zoneId: string;
  slotCode: string;
  status: string;
  vehicleType: string;
  isActive: boolean;
  createdAt: string;
  zone: {
    id: string;
    name: string;
    floor: {
      id: string;
      floorNumber: number;
      vehicleType: string;
      building?: {
        id: string;
        name: string;
        address: string;
      };
    };
  };
};

export type FloorOption = {
  id: string;
  name: string;
  floorNumber: number;
};

export type SlotFormValues = {
  zoneId: string;
  slotCode: string;
  status: string;
  isActive: boolean;
};
