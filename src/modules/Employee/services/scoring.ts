import ApiClient from '@/api/axios';
import type { BaseApi } from '@/types';

import { getCurrentPeriod } from '@/lib/utils';

import type { ScoringDetail, StartScoringPayload, SurveySessionResponse } from '@/types/scoring';

export const StartScoring = async (payload: StartScoringPayload): Promise<BaseApi<SurveySessionResponse>> => {
  const { year, quarter } = getCurrentPeriod();

  const requestPayload = {
    ...payload,
    year: year,
    quarter: quarter,
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
