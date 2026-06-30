type Props = {
  entryTime: string;
  totalFee: number | string | null;
  vehicleType?: string;
  isCheckingOut?: boolean;
  onCheckout: () => void;
};

const hourlyRates: Record<string, number> = {
  MOTORBIKE: 0.5,
  CAR: 2,
  BICYCLE: 0.25,
  ELECTRIC_BIKE: 1.5,
};

const estimateFee = (entryTime: string, vehicleType = 'CAR') => {
  const parkedMinutes = Math.max(0, Math.ceil((Date.now() - new Date(entryTime).getTime()) / 60000));

  if (parkedMinutes <= 15) {
    return 0;
  }

  const billableHours = Math.max(1, Math.ceil(parkedMinutes / 60));
  const hourlyRate = hourlyRates[vehicleType] ?? hourlyRates.CAR;

  return Number((billableHours * hourlyRate).toFixed(2));
};

export function PaymentSummaryCard({
  entryTime,
  totalFee,
  vehicleType,
  isCheckingOut = false,
  onCheckout,
}: Props) {
  const displayedFee = totalFee == null ? estimateFee(entryTime, vehicleType) : Number(totalFee);

  return (
    <div className="rounded-3xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-2xl font-semibold">Payment Summary</h2>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex justify-between border-t pt-4">
          <span className="text-2xl font-bold">Total</span>

          <span className="text-4xl font-bold text-blue-900">${displayedFee}</span>
        </div>

        {totalFee == null ? <p className="text-sm text-slate-500">Estimated until checkout.</p> : null}

        <button
          onClick={onCheckout}
          disabled={isCheckingOut}
          className="mt-4 w-full rounded-xl bg-blue-900 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isCheckingOut ? 'Completing Exit...' : 'Complete Exit & Print'}
        </button>
      </div>
    </div>
  );
}
