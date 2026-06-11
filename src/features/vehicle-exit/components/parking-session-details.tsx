import { CarFront, MapPin } from 'lucide-react';

export function ParkingSessionDetails() {
  return (
    <div className="rounded-3xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-6">
        <h2 className="text-2xl font-semibold text-blue-900">Parking Session Details</h2>

        <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-600">
          Payment Pending
        </span>
      </div>

      <div className="p-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex gap-4">
            <CarFront size={42} />

            <div>
              <p className="text-4xl font-bold text-blue-900">ABC-1234</p>

              <p className="text-slate-500">Standard Sedan • Silver</p>
            </div>
          </div>

          <div className="flex gap-4">
            <MapPin size={42} />

            <div>
              <p className="text-4xl font-bold">L2-B204</p>

              <p className="text-slate-500">Level 2 • Zone B</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t pt-6 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase text-slate-500">Entry Time</p>

            <p className="font-semibold">Oct 24, 08:30 AM</p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">Exit Time</p>

            <p className="font-semibold text-blue-900">Oct 24, 05:45 PM</p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">Duration</p>

            <p className="font-semibold text-green-600">9h 15m</p>
          </div>
        </div>
      </div>
    </div>
  );
}
