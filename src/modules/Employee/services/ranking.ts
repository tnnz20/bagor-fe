import ApiClient from '@/api/axios';
import type { BaseApi } from '@/types';

import { getCurrentPeriod } from '@/lib/utils';

import type { NominatePayload, NominationDetail } from '@/types/ranking';

// Nomination APIs

export const createNomination = async (payload: NominatePayload): Promise<BaseApi> => {
  const { year, quarter } = getCurrentPeriod();

  const requestPayload: NominatePayload = { ...payload, year, quarter };

  const res = await ApiClient.post<BaseApi>('/rankings/nominations', requestPayload);
  return res.data;
};

export const getNominations = async (): Promise<BaseApi<NominationDetail[]>> => {
  const queryParams = new URLSearchParams();

  const { year, quarter } = getCurrentPeriod();

  queryParams.append('quarter', quarter.toString());

  queryParams.append('year', year.toString());

  const res = await ApiClient.get<BaseApi<NominationDetail[]>>('/rankings/nominations', {
    params: queryParams,
  });

  return res.data;
};

export const deleteNomination = async (payload: NominatePayload): Promise<BaseApi> => {
  const { year, quarter } = getCurrentPeriod();

  const requestPayload: NominatePayload = { ...payload, year, quarter };

  const res = await ApiClient.delete<BaseApi>('/rankings/nominations', {
    data: requestPayload,
  });
  return res.data;
};

// Shortlist APIs

export const getNominationShortlist = async (): Promise<BaseApi<NominationDetail[]>> => {
  const queryParams = new URLSearchParams();

  const { year, quarter } = getCurrentPeriod();

  queryParams.append('quarter', quarter.toString());

  queryParams.append('year', year.toString());

  const res = await ApiClient.get<BaseApi<NominationDetail[]>>('/rankings/shortlists/nominations', {
    params: queryParams,
  });

  return res.data;
};

export const getShortlist = async (): Promise<BaseApi<NominationDetail[]>> => {
  const queryParams = new URLSearchParams();

  const { year, quarter } = getCurrentPeriod();

  queryParams.append('quarter', quarter.toString());

  queryParams.append('year', year.toString());

  const res = await ApiClient.get<BaseApi<NominationDetail[]>>('/rankings/shortlists', {
    params: queryParams,
  });

  return res.data;
};

export const createShortlist = async (payload: NominatePayload): Promise<BaseApi> => {
  const { year, quarter } = getCurrentPeriod();

  const requestPayload: NominatePayload = { ...payload, year, quarter };

  const res = await ApiClient.post<BaseApi>('/rankings/shortlists', requestPayload);
  return res.data;
};

export const deleteShortlist = async (payload: NominatePayload): Promise<BaseApi> => {
  const { year, quarter } = getCurrentPeriod();

  const requestPayload: NominatePayload = { ...payload, year, quarter };

  const res = await ApiClient.delete<BaseApi>('/rankings/shortlists', {
    data: requestPayload,
  });
  return res.data;
};
