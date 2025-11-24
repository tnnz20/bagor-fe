import type { UserRole } from '@/types/user';

export const getRoleVariant = (role: UserRole): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (role) {
    case 'admin':
      return 'destructive';
    case 'manager':
      return 'default';
    case 'employee':
      return 'secondary';
    default:
      return 'outline';
  }
};

export const getDepartmentName = (dept: string): string => {
  const names: Record<string, string> = {
    'UMUM DAN KEUANGAN': 'Umum & Keuangan',
    'PERLENGKAPAN DAN RUMAH TANGGA': 'Perlengkapan & RT',
    ORGANISASI: 'Organisasi',
    HUKUM: 'Hukum',
    'PEREKONOMIAN DAN ADMINISTRASI PEMBANGUNAN': 'Perekonomian & Adm. Pembangunan',
    PEMERINTAHAN: 'Pemerintahan',
    'KESEJAHTERAAN RAKYAT': 'Kesejahteraan Rakyat',
    'PROTOKOL DAN KOMUNIKASI PIMPINAN': 'Protokol & Komun. Pimpinan',
    'PENGADAAN BARANG DAN JASA': 'Pengadaan Barang & Jasa',
  };
  return names[dept] || dept;
};

export const getDepartmentNameByCode = (dept: string): string => {
  const names: Record<string, string> = {
    UMK: 'Umum & Keuangan',
    PRT: 'Perlengkapan & RT',
    ORG: 'Organisasi',
    HKM: 'Hukum',
    EKO: 'Perekonomian & Adm. Pembangunan',
    PEM: 'Pemerintahan',
    KSR: 'Kesejahteraan Rakyat',
    PKP: 'Protokol & Komun. Pimpinan',
    PBJ: 'Pengadaan Barang & Jasa',
  };

  return names[dept] || dept;
};

// Helper function to get department code from department name
export const getDepartmentCode = (deptName: string): string => {
  const mapping: Record<string, string> = {
    'UMUM DAN KEUANGAN': 'UMK',
    'PERLENGKAPAN DAN RUMAH TANGGA': 'PRT',
    ORGANISASI: 'ORG',
    HUKUM: 'HKM',
    'PEREKONOMIAN DAN ADMINISTRASI PEMBANGUNAN': 'EKO',
    PEMERINTAHAN: 'PEM',
    'KESEJAHTERAAN RAKYAT': 'KSR',
    'PROTOKOL DAN KOMUNIKASI PIMPINAN': 'PKP',
    'PENGADAAN BARANG DAN JASA': 'PBJ',
  };
  return mapping[deptName] || '';
};
