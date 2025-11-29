import ApiClient from '@/api/axios';
import type { BaseApi, PaginationMeta } from '@/types';

import { getCurrentPeriod } from '@/lib/utils';

import type { EmployeeScore, FilterEmployees, UpdateEmployeeScorePayload } from '@/types/employee';

export const getEmployeesScore = async (
  paginationMeta: PaginationMeta,
  filterEmployees: FilterEmployees
): Promise<BaseApi<EmployeeScore[]>> => {
  const queryParams = new URLSearchParams();

  queryParams.append('page', paginationMeta.current_page.toString());
  queryParams.append('limit', paginationMeta.limit.toString());

  if (filterEmployees.department !== 'all') {
    queryParams.append('department_code', filterEmployees.department);
  }

  if (filterEmployees.employeeType !== 'all') {
    queryParams.append('employee_type', filterEmployees.employeeType);
  }

  if (filterEmployees.search.trim() !== '') {
    queryParams.append('search', filterEmployees.search.trim());
  }

  if (filterEmployees.sort_order) {
    queryParams.append('sort_order', filterEmployees.sort_order);
  }

  const { year, quarter } = getCurrentPeriod();

  queryParams.append('quarter', quarter.toString());

  queryParams.append('year', year.toString());

  const res = await ApiClient.get<BaseApi<EmployeeScore[]>>('/scores', {
    params: queryParams,
  });
  return res.data;
};

export const updateScore = async (employeeId: string, payload: UpdateEmployeeScorePayload): Promise<BaseApi> => {
  // Build request body with provided fields only
  const requestBody: Partial<UpdateEmployeeScorePayload> = {};

  // Add score fields if provided
  if (payload.presence_score !== undefined) {
    requestBody.presence_score = payload.presence_score;
  }

  if (payload.survey_score !== undefined) {
    requestBody.survey_score = payload.survey_score;
  }

  if (payload.attendance_delay_seconds !== undefined) {
    requestBody.attendance_delay_seconds = payload.attendance_delay_seconds;
  }

  // Quarter and year are required - use provided values or calculate defaults
  const { year, quarter } = getCurrentPeriod();

  requestBody.quarter = payload.quarter ?? quarter;
  requestBody.year = payload.year ?? year;

  const res = await ApiClient.put<BaseApi>(`/scores/users/${employeeId}`, requestBody);
  return res.data;
};
