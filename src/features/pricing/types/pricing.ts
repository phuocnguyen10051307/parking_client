export type PricingPolicy = {
  id: string;
  name: string;
  vehicleType: string;
  monthlyFee: number;
  daytimeBlockFee: number;
  eveningBlockFee: number;
  overnightFlatFee: number;
  blockDurationMinutes: number;
  gracePeriodMinutes: number;
  daytimeStartMinutes: number;
  daytimeEndMinutes: number;
  eveningStartMinutes: number;
  eveningEndMinutes: number;
  firstHourFee?: number;
  extraHourFee?: number;
  lostTicketFee: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PricingPolicyPayload = {
  name: string;
  vehicleType: string;
  monthlyFee: number;
  daytimeBlockFee: number;
  eveningBlockFee: number;
  overnightFlatFee: number;
  blockDurationMinutes: number;
  gracePeriodMinutes: number;
  daytimeStartMinutes: number;
  daytimeEndMinutes: number;
  eveningStartMinutes: number;
  eveningEndMinutes: number;
  isActive: boolean;
};
