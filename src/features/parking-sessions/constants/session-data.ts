import type { Session } from '../types/session.type';

export const sessions: Session[] = [
  {
    plate: 'ABC-1234',
    vehicle: 'Sedan',
    duration: '08h 45m',
    fee: '$124.00',
    status: 'OVERDUE',
  },
  {
    plate: 'XYZ-9876',
    vehicle: 'EV Sedan',
    duration: '02h 10m',
    fee: '$32.00',
    status: 'PARKED',
  },
];
