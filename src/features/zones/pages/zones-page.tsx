import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { slotsApi } from '@/features/slots/api/slots-api';
import type { BackendSlot } from '@/features/slots/types/backend-slot.type';

import { ZoneActivityCard } from '../components/zone-activity-card';
import { ZoneCard } from '../components/zone-card';
import { ZoneSummaryCard } from '../components/zone-summary-card';
import { ZoneFilterBar } from '../components/zone-filter-bar';
import type { Zone, ZoneFloorFilter } from '../types/zone';

const getFloorName = (floorNumber: number) =>
  floorNumber < 0 ? `Basement ${Math.abs(floorNumber)}` : `Level ${floorNumber}`;

const formatVehicleType = (vehicleType: string) => vehicleType.replaceAll('_', ' ');

const buildZonesFromSlots = (slots: BackendSlot[]): Zone[] => {
  const zoneMap = new Map<string, Zone>();

  slots.forEach((slot) => {
    const zone = slot.zone;
    const floor = zone?.floor;

    if (!zone || !floor) {
      return;
    }

    const current = zoneMap.get(zone.id) ?? {
      id: zone.id,
      name: zone.name,
      floorId: floor.id,
      floor: getFloorName(floor.floorNumber),
      vehicleType: slot.vehicleType,
      type: formatVehicleType(slot.vehicleType),
      occupied: 0,
      capacity: 0,
      status: 'Operational',
      note: 'Live occupancy from slot data',
    };

    current.capacity += 1;

    if (slot.status === 'OCCUPIED' || slot.status === 'RESERVED') {
      current.occupied += 1;
    }

    if (slot.status === 'MAINTENANCE' || slot.status === 'BLOCKED') {
      current.status = 'Maintenance';
      current.note = 'Some slots need attention';
    }

    zoneMap.set(zone.id, current);
  });

  return Array.from(zoneMap.values())
    .map((zone) => {
      const occupancy = zone.capacity > 0 ? (zone.occupied / zone.capacity) * 100 : 0;

      if (zone.status !== 'Maintenance' && occupancy >= 85) {
        return { ...zone, status: 'Near Capacity', note: 'Capacity warning' };
      }

      return zone;
    })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
};

const buildFloorFilters = (slots: BackendSlot[]): ZoneFloorFilter[] => {
  const floorMap = new Map<string, ZoneFloorFilter>();

  slots.forEach((slot) => {
    const floor = slot.zone?.floor;

    if (floor) {
      floorMap.set(floor.id, {
        id: floor.id,
        name: getFloorName(floor.floorNumber),
      });
    }
  });

  return Array.from(floorMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true })
  );
};

export default function ZonesPage() {
  const [slots, setSlots] = useState<BackendSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFloorId, setSelectedFloorId] = useState('all');
  const [selectedVehicleType, setSelectedVehicleType] = useState('all');

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const data = await slotsApi.getSlots();
        setSlots(data);
      } catch {
        toast.error('Failed to load zones');
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const zones = useMemo(() => buildZonesFromSlots(slots), [slots]);
  const floors = useMemo(() => buildFloorFilters(slots), [slots]);
  const vehicleTypes = useMemo(
    () => Array.from(new Set(slots.map((slot) => slot.vehicleType))).sort(),
    [slots]
  );

  const filteredZones = useMemo(
    () =>
      zones.filter((zone) => {
        const matchesFloor = selectedFloorId === 'all' || zone.floorId === selectedFloorId;
        const matchesVehicle =
          selectedVehicleType === 'all' || zone.vehicleType === selectedVehicleType;

        return matchesFloor && matchesVehicle;
      }),
    [zones, selectedFloorId, selectedVehicleType]
  );

  const maintenanceZones = zones.filter((zone) => zone.status === 'Maintenance').length;
  const nearCapacityZones = zones.filter((zone) => zone.status === 'Near Capacity').length;
  const totalCapacity = zones.reduce((total, zone) => total + zone.capacity, 0);

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-3xl font-semibold text-blue-900">Zone Management</div>
          <p className="mt-2 text-slate-500">Optimize and monitor parking availability.</p>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <ZoneSummaryCard title="Total Zones" value={String(zones.length)} />
        <ZoneSummaryCard title="Total Capacity" value={String(totalCapacity)} />
        <ZoneSummaryCard title="Near Capacity" value={String(nearCapacityZones)} />
        <ZoneSummaryCard title="Maintenance" value={String(maintenanceZones)} />
      </div>

      <ZoneFilterBar
        floors={floors}
        selectedFloorId={selectedFloorId}
        selectedVehicleType={selectedVehicleType}
        vehicleTypes={vehicleTypes}
        onFloorChange={setSelectedFloorId}
        onVehicleTypeChange={setSelectedVehicleType}
      />

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Loading zones...
        </div>
      ) : filteredZones.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredZones.map((zone) => (
            <ZoneCard key={zone.id} zone={zone} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          No zones found.
        </div>
      )}

      <div className="mt-10">
        <ZoneActivityCard />
      </div>
    </DashboardLayout>
  );
}