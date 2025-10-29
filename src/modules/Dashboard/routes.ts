import type { RouteRecordRaw } from 'vue-router';

import { BeritaAcaraRoutes } from '../BeritaAcara/routes';
import { DataPegawaiRoutes } from '../DataPegawai/routes';
import { FeedBackRoutes } from '../Feedback/routes';
import { GuideRoutes } from '../Guide/routes';
import { ProfileRoutes } from '../Profile/routes';
import Profile from '../Profile/views/Profile.vue';
import { UserDashboardRoutes } from '../User/routes';
import DashboardLayout from './layouts/DashboardLayout.vue';
import Dashboard from './views/Dashboard.vue';

export const DashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: {
      title: 'Bagor - Dashboard',
      description: 'Bagor Dashboard Page',
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
      },
      ...FeedBackRoutes,
      ...GuideRoutes,
      ...UserDashboardRoutes,
      ...BeritaAcaraRoutes,
      ...ProfileRoutes,
      ...DataPegawaiRoutes,
    ],
  },
];
