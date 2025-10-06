import type { User } from '@/types/user';

const Users: User[] = [
  {
    id: 1,
    firstName: 'Ahmad',
    lastName: 'Pratama',
    email: 'ahmad.pratama@bagor.go.id',
    role: 'admin',
    department: 'UMUM DAN KEUANGAN',
    position: 'Kepala Bagian Umum dan Keuangan',
    employeeType: 'Struktural',
    isActive: true,
    avatar: 'https://github.com/shadcn.png',
    created_at: 1757145600000, // September 6, 2025
    updated_at: 1759651200000, // October 5, 2025
  },
  {
    id: 2,
    firstName: 'Siti',
    lastName: 'Nurhaliza',
    email: 'siti.nurhaliza@bagor.go.id',
    role: 'manager',
    department: 'PERLENGKAPAN DAN RUMAH TANGGA',
    position: 'Kepala Sub Bagian Perlengkapan',
    employeeType: 'Struktural',
    isActive: true,
    avatar: 'https://github.com/vercel.png',
    created_at: 1757923200000, // September 15, 2025
    updated_at: 1759564800000, // October 4, 2025
  },
  {
    id: 3,
    firstName: 'Budi',
    lastName: 'Santoso',
    email: 'budi.santoso@bagor.go.id',
    role: 'employee',
    department: 'ORGANISASI',
    position: 'Analis Organisasi dan Tata Laksana',
    employeeType: 'Fungsional',
    isActive: true,
    created_at: 1758528000000, // September 22, 2025
    updated_at: 1759478400000, // October 3, 2025
  },
  {
    id: 4,
    firstName: 'Dewi',
    lastName: 'Lestari',
    email: 'dewi.lestari@bagor.go.id',
    role: 'employee',
    department: 'HUKUM',
    position: 'Analis Hukum',
    employeeType: 'Fungsional',
    isActive: false,
    created_at: 1759132800000, // September 29, 2025
    updated_at: 1759392000000, // October 2, 2025
  },
  {
    id: 5,
    firstName: 'Eko',
    lastName: 'Wijaya',
    email: 'eko.wijaya@bagor.go.id',
    role: 'employee',
    department: 'PEREKONOMIAN DAN ADMINISTRASI PEMBANGUNAN',
    position: 'Analis Kebijakan',
    employeeType: 'Fungsional',
    isActive: true,
    avatar: 'https://github.com/nuxt.png',
    created_at: 1759305600000, // October 1, 2025
    updated_at: 1759305600000, // October 1, 2025
  },
  {
    id: 6,
    firstName: 'Indah',
    lastName: 'Permata',
    email: 'indah.permata@bagor.go.id',
    role: 'manager',
    department: 'PEMERINTAHAN',
    position: 'Kepala Sub Bagian Pemerintahan',
    employeeType: 'Struktural',
    isActive: true,
    created_at: 1758009600000, // September 16, 2025
    updated_at: 1759392000000, // October 2, 2025
  },
  {
    id: 7,
    firstName: 'Roni',
    lastName: 'Setiawan',
    email: 'roni.setiawan@bagor.go.id',
    role: 'employee',
    department: 'KESEJAHTERAAN RAKYAT',
    position: 'Analis Kesejahteraan Sosial',
    employeeType: 'Kontrak',
    isActive: true,
    created_at: 1758873600000, // September 26, 2025
    updated_at: 1759219200000, // September 30, 2025
  },
  {
    id: 8,
    firstName: 'Maya',
    lastName: 'Sari',
    email: 'maya.sari@bagor.go.id',
    role: 'employee',
    department: 'PROTOKOL DAN KOMUNIKASI PIMPINAN',
    position: 'Pranata Humas',
    employeeType: 'Fungsional',
    isActive: true,
    avatar: 'https://github.com/microsoft.png',
    created_at: 1758441600000, // September 21, 2025
    updated_at: 1759478400000, // October 3, 2025
  },
  {
    id: 9,
    firstName: 'Doni',
    lastName: 'Kurniawan',
    email: 'doni.kurniawan@bagor.go.id',
    role: 'employee',
    department: 'PENGADAAN BARANG DAN JASA',
    position: 'Pejabat Pengadaan',
    employeeType: 'Fungsional',
    isActive: true,
    created_at: 1758182400000, // September 18, 2025
    updated_at: 1759046400000, // September 28, 2025
  },
  {
    id: 10,
    firstName: 'Rina',
    lastName: 'Handayani',
    email: 'rina.handayani@bagor.go.id',
    role: 'employee',
    department: 'UMUM DAN KEUANGAN',
    position: 'Bendahara Pengeluaran',
    employeeType: 'Struktural',
    isActive: true,
    avatar: 'https://github.com/tailwindlabs.png',
    created_at: 1758700800000, // September 24, 2025
    updated_at: 1759564800000, // October 4, 2025
  },
];

export default Users;
