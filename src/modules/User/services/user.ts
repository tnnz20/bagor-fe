import ApiClient from '@/api/axios';

export const getUser = async () => {
  const res = await ApiClient.get(`/users/user`);
  return res;
};
