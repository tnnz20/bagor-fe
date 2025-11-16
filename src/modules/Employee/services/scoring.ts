import ApiClient from '@/api/axios';
import type { BaseApi } from '@/types';

import type { ScoringDetail, StartScoringPayload, StartScoringResponse } from '@/types/scoring';

export const StartScoring = async (payload: StartScoringPayload): Promise<BaseApi<StartScoringResponse>> => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const requestPayload = {
    ...payload,
    year: currentYear,
    quarter: currentMonth >= 0 && currentMonth <= 5 ? 1 : 2,
  };

  const res = await ApiClient.post<BaseApi>(`/survey-sessions/start`, requestPayload);
  return res.data;
};

export const GetScoringStatus = async (slugParam: string): Promise<BaseApi<ScoringDetail>> => {
  const res = await ApiClient.get<BaseApi<ScoringDetail>>(`/survey-sessions/${slugParam}`);
  return res.data;
};

export const MarkScoringAsComplete = async (slugParam: string): Promise<BaseApi> => {
  const res = await ApiClient.put<BaseApi>(`/survey-sessions/${slugParam}/complete`);
  return res.data;
};
