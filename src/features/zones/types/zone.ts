export type Zone = {
  id: string;
  name: string;
  floorId: string;
  floor:
    | string
    | {
        id: string;
        floorNumber: number;
        vehicleType: string;
        building: {
          id: string;
          name: string;
          address: string;
        };
      };
  _count?: {
    slots: number;
  };
  vehicleType?: string;
  type?: string;
  occupied?: number;
  capacity?: number;
  status?: 'Operational' | 'Near Capacity' | 'Maintenance';
  note?: string;
};

export type ZoneFloorFilter = {
  id: string;
  name: string;
};

export type ZoneFormValues = {
  floorId: string;
  name: string;
};
