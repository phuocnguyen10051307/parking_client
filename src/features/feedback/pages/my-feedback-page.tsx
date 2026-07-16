import { Link } from 'react-router-dom';

import { FeedbackCard } from '../components/feedback-card';
import { useFeedbacks } from '../hooks/use-feedbacks';

export default function MyFeedbackPage() {
  const { feedbacks, loading } = useFeedbacks();

  if (loading) {
    return <p>Loading feedbacks...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-blue-900">My Feedbacks</h1>

          <p className="mt-2 text-slate-500">Manage your submitted feedback and support requests</p>
        </div>

        {/* Nút tạo feedback */}
        <Link
          to="/user/create-feedback"
          className="rounded-xl bg-blue-900 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-blue-800"
        >
          Create Feedback
        </Link>
      </div>

      {/* Danh sách feedback */}
      {feedbacks.length > 0 ? (
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <p className="text-slate-500">No feedback submitted yet.</p>
        </div>
      )}
    </div>
  );
}
