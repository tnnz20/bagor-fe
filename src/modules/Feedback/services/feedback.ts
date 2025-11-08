import ApiClient from '@/api/axios';
import type { BaseApi } from '@/types';

import type { FeedbackSubmission } from '@/types/feedback';

export const createFeedback = async (feedbackData: FeedbackSubmission): Promise<BaseApi> => {
  const res = await ApiClient.post<BaseApi>('/feedbacks', feedbackData);
  return res.data;
};
