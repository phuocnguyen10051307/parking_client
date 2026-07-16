import { STATUS_MAP, VEHICLE_MAP } from '../constants/slot-mapper';
import type { BackendSlot, FloorOption } from '../types/backend-slot.type';
import type { Slot } from '../types/slot.type';

// Convert dữ liệu backend -> UI slot
export const mapSlot = (item: BackendSlot): Slot => ({
  id: item.slotCode,
  status: STATUS_MAP[item.status] ?? 'available',
  vehicleType: VEHICLE_MAP[item.vehicleType] ?? 'car',
});

// Tách danh sách floor unique từ slot data
export const extractFloors = (data: BackendSlot[]): FloorOption[] => {
  const seen = new Map<string, FloorOption>();

  for (const item of data) {
    const floor = item.zone?.floor;

    if (floor && !seen.has(floor.id)) {
      seen.set(floor.id, {
        id: floor.id,
        name: `Floor ${floor.floorNumber}`,
        floorNumber: floor.floorNumber,
      });
    }
  }

  // Sort floor tăng dần
  return Array.from(seen.values()).sort((a, b) => a.floorNumber - b.floorNumber);
};
