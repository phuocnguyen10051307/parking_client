import { Car, CarFront, Bike, MoreVertical } from 'lucide-react';

const sessions = [
  {
    plate: 'ABC-1234',
    vehicle: 'Sedan',
    entry: 'Oct 24, 08:30 AM',
    duration: '08h 45m',
    fee: '$124.00',
    status: 'OVERDUE',
  },
  {
    plate: 'XYZ-9876',
    vehicle: 'EV Sedan',
    entry: 'Oct 24, 11:15 AM',
    duration: '02h 10m',
    fee: '$32.00',
    status: 'PARKED',
  },
  {
    plate: 'SUV-4455',
    vehicle: 'SUV',
    entry: 'Oct 24, 12:45 PM',
    duration: '00h 40m',
    fee: '$12.50',
    status: 'PARKED',
  },
  {
    plate: 'JKD-1102',
    vehicle: 'Sedan',
    entry: 'Oct 24, 07:00 AM',
    duration: '04h 15m',
    fee: '$45.00',
    status: 'EXITED',
  },
  {
    plate: 'RES-0091',
    vehicle: 'Bike',
    entry: 'Oct 24, 02:00 PM',
    duration: 'Scheduled',
    fee: '$0.00',
    status: 'RESERVED',
  },
];

export function ParkingSessionTable() {
  const renderStatus = (status: string) => {
    const colors = {
      OVERDUE: 'bg-red-100 text-red-700',
      PARKED: 'bg-green-100 text-green-700',
      EXITED: 'bg-slate-200 text-slate-600',
      RESERVED: 'bg-orange-100 text-orange-700',
    };

    return (
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          colors[status as keyof typeof colors]
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-6 text-left">Plate ID</th>
            <th className="text-left">Vehicle Type</th>
            <th className="text-left">Entry Time</th>
            <th className="text-left">Duration</th>
            <th className="text-left">Current Fee</th>
            <th className="text-left">Status</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <tr key={session.plate} className="border-t">
              <td className="p-6 font-semibold">{session.plate}</td>

              <td>
                <div className="flex items-center gap-2">
                  {session.vehicle.includes('SUV') && <Car />}
                  {session.vehicle.includes('Bike') && <Bike />}
                  {!session.vehicle.includes('SUV') && !session.vehicle.includes('Bike') && (
                    <CarFront />
                  )}

                  {session.vehicle}
                </div>
              </td>

              <td>{session.entry}</td>

              <td>{session.duration}</td>

              <td className="font-semibold text-blue-900">{session.fee}</td>

              <td>{renderStatus(session.status)}</td>

              <td>
                <div className="flex items-center gap-4">
                  <button className="rounded-lg bg-blue-900 px-4 py-2 text-white">
                    View Details
                  </button>

                  <MoreVertical size={18} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t p-6">
        <p className="text-sm text-slate-500">Showing 5 of 142 sessions</p>

        <div className="flex gap-2">
          <button className="h-10 w-10 rounded-lg border">1</button>

          <button className="h-10 w-10 rounded-lg border">2</button>

          <button className="h-10 w-10 rounded-lg border">3</button>
        </div>
      </div>
    </div>
  );
}
