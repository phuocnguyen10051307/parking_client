export type ExitVehicle = {
  id: string;
  licensePlate: string;
  vehicleType: string;
  brand?: string;
  color?: string;
};

export type ExitSlot = {
  id: string;
  slotCode: string;
};

export type ExitPayment = {
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

export type ExitSession = {
  id: string;
  vehicleId: string;
  slotId: string;
  entryTime: string;
  exitTime: string | null;
  entryGate: string;
  exitGate: string | null;
  exitImageUrl?: string | null;
  exitImagePublicId?: string | null;
  status: string;
  totalFee: number | null;
  vehicle: ExitVehicle;
  slot: ExitSlot;
  payment?: ExitPayment | null;
};

export type ExitFeeEstimate = {
  session: ExitSession;
  totalFee: number;
  paymentRequired: boolean;
  monthlySubscriptionApplied: boolean;
  applicableMonthlySubscription?: {
    id: string;
    startDate: string;
    endDate: string;
    status: string;
  } | null;
  payment?: ExitPayment | null;
};

export type ExitPaymentLink = ExitFeeEstimate & {
  checkoutUrl: string | null;
  qrCode: string | null;
  payment?: ExitPayment | null;
};
