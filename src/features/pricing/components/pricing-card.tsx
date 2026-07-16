import { Car, Pencil } from 'lucide-react';

import { formatMinutesAsTime, formatVnd } from '@/lib/pricing';

import type { PricingPolicy } from '../types/pricing';

type Props = {
  pricing: PricingPolicy;
  onEdit?: (pricing: PricingPolicy) => void;
};

export function PricingCard({ pricing, onEdit }: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-900">
            <Car size={24} />
          </div>

          <div>
            <h3 className="font-semibold">{pricing.name}</h3>
            <p className="text-sm text-slate-500">{pricing.vehicleType}</p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs ${
            pricing.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {pricing.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="space-y-3 text-sm text-slate-700">
        <div className="flex justify-between gap-4">
          <span>Monthly fee</span>
          <span className="font-semibold text-slate-950">{formatVnd(pricing.monthlyFee)}</span>
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-3">
          {formatMinutesAsTime(pricing.daytimeStartMinutes)} - {formatMinutesAsTime(pricing.daytimeEndMinutes)}:{' '}
          {formatVnd(pricing.daytimeBlockFee)} / {pricing.blockDurationMinutes / 60} hours
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-3">
          {formatMinutesAsTime(pricing.eveningStartMinutes)} - {formatMinutesAsTime(pricing.eveningEndMinutes)}:{' '}
          {formatVnd(pricing.eveningBlockFee)} / {pricing.blockDurationMinutes / 60} hours
        </div>

        <div className="rounded-2xl bg-amber-50 px-4 py-3 text-amber-900">
          00:00 - 05:59: {formatVnd(pricing.overnightFlatFee)}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onEdit?.(pricing)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border py-2 text-blue-900"
      >
        <Pencil size={16} />
        Edit Policy
      </button>
    </div>
  );
}
