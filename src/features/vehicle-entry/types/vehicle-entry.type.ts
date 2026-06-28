export type EntryVehicle = {
  id: string;
  licensePlate: string;
  vehicleType: string;
  brand?: string;
  color?: string;
};

export type EntrySlot = {
  id: string;
  slotCode: string;
  vehicleType: string;
  status: string;
  zone?: {
    name: string;
    floor?: {
      floorNumber: number;
    };
  };
};
