import type { Zone } from '../types/zone';

export const zones: Zone[] = [
  {
    id: 1,
    name: 'Zone A',
    floor: 'Level 1',
    type: 'Sedan',
    occupied: 35,
    capacity: 50,
    status: 'stable',
    note: '15 slots remaining',
  },
  {
    id: 2,
    name: 'Zone B',
    floor: 'Level 1',
    type: 'SUV',
    occupied: 28,
    capacity: 30,
    status: 'critical',
    note: 'High demand detected',
  },
  {
    id: 3,
    name: 'VIP Zone',
    floor: 'Basement 1',
    type: 'EV Charger',
    occupied: 5,
    capacity: 15,
    status: 'vip',
    note: 'Promotional slots available',
  },
  {
    id: 4,
    name: 'Zone C',
    floor: 'Level 2',
    type: 'Motorcycle',
    occupied: 42,
    capacity: 100,
    status: 'optimal',
    note: 'High turnover rate',
  },
];
