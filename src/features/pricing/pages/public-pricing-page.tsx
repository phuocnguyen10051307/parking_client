import { useEffect, useState } from 'react';

import { pricingApi } from '../api/pricing-api';
import { PublicPricingCard } from '../components/public-pricing-card';
import { PublicPricingFilter } from '../components/public-pricing-filter';
import { PublicPricingNote } from '../components/public-pricing-note';
import type { PricingPolicy } from '../types/pricing';

export default function PublicPricingPage() {
  // Loading
  const [loading, setLoading] = useState(false);

  // Loại xe đang chọn
  const [vehicleType, setVehicleType] = useState('');

  // Chính sách giá
  const [policy, setPolicy] = useState<PricingPolicy | null>(null);

  useEffect(() => {
    // Chưa chọn loại xe thì không gọi API
    if (!vehicleType) {
      return;
    }

    const loadPricing = async () => {
      try {
        setLoading(true);

        const data = await pricingApi.getActivePolicy(vehicleType);

        setPolicy(data);
      } catch (error) {
        console.error(error);

        setPolicy(null);
      } finally {
        setLoading(false);
      }
    };

    void loadPricing();
  }, [vehicleType]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Parking Pricing</h1>

        <p className="mt-2 text-slate-500">View parking pricing by vehicle type.</p>
      </div>

      {/* Bộ lọc */}
      <PublicPricingFilter
        value={vehicleType}
        onChange={(value) => {
          setVehicleType(value);

          // Reset dữ liệu khi đổi loại xe
          setPolicy(null);
        }}
      />

      {/* Loading */}
      {loading && (
        <div className="rounded-3xl border bg-white p-10 text-center text-slate-500">
          Loading pricing...
        </div>
      )}

      {/* Chưa chọn loại xe */}
      {!loading && vehicleType === '' && (
        <div className="rounded-3xl border border-dashed bg-white p-12 text-center">
          <h3 className="text-xl font-semibold text-slate-700">No Vehicle Type Selected</h3>

          <p className="mt-3 text-slate-500">
            Please select a vehicle type to view the parking pricing policy.
          </p>
        </div>
      )}

      {/* Có pricing */}
      {!loading && vehicleType !== '' && policy && (
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <PublicPricingCard pricing={policy} />

          <PublicPricingNote pricing={policy} />
        </div>
      )}

      {/* Không có pricing */}
      {!loading && vehicleType !== '' && !policy && (
        <div className="rounded-3xl border border-dashed bg-white p-12 text-center">
          <h3 className="text-xl font-semibold text-slate-700">No Pricing Policy Found</h3>

          <p className="mt-3 text-slate-500">
            There is currently no active pricing policy for the selected vehicle type.
          </p>
        </div>
      )}
    </div>
  );
}
