import { useEffect, useState } from 'react';

import { feedbackApi } from '../api/feedback-api';
import type { Feedback } from '../types/feedback.type';

export function useFeedbackDetail(id: string) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await feedbackApi.getById(id);

        setFeedback(data);
      } catch {
        setFeedback(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFeedback();
    }
  }, [id]);

  return {
    feedback,
    loading,
    setFeedback,
  };
}
