import { Pencil, Trash2 } from 'lucide-react';

import type { Pricing } from '../types/pricing';

type Props = {
  data: Pricing[];
};

export function PricingTable({ data }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h3 className="text-xl font-semibold">Detailed Pricing Rules</h3>
      </div>

      <table className="w-full">
        <thead className="bg-slate-50 text-left">
          <tr>
            <th className="p-4">Vehicle</th>
            <th>Hourly</th>
            <th>Daily</th>
            <th>Monthly</th>
            <th>Overtime</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-4">{item.vehicleType}</td>
              <td>${item.hourlyRate}</td>
              <td>${item.dailyRate}</td>
              <td>${item.monthlyRate}</td>
              <td>${item.overtimeRate}/hr</td>

              <td>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                  {item.status}
                </span>
              </td>

              <td>
                <div className="flex gap-2">
                  <Pencil size={16} />

                  <Trash2 size={16} className="text-red-500" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
