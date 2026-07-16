import type { PricingPolicy } from '@/features/pricing/types/pricing';

const DEFAULT_CAR_POLICY: PricingPolicy = {
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
};

const NON_CAR_HOURLY_RATES: Record<string, number> = {
  MOTORBIKE: 0.5,
  BICYCLE: 0.25,
  ELECTRIC_BIKE: 1.5,
};

const addMinutes = (date: Date, minutes: number) => new Date(date.getTime() + minutes * 60000);

const getSegmentMinutes = (rangeStart: Date, rangeEnd: Date, segmentStart: Date, segmentEnd: Date) => {
  const start = Math.max(rangeStart.getTime(), segmentStart.getTime());
  const end = Math.min(rangeEnd.getTime(), segmentEnd.getTime());

  return end > start ? Math.ceil((end - start) / 60000) : 0;
};

const getPolicySegmentWindows = (policy: PricingPolicy, currentDay: Date) => {
  const daytimeStart = new Date(currentDay);
  daytimeStart.setHours(0, 0, 0, 0);
  daytimeStart.setMinutes(policy.daytimeStartMinutes);

  const daytimeEnd = new Date(currentDay);
  daytimeEnd.setHours(0, 0, 0, 0);
  daytimeEnd.setMinutes(policy.daytimeEndMinutes + 1);

  const eveningStart = new Date(currentDay);
  eveningStart.setHours(0, 0, 0, 0);
  eveningStart.setMinutes(policy.eveningStartMinutes);

  const nextDay = addMinutes(new Date(currentDay), 24 * 60);
  const eveningEnd = new Date(nextDay);
  eveningEnd.setHours(0, 0, 0, 0);

  const overnightStart = new Date(currentDay);
  overnightStart.setHours(0, 0, 0, 0);

  const overnightEnd = new Date(currentDay);
  overnightEnd.setHours(0, 0, 0, 0);
  overnightEnd.setMinutes(policy.daytimeStartMinutes);

  return {
    daytimeStart,
    daytimeEnd,
    eveningStart,
    eveningEnd,
    overnightStart,
    overnightEnd,
  };
};

const calculateCarParkingFeeFromPolicy = (entryTime: Date, exitTime: Date, policy: PricingPolicy) => {
  let total = 0;
  const currentDay = new Date(entryTime);
  currentDay.setHours(0, 0, 0, 0);

  while (currentDay < exitTime) {
    const { daytimeStart, daytimeEnd, eveningStart, eveningEnd, overnightStart, overnightEnd } =
      getPolicySegmentWindows(policy, currentDay);

    const overnightMinutes = getSegmentMinutes(entryTime, exitTime, overnightStart, overnightEnd);
    const daytimeMinutes = getSegmentMinutes(entryTime, exitTime, daytimeStart, daytimeEnd);
    const eveningMinutes = getSegmentMinutes(entryTime, exitTime, eveningStart, eveningEnd);

    if (overnightMinutes > 0) {
      total += policy.overnightFlatFee;
    }

    if (daytimeMinutes > 0) {
      total += Math.ceil(daytimeMinutes / policy.blockDurationMinutes) * policy.daytimeBlockFee;
    }

    if (eveningMinutes > 0) {
      total += Math.ceil(eveningMinutes / policy.blockDurationMinutes) * policy.eveningBlockFee;
    }

    currentDay.setDate(currentDay.getDate() + 1);
  }

  return total;
};

export const formatVnd = (amount: number) => `${new Intl.NumberFormat('vi-VN').format(amount)}d`;

export const formatMinutesAsTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

export const getDefaultCarPricingPolicy = () => DEFAULT_CAR_POLICY;

export const calculateEstimatedParkingFee = (
  entryTime: string,
  exitTime: Date,
  vehicleType = 'CAR',
  policy: PricingPolicy = DEFAULT_CAR_POLICY
) => {
  const normalizedEntryTime = new Date(entryTime);
  const parkedMinutes = Math.max(0, Math.ceil((exitTime.getTime() - normalizedEntryTime.getTime()) / 60000));

  if (vehicleType === 'CAR') {
    if (parkedMinutes <= policy.gracePeriodMinutes) {
      return 0;
    }

    return calculateCarParkingFeeFromPolicy(normalizedEntryTime, exitTime, policy);
  }

  if (parkedMinutes <= 15) {
    return 0;
  }

  const billableHours = Math.max(1, Math.ceil(parkedMinutes / 60));
  const hourlyRate = NON_CAR_HOURLY_RATES[vehicleType] ?? NON_CAR_HOURLY_RATES.ELECTRIC_BIKE;

  return Number((billableHours * hourlyRate).toFixed(2));
};
