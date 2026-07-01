export interface Floor {
  id: string;
  buildingId?: string;
  floorNumber?: number;
  vehicleType?: string;
  building?: {
    id: string;
    name: string;
    address: string;
    totalFloors: number;
  };
  _count?: {
    zones: number;
  };
  name?: string;
  description?: string;
  totalSlots?: number;
  occupiedSlots?: number;
  availability?: number;
  status?: 'Operational' | 'Near Capacity' | 'Maintenance';
}

export type FloorFormValues = {
  buildingId: string;
  floorNumber: string;
  vehicleType: string;
};
