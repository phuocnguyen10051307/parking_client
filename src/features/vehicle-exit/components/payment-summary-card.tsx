import { calculateEstimatedParkingFee, formatVnd, getDefaultCarPricingPolicy } from '@/lib/pricing';
import type { PricingPolicy } from '@/features/pricing/types/pricing';

import type { ExitPayment } from '../types/vehicle-exit.type';

type Props = {
  entryTime: string;
  totalFee: number | null;
  vehicleType?: string;
  pricingPolicy?: PricingPolicy | null;
  payment?: ExitPayment | null;
  paymentMethod: 'CASH' | 'BANKING' | 'E_WALLET';
  onPaymentMethodChange: (method: 'CASH' | 'BANKING' | 'E_WALLET') => void;
  isCheckingOut?: boolean;
  onCheckout: () => void;
};

export function PaymentSummaryCard({
  entryTime,
  totalFee,
  vehicleType,
  pricingPolicy,
  payment,
  paymentMethod,
  onPaymentMethodChange,
  isCheckingOut = false,
  onCheckout,
}: Props) {
  const activePolicy = pricingPolicy ?? getDefaultCarPricingPolicy();
  const displayedFee =
    totalFee == null ? calculateEstimatedParkingFee(entryTime, new Date(), vehicleType, activePolicy) : Number(totalFee);

  return (
    <div className="rounded-3xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-2xl font-semibold">Payment Summary</h2>
      </div>

      <div className="space-y-4 p-6">
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          <div>Monthly parking: {formatVnd(activePolicy.monthlyFee)}</div>
          <div>Daytime: {formatVnd(activePolicy.daytimeBlockFee)} / 2 hours</div>
          <div>Evening: {formatVnd(activePolicy.eveningBlockFee)} / 2 hours</div>
          <div>Overnight: {formatVnd(activePolicy.overnightFlatFee)}</div>
        </div>

        <label className="block text-sm text-slate-600">
          Payment method
          <select
            value={paymentMethod}
            onChange={(event) => onPaymentMethodChange(event.target.value as 'CASH' | 'BANKING' | 'E_WALLET')}
            className="mt-2 w-full rounded-xl border px-3 py-3"
          >
            <option value="CASH">Cash</option>
            <option value="BANKING">Banking</option>
            <option value="E_WALLET">E-wallet</option>
          </select>
        </label>

        <div className="flex justify-between border-t pt-4">
          <span className="text-2xl font-bold">Total</span>

          <span className="text-4xl font-bold text-blue-900">{formatVnd(displayedFee)}</span>
        </div>

        {payment ? (
          <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
            Paid via {payment.method} at {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : '-'}
          </div>
        ) : null}

        {totalFee == null ? <p className="text-sm text-slate-500">Estimated until checkout.</p> : null}

        <button
          onClick={onCheckout}
          disabled={isCheckingOut}
          className="mt-4 w-full rounded-xl bg-blue-900 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isCheckingOut ? 'Completing Exit...' : 'Complete Exit & Record Payment'}
        </button>
      </div>
    </div>
  );
}
