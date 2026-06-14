import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { pricingData } from '../data/pricing-data';
import { PricingCard } from '../components/pricing-card';
import { PricingTable } from '../components/pricing-table';
import { FeeCalculator } from '../components/fee-calculator';
import { PricingNote } from '../components/pricing-note';

export default function PricingPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-3xl font-semibold text-blue-900">Pricing Management</div>

          <p className="mt-2 text-slate-500">Configure parking fees and pricing policies.</p>
        </div>

        <button className="rounded-xl bg-blue-900 px-5 py-3 text-white">
          Add New Pricing Rule
        </button>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {pricingData.map((item) => (
          <PricingCard key={item.id} pricing={item} />
        ))}
      </div>

      {/* Table + Calculator */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PricingTable data={pricingData} />
        </div>

        <FeeCalculator />
      </div>

      {/* Note */}
      <div className="mt-8">
        <PricingNote />
      </div>
    </DashboardLayout>
  );
}
