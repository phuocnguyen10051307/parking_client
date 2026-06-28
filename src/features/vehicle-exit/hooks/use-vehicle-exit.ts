import { useState } from 'react';
import { toast } from 'sonner';

import { vehicleExitApi } from '../api/vehicle-exit-api';
import type { ExitSession } from '../types/vehicle-exit.type';

export function useVehicleExit() {
  // State biển số nhập vào
  const [licensePlate, setLicensePlate] = useState('');

  // State session tìm thấy
  const [session, setSession] = useState<ExitSession | null>(null);

  // Search session theo biển số
  const handleSearchSession = async () => {
    try {
      const sessions = await vehicleExitApi.getActiveSessions();

      const matchedSession = sessions.find(
        (s: ExitSession) =>
          s.vehicle.licensePlate.replace(/[-.\s]/g, '').toUpperCase() ===
          licensePlate.replace(/[-.\s]/g, '').toUpperCase()
      );

      if (matchedSession) {
        setSession(matchedSession);
        toast.success('Parking session found');
      } else {
        setSession(null);
        toast.warning('No active parking session found');
      }
    } catch {
      toast.error('Failed to search parking session');
    }
  };

  // Checkout
  const handleCheckout = async () => {
    if (!session) {
      toast.error('No parking session selected');
      return;
    }

    try {
      await vehicleExitApi.checkout(session.id, 'North Exit');

      toast.success('Vehicle checked out successfully');

      // reset state sau checkout
      setSession(null);
      setLicensePlate('');
    } catch {
      toast.error('Failed to check out vehicle');
    }
  };

  return {
    licensePlate,
    setLicensePlate,
    session,
    handleSearchSession,
    handleCheckout,
  };
}
