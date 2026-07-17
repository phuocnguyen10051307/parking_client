import { calculateEstimatedParkingFee, formatVnd, getDefaultCarPricingPolicy } from '@/lib/pricing';
import type { PricingPolicy } from '@/features/pricing/types/pricing';

import type { ExitFeeEstimate, ExitPayment } from '../types/vehicle-exit.type';

type Props = {
  entryTime: string;
  totalFee: number | null;
  vehicleType?: string;
  pricingPolicy?: PricingPolicy | null;
  payment?: ExitPayment | null;
  feeEstimate?: ExitFeeEstimate | null;
  paymentMethod: 'CASH' | 'BANKING' | 'E_WALLET';
  onPaymentMethodChange: (method: 'CASH' | 'BANKING' | 'E_WALLET') => void;
  isCheckingOut?: boolean;
  isEstimatingFee?: boolean;
  isCreatingPaymentLink?: boolean;
  onEstimateFee: () => void;
  onCreatePaymentLink: () => void;
  onCheckout: () => void;
};

export function PaymentSummaryCard({
  entryTime,
  totalFee,
  vehicleType,
  pricingPolicy,
  payment,
  feeEstimate,
  paymentMethod,
  onPaymentMethodChange,
  isCheckingOut = false,
  isEstimatingFee = false,
  isCreatingPaymentLink = false,
  onEstimateFee,
  onCreatePaymentLink,
  onCheckout,
}: Props) {
  const activePolicy = pricingPolicy ?? getDefaultCarPricingPolicy();
  const displayedFee =
    feeEstimate?.totalFee ??
    (totalFee == null ? calculateEstimatedParkingFee(entryTime, new Date(), vehicleType, activePolicy) : Number(totalFee));

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

        {feeEstimate?.monthlySubscriptionApplied ? (
          <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
            Monthly pass applied. This parking session is free because the pass was already active at check-in.
          </div>
        ) : null}

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
            Payment status: {payment.status}
            <br />
            Method: {payment.method}
            <br />
            Paid at: {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : '-'}
          </div>
        ) : null}

        {feeEstimate ? (
          <p className="text-sm text-slate-500">
            Fee checked at {new Date().toLocaleTimeString()}. For online payment, the amount is frozen once PayOS link is created.
          </p>
        ) : (
          <p className="text-sm text-slate-500">Use Check Current Fee before confirming exit.</p>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={onEstimateFee}
            disabled={isEstimatingFee}
            className="rounded-xl border border-slate-200 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isEstimatingFee ? 'Checking...' : 'Check Current Fee'}
          </button>

          <button
            onClick={onCreatePaymentLink}
            disabled={isCreatingPaymentLink || paymentMethod === 'CASH'}
            className="rounded-xl border border-blue-200 py-3 font-semibold text-blue-900 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreatingPaymentLink ? 'Opening PayOS...' : 'Pay with PayOS'}
          </button>
        </div>

        <button
          onClick={onCheckout}
          disabled={isCheckingOut}
          className="mt-4 w-full rounded-xl bg-blue-900 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isCheckingOut ? 'Completing Exit...' : 'Complete Exit'}
        </button>
      </div>
    </div>
  );
}
