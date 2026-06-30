import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { slotsApi } from '@/features/slots/api/slots-api';
import type { BackendSlot } from '@/features/slots/types/backend-slot.type';

import { FloorCard } from '../components/floor-card';
import { FloorHealthChart } from '../components/floor-health-chart';
import { FloorInsightCard } from '../components/floor-insight-card';
import type { Floor } from '../types/floor';

const getFloorName = (floorNumber: number) =>
  floorNumber < 0 ? `Basement ${Math.abs(floorNumber)}` : `Level ${floorNumber}`;

const buildFloorsFromSlots = (slots: BackendSlot[]): Floor[] => {
  const floorMap = new Map<string, { floor: Floor; maintenanceSlots: number }>();

  slots.forEach((slot) => {
    const floor = slot.zone?.floor;

    if (!floor) {
      return;
    }

    const current = floorMap.get(floor.id) ?? {
      floor: {
        id: floor.id,
        name: getFloorName(floor.floorNumber),
        description: `${floor.vehicleType.replaceAll('_', ' ')} parking level`,
        totalSlots: 0,
        occupiedSlots: 0,
        availability: 0,
        status: 'Operational' as const,
      },
      maintenanceSlots: 0,
    };

    current.floor.totalSlots += 1;

    if (slot.status === 'OCCUPIED' || slot.status === 'RESERVED') {
      current.floor.occupiedSlots += 1;
    }

    if (slot.status === 'MAINTENANCE' || slot.status === 'BLOCKED') {
      current.maintenanceSlots += 1;
    }

    floorMap.set(floor.id, current);
  });

  return Array.from(floorMap.values())
    .map(({ floor, maintenanceSlots }) => {
      const availability =
        floor.totalSlots > 0
          ? Math.round(((floor.totalSlots - floor.occupiedSlots) / floor.totalSlots) * 100)
          : 0;
      const occupancy = floor.totalSlots > 0 ? (floor.occupiedSlots / floor.totalSlots) * 100 : 0;

      const status: Floor['status'] =
        maintenanceSlots > 0 ? 'Maintenance' : occupancy >= 85 ? 'Near Capacity' : 'Operational';

      return {
        ...floor,
        availability,
        status,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
};

export default function FloorsPage() {
  const [slots, setSlots] = useState<BackendSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const data = await slotsApi.getSlots();
        setSlots(data);
      } catch {
        toast.error('Failed to load floors');
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const floors = useMemo(() => buildFloorsFromSlots(slots), [slots]);
  const totalSlots = floors.reduce((total, floor) => total + floor.totalSlots, 0);
  const occupiedSlots = floors.reduce((total, floor) => total + floor.occupiedSlots, 0);
  const occupancy = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;
  const healthValues = floors.map((floor) => floor.availability);

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-3xl font-semibold text-blue-900">Floor Management</div>
          <p className="mt-2 text-slate-500">Manage parking levels and monitor occupancy.</p>
        </div>
      </div>

      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              Facility Overview
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="rounded-2xl bg-blue-50 p-5">
            <p className="text-sm text-slate-500">Active Floors</p>
            <h3 className="mt-2 text-4xl font-bold text-blue-900">{floors.length}</h3>
            <p className="mt-1 text-sm text-green-600">Live from slot data</p>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-5">
            <p className="text-sm text-slate-500">Total Capacity</p>
            <h3 className="mt-2 text-4xl font-bold text-emerald-700">{totalSlots}</h3>
            <p className="mt-1 text-sm text-slate-600">Parking slots available</p>
          </div>

          <div className="rounded-2xl bg-amber-50 p-5">
            <p className="text-sm text-slate-500">Current Occupancy</p>
            <h3 className="mt-2 text-4xl font-bold text-amber-600">{occupancy}%</h3>
            <p className="mt-1 text-sm text-slate-600">
              {occupiedSlots} / {totalSlots} slots occupied
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border bg-white p-10 text-center text-slate-500 shadow-sm">
          Loading floors...
        </div>
      ) : floors.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {floors.map((floor) => (
            <FloorCard key={floor.id} floor={floor} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border bg-white p-10 text-center text-slate-500 shadow-sm">
          No floor data found.
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <FloorHealthChart values={healthValues.length > 0 ? healthValues : [0]} />
        <FloorInsightCard />
      </div>
    </DashboardLayout>
  );
}