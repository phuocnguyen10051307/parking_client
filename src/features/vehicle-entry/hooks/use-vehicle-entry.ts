import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

import { vehicleEntryApi } from '../api/vehicle-entry-api';
import type { EntrySlot, EntryVehicle } from '../types/vehicle-entry.type';

const DEFAULT_VEHICLE_TYPE = 'CAR';
const DEFAULT_ENTRY_GATE = 'B1';

const normalizePlate = (plate: string) =>
  plate
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');

export function useVehicleEntry() {
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleType] = useState(DEFAULT_VEHICLE_TYPE);
  const [entryGate] = useState(DEFAULT_ENTRY_GATE);
  const [entryImage, setEntryImage] = useState<File | null>(null);
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  const [vehicle, setVehicle] = useState<EntryVehicle | null>(null);
  const [slots, setSlots] = useState<EntrySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<EntrySlot | null>(null);

  const handleSearchVehicle = async () => {
    const plate = normalizePlate(licensePlate);

    if (!plate) {
      toast.warning('License plate is required');
      return;
    }

    try {
      const vehicles = await vehicleEntryApi.findVehicleByPlate(plate);

      const matchedVehicle = vehicles.find((v) => normalizePlate(v.licensePlate) === plate);

      if (matchedVehicle) {
        setVehicle(matchedVehicle);
        toast.success('Vehicle found successfully');
      } else {
        setVehicle(null);
        toast.warning('Vehicle not found in system');
      }
    } catch {
      toast.error('Failed to search vehicle');
    }
  };

  const loadAvailableSlots = async () => {
    try {
      const data = await vehicleEntryApi.getAvailableSlots(vehicleType);

      setSlots(data);

      if (data.length > 0) {
        setSelectedSlot(data[0]);
        toast.success('Available slots loaded');
      } else {
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
    const plate = normalizePlate(licensePlate);

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
      await vehicleEntryApi.checkInByPlate({
        plate,
        image: entryImage,
        slotId: selectedSlot.id,
        vehicleType,
        entryGate,
      });

      toast.success('Parking session checked in successfully');

      setLicensePlate('');
      setVehicle(null);
      setEntryImage(null);
      setSlots([]);
      setSelectedSlot(null);
      await loadAvailableSlots();
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
    slots,
    selectedSlot,
    setSelectedSlot,
    handleSearchVehicle,
    loadAvailableSlots,
    handleCheckIn,
  };
}


