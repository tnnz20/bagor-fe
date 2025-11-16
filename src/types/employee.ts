import type { BaseModel } from '.';
import type { UserRole } from './user';

// Department types
export type Department =
  | 'UMUM DAN KEUANGAN'
  | 'PERLENGKAPAN DAN RUMAH TANGGA'
  | 'ORGANISASI'
  | 'HUKUM'
  | 'PEREKONOMIAN DAN ADMINISTRASI PEMBANGUNAN'
  | 'PEMERINTAHAN'
  | 'KESEJAHTERAAN RAKYAT'
  | 'PROTOKOL DAN KOMUNIKASI PIMPINAN'
  | 'PENGADAAN BARANG DAN JASA';

export type DepartmentCode = 'UMK' | 'PRT' | 'ORG' | 'HKM' | 'EKO' | 'PEM' | 'KSR' | 'PKP' | 'PBJ';

export type EmployeeType = 'Pengawas dan Penyetaraan' | 'Murni dan Pelaksana' | 'PTT';

export interface Employee extends BaseModel {
  id: number;
  name: string;
  position: string;
  avatarUrl: string;
  score: number;
}

// Employee detail type
export interface EmployeeDetail {
  nip: string;
  department_code: string;
  department: string;
  position: string;
  employee_type: string;
  employee_created_at: number;
  employee_updated_at: number;
}

export interface FilterEmployees {
  department: string;
  employeeType: string;
  search: string;
}

export interface EmployeeScore extends BaseModel {
  score_id: number;
  user_id: string;
  role: UserRole;
  full_name: string;
  employee_type: EmployeeType;
  department_code: DepartmentCode;
  presence_score: number;
  survey_score: number;
  attendance_delay_seconds: number;
  quarter: number;
  year: number;
}

export interface EmployeeScoreListResponse {
  data: EmployeeScore[];
}

export interface UpdateEmployeeScorePayload {
  presence_score?: number;
  survey_score?: number;
  attendance_delay_seconds?: number;
  quarter?: number;
  year?: number;
}
