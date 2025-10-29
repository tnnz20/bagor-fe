import type { RouteRecordRaw } from 'vue-router';

import PegawaiView from './views/PegawaiView.vue';

export const DataPegawaiRoutes: RouteRecordRaw[] = [
  {
    path: 'pegawai',
    name: 'Data Pegawai',
    component: PegawaiView,
    meta: {
      title: 'Bagor - Data Pegawai',
      description: 'Bagor Data Pegawai Page',
    },
  },
];
