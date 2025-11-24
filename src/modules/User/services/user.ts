import ApiClient from '@/api/axios';

import type { BaseApi, PaginationMeta } from '@/types/index';
import type { FilterUsers, User, UserDetail, UserRegistration } from '@/types/user';

// Get current logged-in user
export const getUser = async (): Promise<BaseApi<User>> => {
  const res = await ApiClient.get<BaseApi<User>>(`/users/me`);
  return res.data;
};

// Get user list with pagination and filters
export const getUserList = async (
  paginationMeta: PaginationMeta,
  filterUsers: FilterUsers
): Promise<BaseApi<UserDetail[]>> => {
  const queryParams = new URLSearchParams();

  queryParams.append('page', paginationMeta.current_page.toString());
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

  if (filterUsers.sort_order) {
    queryParams.append('sort_order', filterUsers.sort_order);
  }

  const res = await ApiClient.get<BaseApi<UserDetail[]>>('/users', { params: queryParams });
  return res.data;
};

// Create new user
export const createUser = async (userData: UserRegistration): Promise<BaseApi> => {
  const res = await ApiClient.post<BaseApi>('/users', userData);
  return res.data;
};

// Delete user by ID
export const deleteUser = async (userId: string): Promise<BaseApi> => {
  const res = await ApiClient.delete<BaseApi>(`/users/${userId}`);
  return res.data;
};
