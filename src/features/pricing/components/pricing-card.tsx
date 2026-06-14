import { Bike, Car, CarFront, Truck, Pencil } from 'lucide-react';

import type { Pricing } from '../types/pricing';

type Props = {
  pricing: Pricing;
};

export function PricingCard({ pricing }: Props) {
  const renderIcon = () => {
    switch (pricing.icon) {
      case 'Bike':
        return <Bike size={24} />;
      case 'Truck':
        return <Truck size={24} />;
      case 'CarFront':
        return <CarFront size={24} />;
      default:
        return <Car size={24} />;
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-900">{renderIcon()}</div>

          <h3 className="font-semibold">{pricing.vehicleType}</h3>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
          {pricing.status}
        </span>
      </div>

      {/* Rates */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Hourly</span>
          <span>${pricing.hourlyRate}</span>
        </div>

        <div className="flex justify-between">
          <span>Daily</span>
          <span>${pricing.dailyRate}</span>
        </div>

        <div className="flex justify-between">
          <span>Monthly</span>
          <span>${pricing.monthlyRate}</span>
        </div>
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border py-2 text-blue-900">
        <Pencil size={16} />
        Edit Rates
      </button>
    </div>
  );
}
