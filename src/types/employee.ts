import type { BaseModel } from '.';

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
