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

    created_at: Date.now() - 2592000000, // 30 days ago
    updated_at: Date.now() - 86400000,
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
    created_at: Date.now() - 1814400000, // 21 days ago
    updated_at: Date.now() - 172800000,
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
    created_at: Date.now() - 1209600000, // 14 days ago
    updated_at: Date.now() - 259200000,
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
    created_at: Date.now() - 604800000, // 7 days ago
    updated_at: Date.now() - 345600000, // 4 days ago
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
    created_at: Date.now() - 432000000, // 5 days ago
    updated_at: Date.now() - 432000000,
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
    created_at: Date.now() - 1728000000, // 20 days ago
    updated_at: Date.now() - 345600000,
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
    created_at: Date.now() - 864000000, // 10 days ago
    updated_at: Date.now() - 518400000,
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
    created_at: Date.now() - 1296000000, // 15 days ago
    updated_at: Date.now() - 259200000,
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
    created_at: Date.now() - 1555200000, // 18 days ago
    updated_at: Date.now() - 691200000,
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
    created_at: Date.now() - 1036800000, // 12 days ago
    updated_at: Date.now() - 172800000,
  },
];

export default Users;
