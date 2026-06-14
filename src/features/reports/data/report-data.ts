import type { ReportStat, Transaction } from '../types/report';

export const reportStats: ReportStat[] = [
  {
    title: 'Today Revenue',
    value: '$4,280',
    note: '+8% from yesterday',
  },
  {
    title: 'Active Sessions',
    value: '142',
    note: '12 overdue vehicles',
  },
  {
    title: 'Vehicles Today',
    value: '368',
    note: 'Peak at 14:00',
  },
  {
    title: 'Occupancy Rate',
    value: '76%',
    note: 'Stable usage',
  },
];

export const transactions: Transaction[] = [
  {
    id: 1,
    plate: 'ABC-1234',
    vehicleType: 'Sedan',
    amount: 45,
    status: 'Paid',
    time: '08:30 AM',
  },
  {
    id: 2,
    plate: 'XYZ-9876',
    vehicleType: 'SUV',
    amount: 60,
    status: 'Paid',
    time: '09:45 AM',
  },
  {
    id: 3,
    plate: 'BK-9988',
    vehicleType: 'Motorbike',
    amount: 15,
    status: 'Pending',
    time: '10:15 AM',
  },
];
