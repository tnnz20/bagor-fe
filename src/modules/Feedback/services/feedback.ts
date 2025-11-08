import ApiClient from '@/api/axios';
import type { BaseApi, PaginationMeta } from '@/types';

import type { FeedbackListResponseWithPagination, FeedbackSubmission } from '@/types/feedback';

export const createFeedback = async (feedbackData: FeedbackSubmission): Promise<BaseApi> => {
  const res = await ApiClient.post<BaseApi>('/feedbacks', feedbackData);
  return res.data;
};

export const getFeedbackList = async (
  paginationMeta?: Partial<PaginationMeta>,
  isRead?: boolean
): Promise<BaseApi<FeedbackListResponseWithPagination>> => {
  const params = new URLSearchParams();

  if (paginationMeta?.page) {
    params.append('page', paginationMeta.page.toString());
  }

  if (paginationMeta?.limit) {
    params.append('limit', paginationMeta.limit.toString());
  }

  if (typeof isRead === 'boolean') {
    params.append('is_read', isRead ? 'true' : 'false');
  }

  const queryString = params.toString();
  const url = queryString ? `/feedbacks?${queryString}` : '/feedbacks';

  const res = await ApiClient.get<BaseApi<FeedbackListResponseWithPagination>>(url);
  return res.data;
};

export const markFeedbackAsRead = async (feedbackId: string): Promise<BaseApi> => {
  const res = await ApiClient.put<BaseApi>(`/feedbacks/${feedbackId}`);
  return res.data;
};
