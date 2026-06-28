import { useState } from 'react';
import { toast } from 'sonner';

import { vehicleEntryApi } from '../api/vehicle-entry-api';
import type { EntrySlot, EntryVehicle } from '../types/vehicle-entry.type';

export function useVehicleEntry() {
  // Form state
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleType, setVehicleType] = useState('CAR');
  const [entryGate, setEntryGate] = useState('North Main Entrance');

  // Vehicle state
  const [vehicle, setVehicle] = useState<EntryVehicle | null>(null);

  // Slot state
  const [slots, setSlots] = useState<EntrySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<EntrySlot | null>(null);

  // Search vehicle by plate
  const handleSearchVehicle = async () => {
    try {
      const vehicles = await vehicleEntryApi.findVehicleByPlate(licensePlate);

      const matchedVehicle = vehicles.find(
        (v) =>
          v.licensePlate.replace(/[-.\s]/g, '').toUpperCase() ===
          licensePlate.replace(/[-.\s]/g, '').toUpperCase()
      );

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

  // Load available slots
  const loadAvailableSlots = async () => {
    try {
      const data = await vehicleEntryApi.getAvailableSlots(vehicleType);

      setSlots(data);

      if (data.length > 0) {
        setSelectedSlot(data[0]);
        toast.success('Available slots loaded');
      } else {
        toast.warning('No available slots found');
      }
    } catch {
      toast.error('Failed to load available slots');
    }
  };

  // Check-in vehicle
  const handleCheckIn = async () => {
    if (!vehicle) {
      toast.error('Vehicle is required');
      return;
    }

    if (!selectedSlot) {
      toast.error('Parking slot is required');
      return;
    }

    try {
      await vehicleEntryApi.checkIn({
        vehicleId: vehicle.id,
        slotId: selectedSlot.id,
        entryGate,
      });

      toast.success('Parking session created successfully');

      //load lại slot mới
      await loadAvailableSlots();

      // reset UI sau check-in
      setLicensePlate('');
      setVehicle(null);
      setSlots([]);
      setSelectedSlot(null);
    } catch {
      toast.error('Failed to create parking session');
    }
  };

  return {
    licensePlate,
    setLicensePlate,
    vehicleType,
    setVehicleType,
    entryGate,
    setEntryGate,
    vehicle,
    slots,
    selectedSlot,
    setSelectedSlot,
    handleSearchVehicle,
    loadAvailableSlots,
    handleCheckIn,
  };
}
