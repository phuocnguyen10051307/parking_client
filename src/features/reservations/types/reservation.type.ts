export type Reservation = {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;

  user?: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
  };

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
    };
  };
};
