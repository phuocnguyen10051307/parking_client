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
    id?: string;
    name: string;
    floor?: {
      id?: string;
      floorNumber: number;
      building?: {
        id: string;
        name: string;
      };
    };
  };
};

export type EntryFloorOption = {
  id: string;
  label: string;
  floorNumber: number;
};

export type EntryZoneOption = {
  id: string;
  label: string;
  floorId: string;
};

