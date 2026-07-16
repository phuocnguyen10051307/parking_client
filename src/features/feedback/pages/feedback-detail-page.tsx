import { CalendarDays, MessageSquare, UserRound, Clock3 } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { feedbackApi } from '../api/feedback-api';
import { useFeedbackDetail } from '../hooks/use-feedback-detail';

export default function FeedbackDetailPage() {
  const { id = '' } = useParams();

  const { feedback, loading, setFeedback } = useFeedbackDetail(id);

  const updateStatus = async (status: string) => {
    const updatedFeedback = await feedbackApi.update(id, { status });
    setFeedback(updatedFeedback);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-red-100 text-red-700';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-700';
      case 'RESOLVED':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading feedback...</p>
      </DashboardLayout>
    );
  }

  if (!feedback) {
    return (
      <DashboardLayout>
        <p>Feedback not found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-blue-900">Feedback Detail</h1>
            <p className="mt-2 text-slate-500">Review and process customer support feedback</p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
              feedback.status
            )}`}
          >
            {feedback.status}
          </span>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-6">
          <SummaryCard icon={<MessageSquare size={18} />} title="Category" value={feedback.title} />

          <SummaryCard icon={<Clock3 size={18} />} title="Current Status" value={feedback.status} />

          <SummaryCard
            icon={<CalendarDays size={18} />}
            title="Created At"
            value={new Date(feedback.createdAt).toLocaleString()}
          />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-2 gap-6">
          {/* Feedback content */}
          <InfoCard title="Feedback Content" icon={<MessageSquare size={18} />}>
            <p className="leading-7 text-slate-700">{feedback.content}</p>
          </InfoCard>

          {/* Customer */}
          <InfoCard title="Customer Information" icon={<UserRound size={18} />}>
            <InfoRow label="Full Name" value={feedback.user?.fullName} />
            <InfoRow label="Email" value={feedback.user?.email} />
            <InfoRow label="Phone" value={feedback.user?.phone} />
          </InfoCard>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-end gap-4 rounded-2xl border bg-white p-5 shadow-sm">
          {feedback.status !== 'IN_PROGRESS' && (
            <button
              onClick={() => updateStatus('IN_PROGRESS')}
              className="rounded-xl bg-yellow-500 px-5 py-3 font-medium text-white transition hover:bg-yellow-600"
            >
              Mark In Progress
            </button>
          )}

          {feedback.status !== 'RESOLVED' && (
            <button
              onClick={() => updateStatus('RESOLVED')}
              className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
            >
              Resolve Feedback
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

/* Summary card */
function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-sm">{title}</span>
      </div>

      <p className="font-semibold text-slate-800">{value}</p>
    </div>
  );
}

/* Info card */
function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        {icon}
        <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
}

/* Row */
function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value || '-'}</span>
    </div>
  );
}
