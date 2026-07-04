import { Car } from 'lucide-react';

import { formatMinutesAsTime, formatVnd } from '@/lib/pricing';

import type { PricingPolicy } from '../types/pricing';

type Props = {
  pricing: PricingPolicy;
};

export function PublicPricingCard({ pricing }: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-3 text-blue-900">
          <Car size={24} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">{pricing.name}</h2>

          <p className="text-slate-500">{pricing.vehicleType}</p>
        </div>
      </div>

      {/* Monthly */}
      <div className="mb-5 rounded-2xl bg-blue-50 p-5">
        <p className="text-sm text-slate-500">Monthly Fee</p>

        <p className="mt-1 text-3xl font-bold text-blue-900">{formatVnd(pricing.monthlyFee)}</p>
      </div>

      {/* Pricing */}
      <div className="space-y-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="font-semibold">
            {formatMinutesAsTime(pricing.daytimeStartMinutes)} -{' '}
            {formatMinutesAsTime(pricing.daytimeEndMinutes)}
          </p>

          <p className="text-slate-600">
            {formatVnd(pricing.daytimeBlockFee)}
            {' / '}
            {pricing.blockDurationMinutes / 60} hours
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="font-semibold">
            {formatMinutesAsTime(pricing.eveningStartMinutes)} -{' '}
            {formatMinutesAsTime(pricing.eveningEndMinutes)}
          </p>

          <p className="text-slate-600">
            {formatVnd(pricing.eveningBlockFee)}
            {' / '}
            {pricing.blockDurationMinutes / 60} hours
          </p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4">
          <p className="font-semibold">00:00 - 05:59</p>

          <p className="text-amber-900">{formatVnd(pricing.overnightFlatFee)}</p>
        </div>
      </div>
    </div>
  );
}
