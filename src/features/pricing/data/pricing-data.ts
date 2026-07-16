import type { PricingPolicy } from '../types/pricing';

export const pricingData: PricingPolicy[] = [
  {
    id: 'default-car-policy',
    name: 'Apartment Car Pricing',
    vehicleType: 'CAR',
    monthlyFee: 1250000,
    daytimeBlockFee: 15000,
    eveningBlockFee: 20000,
    overnightFlatFee: 100000,
    blockDurationMinutes: 120,
    gracePeriodMinutes: 15,
    daytimeStartMinutes: 360,
    daytimeEndMinutes: 1049,
    eveningStartMinutes: 1080,
    eveningEndMinutes: 1439,
    firstHourFee: 15000,
    extraHourFee: 20000,
    lostTicketFee: 100000,
    isActive: true,
    createdAt: '',
    updatedAt: '',
  },
];
