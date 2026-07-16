import { useEffect, useState } from 'react';
import { feedbackApi } from '../api/feedback-api';
import type { Feedback } from '../types/feedback.type';

export function useFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  // Load danh sách feedback
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await feedbackApi.getAll();

        setFeedbacks(data);
      } catch {
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return {
    feedbacks,
    loading,
    setFeedbacks,
  };
}
