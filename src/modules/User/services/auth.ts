import ApiClient from '@/api/axios';
import type { BaseApi } from '@/types';

import type { UserCredential } from '@/types/user';

export const LoginUser = async (userCredential: UserCredential): Promise<BaseApi> => {
  const res = await ApiClient.post<BaseApi>('/auth/login', userCredential);
  return res.data;
};

export const LogoutUser = async () => {
  const res = await ApiClient.post<BaseApi>('/auth/logout');
  return res.data;
};
