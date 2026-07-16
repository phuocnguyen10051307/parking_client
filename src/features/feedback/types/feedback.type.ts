export type FeedbackStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

export type Feedback = {
  id: string;
  userId: string;
  title: string;
  content: string;
  status: FeedbackStatus;
  createdAt: string;

  user?: {
    fullName: string;
    email: string;
    phone: string;
  };
};
