import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { reportStats, transactions } from '../data/report-data';

import { ReportStatCard } from '../components/report-stat-card';
import { RevenueChart } from '../components/revenue-chart';
import { TrafficChart } from '../components/traffic-chart';
import { TransactionTable } from '../components/transaction-table';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-3xl font-semibold text-blue-900">Reports</div>

          <p className="mt-2 text-slate-500">Analyze parking system performance and revenue.</p>
        </div>

        <button className="rounded-xl bg-blue-900 px-5 py-3 text-white">Export Report</button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {reportStats.map((stat, index) => (
          <ReportStatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <RevenueChart />

        <TrafficChart />
      </div>

      {/* Transactions */}
      <div className="mt-8">
        <TransactionTable data={transactions} />
      </div>
    </DashboardLayout>
  );
}
