import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { compactLicensePlate, formatLicensePlate } from '@/lib/license-plate';
import { pricingApi } from '@/features/pricing/api/pricing-api';
import type { PricingPolicy } from '@/features/pricing/types/pricing';

import { vehicleExitApi } from '../api/vehicle-exit-api';
import type { ExitFeeEstimate, ExitSession } from '../types/vehicle-exit.type';

const DEFAULT_EXIT_GATE = 'B1';

export function useVehicleExit() {
  const [licensePlate, setLicensePlateState] = useState('');
  const [session, setSession] = useState<ExitSession | null>(null);
  const [pricingPolicy, setPricingPolicy] = useState<PricingPolicy | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'BANKING' | 'E_WALLET'>('CASH');
  const [exitImage, setExitImage] = useState<File | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isEstimatingFee, setIsEstimatingFee] = useState(false);
  const [isCreatingPaymentLink, setIsCreatingPaymentLink] = useState(false);
  const [feeEstimate, setFeeEstimate] = useState<ExitFeeEstimate | null>(null);

  const setLicensePlate = (value: string) => {
    setLicensePlateState(formatLicensePlate(value));
  };

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

    void loadPricingPolicy();
  }, [session?.vehicle?.vehicleType]);

  const searchSessionByPlate = async (plateValue: string) => {
    const plate = compactLicensePlate(plateValue);

    if (!plate) {
      toast.warning('License plate is required');
      return;
    }

    try {
      const sessions = await vehicleExitApi.getActiveSessions();
      const matchedSession = sessions.find(
        (item: ExitSession) => compactLicensePlate(item.vehicle.licensePlate) === plate
      );

      if (matchedSession) {
        setSession(matchedSession);
        setFeeEstimate(null);
        toast.success('Parking session found');
        return;
      }

      const vehicles = await vehicleExitApi.findVehicleByPlate(plate);
      const matchedVehicle = vehicles.find((item) => compactLicensePlate(item.licensePlate) === plate);

      setSession(null);
      setFeeEstimate(null);
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
    const formattedPlate = formatLicensePlate(plate);
    setLicensePlateState(formattedPlate);
    await searchSessionByPlate(formattedPlate);
  };

  const handleEstimateFee = async () => {
    if (!session) {
      toast.error('No parking session selected');
      return;
    }

    try {
      setIsEstimatingFee(true);
      const estimate = await vehicleExitApi.estimateFee(session.id);
      setFeeEstimate(estimate);
      setSession(estimate.session);
      toast.success('Current parking fee updated');
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to estimate parking fee'
        : 'Failed to estimate parking fee';

      toast.error(message);
    } finally {
      setIsEstimatingFee(false);
    }
  };

  const handleCreatePaymentLink = async () => {
    if (!session) {
      toast.error('No parking session selected');
      return;
    }

    if (paymentMethod === 'CASH') {
      toast.warning('Choose Banking or E-wallet to create a PayOS payment link');
      return;
    }

    try {
      setIsCreatingPaymentLink(true);
      const result = await vehicleExitApi.createPaymentLink({
        id: session.id,
        paymentMethod,
      });

      setFeeEstimate(result);
      setSession(result.session);

      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }

      toast.success('No online payment required for this session');
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to create payment link'
        : 'Failed to create payment link';

      toast.error(message);
    } finally {
      setIsCreatingPaymentLink(false);
    }
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

      toast.success('Vehicle checked out successfully');
      setSession(null);
      setFeeEstimate(null);
      setLicensePlateState('');
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
    isEstimatingFee,
    isCreatingPaymentLink,
    feeEstimate,
    handlePlateDetected,
    handleSearchSession,
    handleEstimateFee,
    handleCreatePaymentLink,
    handleCheckout,
  };
}
