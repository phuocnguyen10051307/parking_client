import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

import { vehicleExitApi } from '../api/vehicle-exit-api';
import type { ExitSession } from '../types/vehicle-exit.type';

const normalizePlate = (plate: string) =>
  plate
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');

const DEFAULT_EXIT_GATE = 'B1';

export function useVehicleExit() {
  const [licensePlate, setLicensePlate] = useState('');
  const [session, setSession] = useState<ExitSession | null>(null);
  const [exitImage, setExitImage] = useState<File | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const searchSessionByPlate = async (plateValue: string) => {
    const plate = normalizePlate(plateValue);

    if (!plate) {
      toast.warning('License plate is required');
      return;
    }

    try {
      const sessions = await vehicleExitApi.getActiveSessions();
      const matchedSession = sessions.find(
        (item: ExitSession) => normalizePlate(item.vehicle.licensePlate) === plate
      );

      if (matchedSession) {
        setSession(matchedSession);
        toast.success('Parking session found');
        return;
      }

      const vehicles = await vehicleExitApi.findVehicleByPlate(plate);
      const matchedVehicle = vehicles.find((item) => normalizePlate(item.licensePlate) === plate);

      setSession(null);

      if (matchedVehicle) {
        toast.warning('Vehicle exists but has no active parking session');
        return;
      }

      toast.warning('Vehicle not found in system');
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to search parking session'
        : 'Failed to search parking session';

      toast.error(message);
    }
  };

  const handleSearchSession = () => searchSessionByPlate(licensePlate);

  const handlePlateDetected = async (plate: string) => {
    setLicensePlate(plate);
    await searchSessionByPlate(plate);
  };

  const handleCheckout = async () => {
    if (!session) {
      toast.error('No parking session selected');
      return;
    }

    if (!exitImage) {
      toast.error('Capture an exit photo before checkout');
      return;
    }

    try {
      setIsCheckingOut(true);
      await vehicleExitApi.checkout({ id: session.id, exitGate: DEFAULT_EXIT_GATE, image: exitImage });

      toast.success('Vehicle checked out successfully');
      setSession(null);
      setLicensePlate('');
      setExitImage(null);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to check out vehicle'
        : 'Failed to check out vehicle';

      toast.error(message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return {
    licensePlate,
    setLicensePlate,
    session,
    setExitImage,
    isCheckingOut,
    handlePlateDetected,
    handleSearchSession,
    handleCheckout,
  };
}


