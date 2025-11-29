import ApiClient from '@/api/axios';
import type { BaseApi } from '@/types';

import type { NominatePayload, NominationDetail } from '@/types/ranking';

// Nomination APIs

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

export const deleteNomination = async (payload: NominatePayload): Promise<BaseApi> => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const requestPayload: NominatePayload = {
    ...payload,
    year: currentYear,
    quarter: currentMonth >= 0 && currentMonth <= 5 ? 1 : 2,
  };

  const res = await ApiClient.delete<BaseApi>('/rankings/nominations', {
    data: requestPayload,
  });
  return res.data;
};

// Shortlist APIs

export const getNomanationShortlist = async (): Promise<BaseApi<NominationDetail[]>> => {
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

  const res = await ApiClient.get<BaseApi<NominationDetail[]>>('/rankings/shortlists/nominations', {
    params: queryParams,
  });

  return res.data;
};

export const getShortlist = async (): Promise<BaseApi<NominationDetail[]>> => {
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

  const res = await ApiClient.get<BaseApi<NominationDetail[]>>('/rankings/shortlists', {
    params: queryParams,
  });

  return res.data;
};

export const createShortlist = async (payload: NominatePayload): Promise<BaseApi> => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const requestPayload: NominatePayload = {
    ...payload,
    year: currentYear,
    quarter: currentMonth >= 0 && currentMonth <= 5 ? 1 : 2,
  };

  const res = await ApiClient.post<BaseApi>('/rankings/shortlists', requestPayload);
  return res.data;
};

export const deleteShortlist = async (payload: NominatePayload): Promise<BaseApi> => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const requestPayload: NominatePayload = {
    ...payload,
    year: currentYear,
    quarter: currentMonth >= 0 && currentMonth <= 5 ? 1 : 2,
  };

  const res = await ApiClient.delete<BaseApi>('/rankings/shortlists', {
    data: requestPayload,
  });
  return res.data;
};
