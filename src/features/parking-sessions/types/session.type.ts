export type SessionStatus = 'ACTIVE' | 'COMPLETED' | 'LOST_TICKET' | 'OVERDUE';

export type ParkingSession = {
  id: string;
  entryTime: string;
  exitTime?: string | null;
  entryGate?: string | null;
  entryImageUrl?: string | null;
  entryImagePublicId?: string | null;
  exitGate?: string | null;
  exitImageUrl?: string | null;
  exitImagePublicId?: string | null;
  status: SessionStatus;
  totalFee?: string | null;
  note?: string | null;
  createdAt: string;

  vehicle?: {
    id: string;
    licensePlate: string;
    vehicleType: string;
    brand?: string;
    color?: string;
  };

  slot?: {
    id: string;
    slotCode: string;
    vehicleType: string;
    status: string;
    zone?: {
      id: string;
      name: string;
      floor?: {
        id: string;
        floorNumber: number;
        building?: {
          id: string;
          name: string;
          address?: string;
        };
      };
    };
  };

  user?: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
  };
};
