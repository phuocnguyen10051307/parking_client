import { useState } from 'react';

import { calculateEstimatedParkingFee, formatVnd, getDefaultCarPricingPolicy } from '@/lib/pricing';

import type { PricingPolicy } from '../types/pricing';

const getDefaultStartTime = () => {
  const date = new Date();
  date.setMinutes(0, 0, 0);
  return date.toISOString().slice(0, 16);
};

type Props = {
  policy?: PricingPolicy | null;
};

export function FeeCalculator({ policy }: Props) {
  const [entryTime, setEntryTime] = useState(getDefaultStartTime);
  const activePolicy = policy ?? getDefaultCarPricingPolicy();
  const total = calculateEstimatedParkingFee(entryTime, new Date(), activePolicy.vehicleType, activePolicy);

  return (
    <div className="rounded-3xl bg-blue-900 p-8 text-white">
      <h3 className="text-2xl font-bold">Car Fee Calculator</h3>

      <p className="mt-2 text-sm text-blue-100">Estimate fee using the active pricing policy from backend.</p>

      <div className="mt-6 space-y-4">
        <label className="block text-sm text-blue-100">Entry time</label>

        <input
          type="datetime-local"
          value={entryTime}
          onChange={(e) => setEntryTime(e.target.value)}
          className="w-full rounded-xl bg-white/10 p-3"
        />

        <div className="rounded-2xl bg-white/10 p-4 text-sm text-blue-50">
          <div>06:00 - 17:29: {formatVnd(activePolicy.daytimeBlockFee)} / 2 hours</div>
          <div>18:00 - 23:59: {formatVnd(activePolicy.eveningBlockFee)} / 2 hours</div>
          <div>00:00 - 05:59: {formatVnd(activePolicy.overnightFlatFee)}</div>
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <p className="text-sm uppercase text-blue-100">Estimated Fee</p>

        <h2 className="mt-2 text-4xl font-bold">{formatVnd(total)}</h2>
      </div>
    </div>
  );
}
