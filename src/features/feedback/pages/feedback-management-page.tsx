import { MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { FeedbackCard } from '../components/feedback-card';
import { useFeedbacks } from '../hooks/use-feedbacks';

export default function FeedbackManagementPage() {
  const { feedbacks, loading, setFeedbacks } = useFeedbacks();

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading feedbacks...</p>
      </DashboardLayout>
    );
  }

  const openCount = feedbacks.filter((item) => item.status === 'OPEN').length;
  const inProgressCount = feedbacks.filter((item) => item.status === 'IN_PROGRESS').length;
  const resolvedCount = feedbacks.filter((item) => item.status === 'RESOLVED').length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-blue-900">Feedback Management</h1>
          <p className="mt-2 text-slate-500">Review and manage customer feedback tickets</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <StatCard title="Open Tickets" value={openCount} icon={<AlertCircle size={18} />} />

          <StatCard
            title="In Progress"
            value={inProgressCount}
            icon={<MessageSquare size={18} />}
          />

          <StatCard title="Resolved" value={resolvedCount} icon={<CheckCircle2 size={18} />} />
        </div>

        {/* List */}
        {feedbacks.length > 0 ? (
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <FeedbackCard
                key={feedback.id}
                feedback={feedback}
                isStaff={true}
                onUpdated={(updated) =>
                  setFeedbacks((prev) =>
                    prev.map((item) => (item.id === updated.id ? updated : item))
                  )
                }
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
            <p className="text-slate-500">No feedback available right now.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-sm">{title}</span>
      </div>

      <p className="text-4xl font-bold text-blue-900">{value}</p>
    </div>
  );
}
