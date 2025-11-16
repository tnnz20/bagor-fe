import ApiClient from '@/api/axios';
import type { BaseApi } from '@/types';

import type { StartScoringPayload, StartScoringResponse } from '@/types/scoring';

export const StartScoring = async (payload: StartScoringPayload): Promise<BaseApi<StartScoringResponse>> => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  payload.year = currentYear;
  payload.quarter = currentMonth >= 0 && currentMonth <= 6 ? 1 : 2;

  const res = await ApiClient.post<BaseApi>(`/scores/start`, payload);
  return res.data;
};

export const MarkScoringAsComplete = async (slugParam: string): Promise<BaseApi> => {
  const res = await ApiClient.put<BaseApi>(`scores/start/${slugParam}`);
  return res.data;
};
