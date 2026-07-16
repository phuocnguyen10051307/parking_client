import { Bike, CalendarClock, Car, CheckCircle2, Clock3, Truck, Wrench } from 'lucide-react';

import type { Slot } from '../types/slot.type';

type Props = {
  slot: Slot;
  onClick: () => void;
};

export function SlotCard({ slot, onClick }: Props) {
  const getBorderColor = () => {
    if (slot.status === 'available') return 'border-emerald-500';
    if (slot.status === 'occupied') return 'border-blue-900';
    if (slot.status === 'reserved') return 'border-amber-500';

    return 'border-slate-400';
  };

  const renderVehicleIcon = () => {
    if (slot.vehicleType === 'bike') return <Bike size={38} />;
    if (slot.vehicleType === 'truck') return <Truck size={38} />;

    return <Car size={38} />;
  };

  const renderStatusIcon = () => {
    if (slot.status === 'available') return <CheckCircle2 size={16} />;
    if (slot.status === 'occupied') return <Clock3 size={16} />;
    if (slot.status === 'reserved') return <CalendarClock size={16} />;

    return <Wrench size={16} />;
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl border-b-4 bg-white p-4 shadow-sm transition hover:shadow-md ${getBorderColor()}`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-bold text-blue-900">{slot.id}</span>

        {renderStatusIcon()}
      </div>

      {/* Icon xe */}
      <div className="flex justify-center py-5 text-slate-400">{renderVehicleIcon()}</div>

      {/* Nội dung */}
      <div className="text-center">
        {slot.status === 'occupied' && slot.plate ? (
          <>
            <p className="font-semibold text-slate-900">{slot.plate}</p>

            <p className="text-xs text-slate-500">Active: {slot.duration ?? '-'}</p>
          </>
        ) : (
          <p className="text-xs font-semibold uppercase text-slate-500">{slot.status}</p>
        )}
      </div>
    </div>
  );
}
