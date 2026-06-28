type Props = {
  totalFee: number | null;
  onCheckout: () => void;
};

export function PaymentSummaryCard({ totalFee, onCheckout }: Props) {
  return (
    <div className="rounded-3xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-2xl font-semibold">Payment Summary</h2>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex justify-between border-t pt-4">
          <span className="text-2xl font-bold">Total</span>

          <span className="text-4xl font-bold text-blue-900">${totalFee ?? 0}</span>
        </div>

        <button
          onClick={onCheckout}
          className="mt-4 w-full rounded-xl bg-blue-900 py-3 font-semibold text-white"
        >
          Complete Exit & Print
        </button>
      </div>
    </div>
  );
}
