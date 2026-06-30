export type Zone = {
  id: string;
  name: string;
  floorId: string;
  floor: string;
  vehicleType: string;
  type: string;
  occupied: number;
  capacity: number;
  status: string;
  note: string;
};

export type ZoneFloorFilter = {
  id: string;
  name: string;
};