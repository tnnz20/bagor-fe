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
