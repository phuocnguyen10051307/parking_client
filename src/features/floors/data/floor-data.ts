import type { Floor } from '../types/floor';

// Mock data tầng
export const floorData: Floor[] = [
  {
    id: 'basement-1',
    name: 'Basement 1',
    description: 'Priority Access / Long-term',
    totalSlots: 250,
    occupiedSlots: 180,
    availability: 28,
    status: 'Operational',
  },
  {
    id: 'level-1',
    name: 'Level 1',
    description: 'Short-term / Visitor',
    totalSlots: 350,
    occupiedSlots: 315,
    availability: 10,
    status: 'Near Capacity',
  },
  {
    id: 'level-2',
    name: 'Level 2',
    description: 'Corporate Reserved',
    totalSlots: 300,
    occupiedSlots: 120,
    availability: 60,
    status: 'Operational',
  },
  {
    id: 'level-3',
    name: 'Level 3',
    description: 'EV Charging Hub',
    totalSlots: 350,
    occupiedSlots: 45,
    availability: 87,
    status: 'Maintenance',
  },
];
