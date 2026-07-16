import { Pencil } from 'lucide-react';

import { formatMinutesAsTime, formatVnd } from '@/lib/pricing';

import type { PricingPolicy } from '../types/pricing';

type Props = {
  data: PricingPolicy[];
  onEdit?: (pricing: PricingPolicy) => void;
};

export function PricingTable({ data, onEdit }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h3 className="text-xl font-semibold">Detailed Pricing Rules</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="bg-slate-50 text-left text-sm text-slate-600">
            <tr>
              <th className="p-4">Policy</th>
              <th className="py-4">Monthly</th>
              <th className="py-4">Daytime</th>
              <th className="py-4">Evening</th>
              <th className="py-4">Overnight</th>
              <th className="py-4">Status</th>
              <th className="py-4 pr-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t align-top text-sm text-slate-700">
                <td className="p-4">
                  <div className="font-medium text-slate-900">{item.name}</div>
                  <div className="text-xs text-slate-500">{item.vehicleType}</div>
                </td>
                <td className="py-4">{formatVnd(item.monthlyFee)}</td>
                <td className="py-4 pr-4">
                  {formatMinutesAsTime(item.daytimeStartMinutes)} - {formatMinutesAsTime(item.daytimeEndMinutes)}
                  <div className="text-xs text-slate-500">
                    {formatVnd(item.daytimeBlockFee)} / {item.blockDurationMinutes / 60} hours
                  </div>
                </td>
                <td className="py-4 pr-4">
                  {formatMinutesAsTime(item.eveningStartMinutes)} - {formatMinutesAsTime(item.eveningEndMinutes)}
                  <div className="text-xs text-slate-500">
                    {formatVnd(item.eveningBlockFee)} / {item.blockDurationMinutes / 60} hours
                  </div>
                </td>
                <td className="py-4 pr-4">{formatVnd(item.overnightFlatFee)}</td>
                <td className="py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      item.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <button
                    type="button"
                    onClick={() => onEdit?.(item)}
                    className="flex items-center gap-2 rounded-lg border px-3 py-2 text-blue-900"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
