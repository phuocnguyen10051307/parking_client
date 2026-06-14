import type { Transaction } from '../types/report';

type Props = {
  data: Transaction[];
};

export function TransactionTable({ data }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>
      </div>

      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">Plate</th>
            <th>Vehicle</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-4">{item.plate}</td>
              <td>{item.vehicleType}</td>
              <td>${item.amount}</td>
              <td>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    item.status === 'Paid'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
