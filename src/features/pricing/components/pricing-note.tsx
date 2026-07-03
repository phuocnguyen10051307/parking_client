import { formatVnd } from '@/lib/pricing';

import type { PricingPolicy } from '../types/pricing';

type Props = {
  policy?: PricingPolicy | null;
};

export function PricingNote({ policy }: Props) {
  if (!policy) {
    return null;
  }

  return (
    <div className="rounded-3xl border bg-slate-50 p-6">
      <h4 className="font-semibold">Pricing Policy Note</h4>

      <p className="mt-2 text-sm text-slate-600">
        Car monthly parking is {formatVnd(policy.monthlyFee)}. Per-visit pricing is {formatVnd(policy.daytimeBlockFee)}
        {' '}every 2 hours from 06:00 - 17:29, {formatVnd(policy.eveningBlockFee)} every 2 hours from 18:00 -
        {' '}23:59, and {formatVnd(policy.overnightFlatFee)} from 00:00 - 05:59.
      </p>
    </div>
  );
}
