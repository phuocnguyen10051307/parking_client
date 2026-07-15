import type { ParkingSession } from '@/features/parking-sessions/types/session.type';
import type { Reservation } from '@/features/reservations/types/reservation.type';
import type { BackendSlot } from '@/features/slots/types/backend-slot.type';

export type ParkingMapSlot = BackendSlot & {
  activeSession?: ParkingSession | null;
  activeReservation?: Reservation | null;
  isOccupied?: boolean;
  isReserved?: boolean;
  isOwnedByCurrentUser?: boolean;
  visiblePlate?: string | null;
};

export type ParkingMapFloor = {
  id: string;
  floorNumber: number;
  building: {
    id: string;
    name: string;
    address?: string;
  };
  slots: ParkingMapSlot[];
  occupiedCount: number;
  totalCount: number;
};

export type ParkingMapBuilding = {
  id: string;
  name: string;
  address?: string;
  floors: ParkingMapFloor[];
  occupiedCount: number;
  totalCount: number;
};
