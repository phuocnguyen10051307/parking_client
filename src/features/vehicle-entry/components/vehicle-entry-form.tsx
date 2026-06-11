import { Car } from 'lucide-react';

export function VehicleEntryForm() {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3 border-b pb-4">
        <Car className="text-blue-900" />

        <h2 className="text-2xl font-semibold text-blue-900">Vehicle Information</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm text-slate-500">License Plate Number</label>

          <input
            placeholder="ABC-1234"
            className="w-full rounded-xl bg-slate-100 p-4 text-3xl font-bold tracking-[0.2em]"
          />

          <p className="mt-2 text-sm italic text-slate-400">
            Standard or specialized formats supported.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select className="rounded-xl bg-slate-100 p-3">
            <option>Sedan</option>
            <option>SUV</option>
            <option>EV</option>
          </select>

          <select className="rounded-xl bg-slate-100 p-3">
            <option>North Main Entrance</option>
          </select>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="font-semibold text-blue-900">Pre-registration Check</p>

          <p className="mt-1 text-sm text-slate-600">
            This vehicle is not in the system. New guest profile will be created.
          </p>
        </div>
      </div>
    </section>
  );
}
