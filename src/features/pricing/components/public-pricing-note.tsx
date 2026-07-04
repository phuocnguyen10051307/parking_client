import { Clock3, ReceiptText } from 'lucide-react';

import { formatVnd } from '@/lib/pricing';

import type { PricingPolicy } from '../types/pricing';

type Props = {
  pricing: PricingPolicy;
};

export function PublicPricingNote({ pricing }: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-blue-900">Pricing Notes</h2>

      <div className="mt-6 space-y-6">
        <div className="flex gap-3">
          <Clock3 className="mt-1 text-blue-900" size={18} />

          <div>
            <p className="font-medium">Grace Period</p>

            <p className="text-sm text-slate-600">
              Vehicles leaving within {pricing.gracePeriodMinutes} minutes will not be charged.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <ReceiptText className="mt-1 text-blue-900" size={18} />

          <div>
            <p className="font-medium">Lost Ticket Fee</p>

            <p className="text-sm text-slate-600">{formatVnd(pricing.lostTicketFee)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
