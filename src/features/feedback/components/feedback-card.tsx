import { CalendarDays, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

import { feedbackApi } from '../api/feedback-api';
import type { Feedback } from '../types/feedback.type';

type Props = {
  feedback: Feedback;
  onUpdated?: (updated: Feedback) => void;
  isStaff?: boolean;
};

export function FeedbackCard({ feedback, onUpdated, isStaff = false }: Props) {
  // Badge màu theo status
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

  // Update status (chỉ staff dùng)
  const handleUpdateStatus = async (e: React.MouseEvent<HTMLButtonElement>, status: string) => {
    e.preventDefault();

    try {
      const updatedFeedback = await feedbackApi.update(feedback.id, { status });

      onUpdated?.(updatedFeedback);
    } catch (error) {
      console.error('Update feedback failed:', error);
    }
  };

  // UI card dùng chung
  const CardContent = (
    <div className="mb-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{feedback.title}</h3>

          {/* User */}
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <UserRound size={14} />
            <span>{feedback.user?.fullName}</span>
          </div>

          {/* Created time */}
          <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
            <CalendarDays size={14} />
            <span>{new Date(feedback.createdAt).toLocaleString()}</span>
          </div>
        </div>

        {/* Status */}
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
            feedback.status
          )}`}
        >
          {feedback.status}
        </span>
      </div>

      {/* Content */}
      <p className="line-clamp-2 text-sm text-slate-600">{feedback.content}</p>

      {/* Staff actions */}
      {isStaff && (
        <div className="mt-4 flex items-center justify-end gap-3">
          {feedback.status !== 'IN_PROGRESS' && (
            <button
              onClick={(e) => handleUpdateStatus(e, 'IN_PROGRESS')}
              className="rounded-lg border px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Mark In Progress
            </button>
          )}

          {feedback.status !== 'RESOLVED' && (
            <button
              onClick={(e) => handleUpdateStatus(e, 'RESOLVED')}
              className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
            >
              Resolve
            </button>
          )}
        </div>
      )}
    </div>
  );

  // Staff click được -> vào detail
  if (isStaff) {
    return <Link to={`/feedbacks/${feedback.id}`}>{CardContent}</Link>;
  }

  // User chỉ xem list, không click
  return CardContent;
}
