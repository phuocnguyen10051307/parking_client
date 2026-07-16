import { Bike, Car, Filter, Truck } from 'lucide-react';

type Props = {
  statusFilter: string | null;
  vehicleFilter: string | null;
  onStatusChange: (status: string | null) => void;
  onVehicleChange: (vehicle: string | null) => void;
};

const VEHICLE_BTNS = [
  { key: null, label: 'All', icon: null },
  { key: 'car', label: '', icon: Car },
  { key: 'bike', label: '', icon: Bike },
  { key: 'truck', label: '', icon: Truck },
] as const;

const STATUS_BTNS = [
  { key: 'available', label: 'Available', className: 'border-emerald-500 text-emerald-600' },
  { key: 'occupied', label: 'Occupied', className: 'border-blue-900 text-blue-900' },
  { key: 'reserved', label: 'Reserved', className: 'border-amber-500 text-amber-500' },
  { key: 'maintenance', label: 'Maintenance', className: 'border-slate-400 text-slate-500' },
] as const;

export function SlotFilterBar({
  statusFilter,
  vehicleFilter,
  onStatusChange,
  onVehicleChange,
}: Props) {
  return (
    <div className="mb-8 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-6">
        {/* Filter loại xe */}
        <div className="flex items-center gap-3">
          <Filter size={16} />

          <span className="text-xs font-bold uppercase text-slate-500">Vehicle Type</span>

          {VEHICLE_BTNS.map((btn) => {
            const isActive = vehicleFilter === btn.key;
            const Icon = btn.icon;

            return (
              <button
                key={btn.key ?? 'all'}
                onClick={() => onVehicleChange(btn.key)}
                className={`rounded-lg p-2 ${isActive ? 'bg-blue-900 text-white' : 'bg-slate-100'}`}
              >
                {Icon ? <Icon size={16} /> : btn.label}
              </button>
            );
          })}
        </div>

        {/* Filter trạng thái */}
        <div className="flex flex-wrap gap-2">
          {STATUS_BTNS.map((btn) => {
            const isActive = statusFilter === btn.key;

            return (
              <button
                key={btn.key}
                onClick={() => onStatusChange(isActive ? null : btn.key)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  btn.className
                } ${isActive ? 'bg-opacity-20 ring-2 ring-offset-1' : 'bg-transparent'}`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
