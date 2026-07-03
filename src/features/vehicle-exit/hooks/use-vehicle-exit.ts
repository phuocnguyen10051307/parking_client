import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { pricingApi } from '@/features/pricing/api/pricing-api';
import type { PricingPolicy } from '@/features/pricing/types/pricing';

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
  const [pricingPolicy, setPricingPolicy] = useState<PricingPolicy | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'BANKING' | 'E_WALLET'>('CASH');
  const [exitImage, setExitImage] = useState<File | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const loadPricingPolicy = async () => {
      if (!session?.vehicle?.vehicleType) {
        setPricingPolicy(null);
        return;
      }

      try {
        const policy = await pricingApi.getActivePolicy(session.vehicle.vehicleType);
        setPricingPolicy(policy);
      } catch {
        setPricingPolicy(null);
      }
    };

    loadPricingPolicy();
  }, [session?.vehicle?.vehicleType]);

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
      setPricingPolicy(null);

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
      await vehicleExitApi.checkout({
        id: session.id,
        exitGate: DEFAULT_EXIT_GATE,
        image: exitImage,
        paymentMethod,
      });

      toast.success('Vehicle checked out and payment recorded successfully');
      setSession(null);
      setLicensePlate('');
      setExitImage(null);
      setPricingPolicy(null);
      setPaymentMethod('CASH');
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
    pricingPolicy,
    paymentMethod,
    setPaymentMethod,
    setExitImage,
    isCheckingOut,
    handlePlateDetected,
    handleSearchSession,
    handleCheckout,
  };
}
