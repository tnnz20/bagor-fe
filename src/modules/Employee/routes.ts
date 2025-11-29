import type { RouteRecordRaw } from 'vue-router';

import Employee from './views/Employee.vue';

export const EmployeeRoutes: RouteRecordRaw[] = [
  {
    path: 'pegawai',
    name: 'Data Pegawai',
    component: Employee,
    meta: {
      title: 'Bagor - Data Pegawai',
      description: 'Manage employee data',
      roles: ['admin', 'manager', 'director'],
    },
  },
];
