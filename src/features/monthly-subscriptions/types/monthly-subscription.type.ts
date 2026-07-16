export type MonthlySubscriptionStatus = 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED';

export type MonthlySubscription = {
  id: string;
  userId: string;
  vehicleId: string;
  planName?: string;
  durationMonths: number;
  monthlyFee?: number;
  totalAmount?: number;
  price?: number;
  startDate: string;
  endDate: string;
  status: MonthlySubscriptionStatus;
  createdAt: string;
  updatedAt?: string;
  note?: string | null;
  user?: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
  };
  vehicle?: {
    id: string;
    licensePlate: string;
    vehicleType: string;
    brand?: string;
    color?: string;
  };
};
