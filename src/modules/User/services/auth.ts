import ApiClient from '@/api/axios';

export const loginUser = async (data: { username: string; password: string }) => {
  const res = await ApiClient.post('/login', data);
  return res.data;
};
