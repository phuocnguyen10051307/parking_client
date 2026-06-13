export function PaymentSummaryCard() {
  return (
    <div className="rounded-3xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-2xl font-semibold">Payment Summary</h2>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex justify-between">
          <span>Base Parking Fee</span>

          <span>$45.00</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (VAT 5%)</span>

          <span>$2.25</span>
        </div>

        <div className="flex justify-between border-t pt-4">
          <span className="text-2xl font-bold">Total</span>

          <span className="text-4xl font-bold text-blue-900">$47.25</span>
        </div>

        <button className="mt-4 w-full rounded-xl bg-blue-900 py-3 font-semibold text-white">
          Complete Exit & Print
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-xl bg-green-600 py-3 font-semibold text-white">
            Confirm Pay
          </button>

          <button className="rounded-xl bg-slate-200 py-3 font-semibold">Cancel</button>
        </div>
      </div>
    </div>
  );
}
