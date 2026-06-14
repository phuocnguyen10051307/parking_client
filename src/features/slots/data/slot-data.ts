import type { Slot } from '../types/slot.type';

/* Dữ liệu giả để render UI trước khi nối API thật*/

export const slotMockData: Slot[] = [
  {
    id: 'F1-101',
    status: 'available',
  },

  {
    id: 'F1-102',
    status: 'occupied',
    vehicleType: 'car',
    plate: 'ABC-1234',
    duration: '02h 45m',
  },

  {
    id: 'F1-103',
    status: 'reserved',
    vehicleType: 'truck',
  },

  {
    id: 'F1-104',
    status: 'maintenance',
  },

  {
    id: 'F1-105',
    status: 'occupied',
    vehicleType: 'bike',
    plate: 'BK-9988',
    duration: '01h 12m',
  },

  {
    id: 'F1-106',
    status: 'available',
  },

  {
    id: 'F1-107',
    status: 'occupied',
    vehicleType: 'car',
    plate: '51A-22334',
    duration: '03h 10m',
  },

  {
    id: 'F1-108',
    status: 'reserved',
    vehicleType: 'bike',
  },

  {
    id: 'F1-109',
    status: 'available',
  },

  {
    id: 'F1-110',
    status: 'maintenance',
  },
];
