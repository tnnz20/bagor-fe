import ApiClient from '@/api/axios';
import type { BaseApi } from '@/types';

import type { NominatePayload, NominationDetail } from '@/types/ranking';

export const createNomination = async (payload: NominatePayload): Promise<BaseApi> => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const requestPayload: NominatePayload = {
    ...payload,
    year: currentYear,
    quarter: currentMonth >= 0 && currentMonth <= 5 ? 1 : 2,
  };

  const res = await ApiClient.post<BaseApi>('/rankings/nominations', requestPayload);
  return res.data;
};

export const getNominations = async (): Promise<BaseApi<NominationDetail[]>> => {
  const queryParams = new URLSearchParams();

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  if (currentMonth >= 0 && currentMonth <= 5) {
    queryParams.append('quarter', '1');
  } else {
    queryParams.append('quarter', '2');
  }

  queryParams.append('year', currentYear.toString());

  const res = await ApiClient.get<BaseApi<NominationDetail[]>>('/rankings/nominations', {
    params: queryParams,
  });

  return res.data;
};
