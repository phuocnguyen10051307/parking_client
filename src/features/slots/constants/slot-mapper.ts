import type { SlotStatus, VehicleType } from '../types/slot.type';

// Map status backend -> status UI
export const STATUS_MAP: Record<string, SlotStatus> = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  RESERVED: 'reserved',
  MAINTENANCE: 'maintenance',
  BLOCKED: 'maintenance',
};

// Map vehicle backend -> vehicle UI
export const VEHICLE_MAP: Record<string, VehicleType> = {
  CAR: 'car',
  MOTORBIKE: 'bike',
  BICYCLE: 'bike',
  ELECTRIC_BIKE: 'bike',
  TRUCK: 'truck',
};
