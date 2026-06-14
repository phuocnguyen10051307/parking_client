export type SlotStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';

export type VehicleType = 'car' | 'bike' | 'truck';

export type Slot = {
  id: string;
  status: SlotStatus;
  vehicleType?: VehicleType;
  plate?: string;
  duration?: string;
};
