import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { compactLicensePlate, formatLicensePlate } from '@/lib/license-plate';

import { vehicleEntryApi } from '../api/vehicle-entry-api';
import type { EntryFloorOption, EntrySlot, EntryVehicle, EntryZoneOption } from '../types/vehicle-entry.type';

const DEFAULT_VEHICLE_TYPE = 'CAR';
const DEFAULT_ENTRY_GATE = 'B1';

const formatFloorLabel = (floorNumber: number) =>
  floorNumber < 0 ? `Basement ${Math.abs(floorNumber)}` : `Basement ${floorNumber}`;

const getSlotFloorId = (slot: EntrySlot) => slot.zone?.floor?.id ?? '';
const getSlotZoneId = (slot: EntrySlot) => slot.zone?.id ?? '';

export function useVehicleEntry() {
  const [licensePlate, setLicensePlateState] = useState('');
  const [vehicleType] = useState(DEFAULT_VEHICLE_TYPE);
  const [entryGate] = useState(DEFAULT_ENTRY_GATE);
  const [entryImage, setEntryImage] = useState<File | null>(null);
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  const [vehicle, setVehicle] = useState<EntryVehicle | null>(null);
  const [allSlots, setAllSlots] = useState<EntrySlot[]>([]);
  const [selectedFloorId, setSelectedFloorId] = useState('');
  const [selectedZoneId, setSelectedZoneId] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<EntrySlot | null>(null);

  const floorOptions = useMemo<EntryFloorOption[]>(() => {
    const floorsById = new Map<string, EntryFloorOption>();

    for (const slot of allSlots) {
      const floor = slot.zone?.floor;
      const floorId = floor?.id;

      if (!floor || !floorId || floorsById.has(floorId)) {
        continue;
      }

      floorsById.set(floorId, {
        id: floorId,
        floorNumber: floor.floorNumber,
        label: `${floor.building?.name ? `${floor.building.name} - ` : ''}${formatFloorLabel(floor.floorNumber)}`,
      });
    }

    return [...floorsById.values()].sort((a, b) => a.floorNumber - b.floorNumber);
  }, [allSlots]);

  const zoneOptions = useMemo<EntryZoneOption[]>(() => {
    const zonesById = new Map<string, EntryZoneOption>();

    for (const slot of allSlots) {
      const zoneId = getSlotZoneId(slot);
      const floorId = getSlotFloorId(slot);

      if (!zoneId || !floorId || floorId !== selectedFloorId || zonesById.has(zoneId)) {
        continue;
      }

      zonesById.set(zoneId, {
        id: zoneId,
        floorId,
        label: slot.zone?.name ?? 'Unnamed zone',
      });
    }

    return [...zonesById.values()].sort((a, b) => a.label.localeCompare(b.label));
  }, [allSlots, selectedFloorId]);

  const slots = useMemo(
    () =>
      allSlots.filter(
        (slot) => getSlotFloorId(slot) === selectedFloorId && getSlotZoneId(slot) === selectedZoneId
      ),
    [allSlots, selectedFloorId, selectedZoneId]
  );

  useEffect(() => {
    if (!selectedFloorId && floorOptions.length > 0) {
      setSelectedFloorId(floorOptions[0].id);
    }
  }, [floorOptions, selectedFloorId]);

  useEffect(() => {
    if (!selectedFloorId) {
      setSelectedZoneId('');
      return;
    }

    if (!zoneOptions.some((zone) => zone.id === selectedZoneId)) {
      setSelectedZoneId(zoneOptions[0]?.id ?? '');
    }
  }, [selectedFloorId, selectedZoneId, zoneOptions]);

  useEffect(() => {
    if (!slots.some((slot) => slot.id === selectedSlot?.id)) {
      setSelectedSlot(slots[0] ?? null);
    }
  }, [selectedSlot?.id, slots]);

  useEffect(() => {
    const plate = compactLicensePlate(licensePlate);

    if (!plate) {
      setVehicle(null);
      return;
    }

    const timeout = window.setTimeout(async () => {
      try {
        const vehicles = await vehicleEntryApi.findVehicleByPlate(plate);
        const matchedVehicle = vehicles.find((item) => compactLicensePlate(item.licensePlate) === plate) ?? null;
        setVehicle(matchedVehicle);
      } catch {
        setVehicle(null);
      }
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [licensePlate]);

  const setLicensePlate = (value: string) => {
    setLicensePlateState(formatLicensePlate(value));
  };

  const loadAvailableSlots = async () => {
    try {
      const data = await vehicleEntryApi.getAvailableSlots(vehicleType);

      setAllSlots(data);

      if (data.length === 0) {
        setSelectedFloorId('');
        setSelectedZoneId('');
        setSelectedSlot(null);
        toast.warning('No available slots found');
      }
    } catch {
      toast.error('Failed to load available slots');
    }
  };

  const handleImageCaptured = async (file: File | null) => {
    setEntryImage(file);

    if (file) {
      await loadAvailableSlots();
    }
  };

  const handleCheckIn = async () => {
    const plate = compactLicensePlate(licensePlate);

    if (!plate) {
      toast.error('License plate is required');
      return;
    }

    if (!entryImage) {
      toast.error('Captured image is required');
      return;
    }

    if (!selectedSlot) {
      toast.error('Parking slot is required');
      return;
    }

    setIsCheckingIn(true);

    try {
      const vehicles = await vehicleEntryApi.findVehicleByPlate(plate);
      const matchedVehicle = vehicles.find((item) => compactLicensePlate(item.licensePlate) === plate) ?? null;

      if (matchedVehicle) {
        setVehicle(matchedVehicle);
      }

      await vehicleEntryApi.checkInByPlate({
        plate,
        image: entryImage,
        slotId: selectedSlot.id,
        vehicleType,
        vehicleId: matchedVehicle?.id ?? vehicle?.id,
        entryGate,
      });

      toast.success('Parking session checked in successfully');

      setLicensePlateState('');
      setVehicle(null);
      setEntryImage(null);
      setAllSlots([]);
      setSelectedFloorId('');
      setSelectedZoneId('');
      setSelectedSlot(null);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to check in vehicle'
        : 'Failed to check in vehicle';

      toast.error(message);
    } finally {
      setIsCheckingIn(false);
    }
  };

  return {
    licensePlate,
    setLicensePlate,
    vehicleType,
    entryGate,
    entryImage,
    setEntryImage: handleImageCaptured,
    isCheckingIn,
    vehicle,
    floorOptions,
    zoneOptions,
    selectedFloorId,
    setSelectedFloorId,
    selectedZoneId,
    setSelectedZoneId,
    slots,
    selectedSlot,
    setSelectedSlot,
    handleCheckIn,
  };
}
