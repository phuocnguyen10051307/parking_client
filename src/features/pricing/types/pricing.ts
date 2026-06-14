export type Pricing = {
  id: number;
  vehicleType: string;
  icon: string;
  hourlyRate: number;
  dailyRate: number;
  monthlyRate: number;
  overtimeRate: number;
  status: 'Active' | 'Inactive';
};
