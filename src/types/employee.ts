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

// Employee types
export type EmployeeType = 'Fungsional' | 'Struktural' | 'Kontrak';
