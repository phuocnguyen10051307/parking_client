import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { feedbackApi } from '../api/feedback-api';

export default function CreateFeedbackPage() {
  const navigate = useNavigate();

  // State form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Submit tạo feedback
  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);

      await feedbackApi.create({
        title,
        content,
      });

      toast.success('Feedback created successfully');

      // Redirect về my feedback
      navigate('/user/my-feedbacks');
    } catch {
      toast.error('Failed to create feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Create Feedback</h1>

        <p className="mt-2 text-slate-500">Submit your issue or feedback to our parking staff.</p>
      </div>

      {/* Form */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        {/* Title */}
        <div className="mb-5">
          <label className="mb-2 block font-medium">Title</label>

          <input
            type="text"
            placeholder="Enter feedback title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 outline-none"
          />
        </div>

        {/* Content */}
        <div className="mb-5">
          <label className="mb-2 block font-medium">Content</label>

          <textarea
            rows={6}
            placeholder="Describe your issue..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 outline-none"
          />
        </div>

        {/* Action */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-blue-900 px-5 py-3 font-medium text-white transition hover:bg-blue-800 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>
    </div>
  );
}
