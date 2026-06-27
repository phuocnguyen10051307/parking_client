import { DashboardLayout } from '@/app/layouts/dashboard-layout';

import { FeedbackCard } from '../components/feedback-card';
import { useFeedbacks } from '../hooks/use-feedbacks';

export default function FeedbackPage() {
  const { feedbacks, loading } = useFeedbacks();

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading feedbacks...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-blue-900">Feedback Management</h1>

        <p className="mt-2 text-slate-500">Manage customer feedback and support requests</p>
      </div>

      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <FeedbackCard key={feedback.id} feedback={feedback} />
        ))}
      </div>
    </DashboardLayout>
  );
}
