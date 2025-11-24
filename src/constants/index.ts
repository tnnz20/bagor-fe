import type { DepartmentCode, EmployeeType } from '@/types/employee';
import type { UserRole } from '@/types/user';

interface SelectOption<T> {
  value: T;
  label: string;
}

export const divisions: SelectOption<DepartmentCode>[] = [
  { value: 'UMK', label: 'Umum & Keuangan' },
  { value: 'PRT', label: 'Perlengkapan & RT' },
  { value: 'ORG', label: 'Organisasi' },
  { value: 'HKM', label: 'Hukum' },
  { value: 'EKO', label: 'Perekonomian & Adm. Pembangunan' },
  { value: 'PEM', label: 'Pemerintahan' },
  { value: 'KSR', label: 'Kesejahteraan Rakyat' },
  { value: 'PKP', label: 'Protokol & Komun. Pimpinan' },
  { value: 'PBJ', label: 'Pengadaan Barang & Jasa' },
];

export const employeeTypes: SelectOption<EmployeeType>[] = [
  { value: 'Pengawas dan Penyetaraan', label: 'Pengawas dan Penyetaraan' },
  { value: 'Murni dan Pelaksana', label: 'Murni dan Pelaksana' },
  { value: 'PTT', label: 'PTT' },
  { value: 'Struktural', label: 'Struktural' },
];

export const roles: SelectOption<UserRole>[] = [
  { value: 'manager', label: 'Manager' },
  { value: 'employee', label: 'Employee' },
];
