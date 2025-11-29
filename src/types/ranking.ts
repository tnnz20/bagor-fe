import type { Department, EmployeeType } from './employee';

export type NominatePayload = {
  employee_id: string;
  year?: number;
  quarter?: number;
};

export interface NominationDetail {
  id: number;
  manager_id: string;
  employee_id: string;
  year: number;
  quarter: number;
  created_at: number;
  employee_name: string;
  employee_type: EmployeeType;
  department_name: Department;
  presence_score?: number;
  survey_score?: number;
  attendance_delay_seconds?: number;
}
