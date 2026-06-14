import type { Pricing } from '../types/pricing';

// Mock data pricing
export const pricingData: Pricing[] = [
  {
    id: 1,
    vehicleType: 'Motorbike',
    icon: 'Bike',
    hourlyRate: 0.5,
    dailyRate: 5,
    monthlyRate: 45,
    overtimeRate: 1,
    status: 'Active',
  },
  {
    id: 2,
    vehicleType: 'Car',
    icon: 'Car',
    hourlyRate: 2,
    dailyRate: 15,
    monthlyRate: 120,
    overtimeRate: 5,
    status: 'Active',
  },
  {
    id: 3,
    vehicleType: 'Truck',
    icon: 'Truck',
    hourlyRate: 5,
    dailyRate: 40,
    monthlyRate: 300,
    overtimeRate: 8,
    status: 'Active',
  },
  {
    id: 4,
    vehicleType: 'Electric Vehicle',
    icon: 'CarFront',
    hourlyRate: 1.5,
    dailyRate: 12,
    monthlyRate: 100,
    overtimeRate: 3,
    status: 'Active',
  },
];
