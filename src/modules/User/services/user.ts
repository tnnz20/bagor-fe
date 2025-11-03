import ApiClient from '@/api/axios';

import type { BaseApi } from '@/types/index';
import type { User } from '@/types/user';

export const getUser = async (): Promise<BaseApi<User>> => {
  const res = await ApiClient.get<BaseApi<User>>(`/users/user`);
  return res.data;
};
