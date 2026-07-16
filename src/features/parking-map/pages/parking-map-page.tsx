import { useEffect, useMemo, useState } from 'react';
import { Building2, Layers3, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { getErrorMessage } from '@/lib/error';
import { useAuthStore } from '@/store/auth-store';

import { getParkingMapBuildings } from '../api/parking-map-api';
import { ParkingMapViewer } from '../components/parking-map-viewer';
import type { ParkingMapBuilding } from '../types/parking-map';

const formatFloorLabel = (floorNumber: number) =>
  floorNumber < 0 ? `Basement ${Math.abs(floorNumber)}` : `Level ${floorNumber}`;

export default function ParkingMapPage() {
  const user = useAuthStore((state) => state.user);
  const [buildings, setBuildings] = useState<ParkingMapBuilding[]>([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState('');
  const [selectedFloorId, setSelectedFloorId] = useState('');
  const [loading, setLoading] = useState(true);

  const isUserView = user?.role === 'USER';

  const selectedBuilding = useMemo(
    () => buildings.find((building) => building.id === selectedBuildingId) ?? buildings[0] ?? null,
    [buildings, selectedBuildingId]
  );

  const visibleFloors = selectedBuilding?.floors ?? [];
  const selectedFloor = visibleFloors.find((floor) => floor.id === selectedFloorId) ?? null;
  const activeFloors = selectedFloor ? [selectedFloor] : visibleFloors;
  const visibleVehicleCount = activeFloors.reduce((total, floor) => total + floor.occupiedCount, 0);
  const totalSlotCount = activeFloors.reduce((total, floor) => total + floor.totalCount, 0);

  const loadMap = async () => {
    setLoading(true);

    try {
      const data = await getParkingMapBuildings(isUserView ? 'mine' : 'all');
      setBuildings(data);
      setSelectedBuildingId((current) => current || data[0]?.id || '');
      setSelectedFloorId('');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to load parking map'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadMap();
  }, [isUserView]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase text-slate-500">Parking map</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">
            {isUserView ? 'My vehicle location' : 'Building overview'}
          </h1>
          <p className="mt-2 max-w-2xl text-slate-500">
            {isUserView
              ? 'View the current parking slot of your active or reserved vehicle in the basement.'
              : 'View occupied and reserved vehicles by building and basement floor.'}
          </p>
        </div>

        <Button onClick={loadMap} disabled={loading} variant="outline" className="w-fit">
          <RefreshCw size={16} />
          Refresh
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Building2 size={16} />
            Building
          </div>
          <select
            className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-700"
            value={selectedBuildingId}
            onChange={(event) => {
              setSelectedBuildingId(event.target.value);
              setSelectedFloorId('');
            }}
          >
            {buildings.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Layers3 size={16} />
            Floor view
          </div>
          <select
            className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-700"
            value={selectedFloorId}
            onChange={(event) => setSelectedFloorId(event.target.value)}
            disabled={!selectedBuilding}
          >
            <option value="">All basement floors</option>
            {visibleFloors.map((floor) => (
              <option key={floor.id} value={floor.id}>
                {formatFloorLabel(floor.floorNumber)}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            {isUserView ? 'My vehicles shown' : 'Vehicles shown'}
          </p>
          <div className="mt-3 text-3xl font-semibold text-slate-950">
            {visibleVehicleCount}
            <span className="ml-2 text-base font-medium text-slate-400">/ {totalSlotCount} slots</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-slate-500">
          Loading parking map...
        </div>
      ) : selectedBuilding ? (
        <>
          <ParkingMapViewer floors={visibleFloors} selectedFloorId={selectedFloorId || null} showVehicleDetails={!isUserView} />

          {isUserView && visibleVehicleCount === 0 ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 shadow-sm">
              No active or reserved vehicle is currently shown for your account. If you just created a reservation or
              staff already checked your car in, refresh this page in a moment.
            </div>
          ) : null}

          <div className="grid gap-3 md:grid-cols-2">
            {activeFloors.map((floor) => (
              <div key={floor.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-slate-950">{formatFloorLabel(floor.floorNumber)}</h2>
                    <p className="text-sm text-slate-500">{floor.building.name}</p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-900">
                    {floor.occupiedCount}/{floor.totalCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-slate-500">
          No building or slot data found.
        </div>
      )}
    </div>
  );
}
