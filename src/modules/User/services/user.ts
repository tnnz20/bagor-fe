import ApiClient from '@/api/axios';

import type { BaseApi, PaginationMeta } from '@/types/index';
import type { FilterUsers, User, UserListResponseWithPagination, UserRegistration } from '@/types/user';

export const getUser = async (): Promise<BaseApi<User>> => {
  const res = await ApiClient.get<BaseApi<User>>(`/users/user`);
  return res.data;
};

export const getUserList = async (
  paginationMeta: PaginationMeta,
  filterUsers: FilterUsers
): Promise<BaseApi<UserListResponseWithPagination>> => {
  const queryParams = new URLSearchParams();

  queryParams.append('page', paginationMeta.page.toString());
  queryParams.append('limit', paginationMeta.limit.toString());

  if (filterUsers.department !== 'all') {
    queryParams.append('department_code', filterUsers.department);
  }
  if (filterUsers.employeeType !== 'all') {
    queryParams.append('employee_type', filterUsers.employeeType);
  }
  if (filterUsers.role !== 'all') {
    queryParams.append('role', filterUsers.role);
  }

  if (filterUsers.search.trim() !== '') {
    queryParams.append('search', filterUsers.search.trim());
  }

  const res = await ApiClient.get<BaseApi<UserListResponseWithPagination>>('/users', { params: queryParams });
  return res.data;
};

export const createUser = async (userData: UserRegistration): Promise<BaseApi> => {
  const res = await ApiClient.post<BaseApi>('/users', userData);
  return res.data;
};
