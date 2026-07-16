import api from '@/lib/api';

import type { ParkingMapBuilding } from '../types/parking-map';

export type ParkingMapScope = 'all' | 'mine';

export async function getParkingMapBuildings(_scope: ParkingMapScope = 'all'): Promise<ParkingMapBuilding[]> {
  const res = await api.get('/parking-map/public-view');
  return res.data.data;
}
