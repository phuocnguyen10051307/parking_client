import { useState } from 'react';

export function FeeCalculator() {
  const [rate, setRate] = useState(2);
  const [hours, setHours] = useState(1);

  const total = rate * hours;

  return (
    <div className="rounded-3xl bg-blue-900 p-8 text-white">
      <h3 className="text-2xl font-bold">Fee Calculator</h3>

      <p className="mt-2 text-sm text-blue-100">Quickly estimate parking costs.</p>

      <div className="mt-6 space-y-4">
        <select
          className="w-full rounded-xl bg-white/10 p-3"
          onChange={(e) => setRate(Number(e.target.value))}
        >
          <option value={2}>Car ($2/hr)</option>
          <option value={1.5}>EV ($1.5/hr)</option>
          <option value={0.5}>Bike ($0.5/hr)</option>
          <option value={5}>Truck ($5/hr)</option>
        </select>

        <input
          type="number"
          min={1}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full rounded-xl bg-white/10 p-3"
        />
      </div>

      <div className="mt-8 border-t pt-6">
        <p className="text-sm uppercase text-blue-100">Estimated Fee</p>

        <h2 className="mt-2 text-5xl font-bold">${total.toFixed(2)}</h2>
      </div>
    </div>
  );
}
