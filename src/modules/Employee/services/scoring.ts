import ApiClient from '@/api/axios';
import type { BaseApi } from '@/types';

import type { ScoringDetail, StartScoringPayload, SurveySessionResponse } from '@/types/scoring';

export const StartScoring = async (payload: StartScoringPayload): Promise<BaseApi<SurveySessionResponse>> => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const requestPayload = {
    ...payload,
    year: currentYear,
    quarter: currentMonth >= 0 && currentMonth <= 5 ? 1 : 2,
  };

  const res = await ApiClient.post<BaseApi<SurveySessionResponse>>(`/survey-sessions`, requestPayload);
  return res.data;
};

export const GetScoringStatus = async (slugParam: string): Promise<BaseApi<ScoringDetail>> => {
  const res = await ApiClient.get<BaseApi<ScoringDetail>>(`/survey-sessions/${slugParam}`);
  return res.data;
};

export const MarkScoringAsComplete = async (slugParam: string): Promise<BaseApi> => {
  const res = await ApiClient.post<BaseApi>(`/survey-sessions/${slugParam}/completion`);
  return res.data;
};
