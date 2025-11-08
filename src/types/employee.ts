import type { BaseModel } from '.';

export interface Employee extends BaseModel {
  id: number;
  name: string;
  position: string;
  avatarUrl: string;
  score: number;
}

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
