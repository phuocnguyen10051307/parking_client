export type MonthlySubscriptionStatus = 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED';

export type MonthlySubscriptionPayment = {
  id: string;
  amount: number;
  method: 'CASH' | 'BANKING' | 'E_WALLET';
  provider?: string | null;
  orderCode?: string | null;
  providerPaymentId?: string | null;
  checkoutUrl?: string | null;
  status: 'PENDING' | 'PAID' | 'FAILED';
  paidAt?: string | null;
  createdAt: string;
};

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
  paymentMethod?: 'CASH' | 'BANKING' | 'E_WALLET';
  createdAt: string;
  updatedAt?: string;
  note?: string | null;
  payment?: MonthlySubscriptionPayment | null;
  paymentAction?: {
    checkoutUrl?: string | null;
    qrCode?: string | null;
    orderCode?: string;
  } | null;
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
