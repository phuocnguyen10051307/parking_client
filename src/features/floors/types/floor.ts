// Kiểu dữ liệu cho từng tầng

export interface Floor {
  id: number;
  name: string;
  description: string;
  totalSlots: number;
  occupiedSlots: number;
  availability: number;
  status: 'Operational' | 'Near Capacity' | 'Maintenance';
}
