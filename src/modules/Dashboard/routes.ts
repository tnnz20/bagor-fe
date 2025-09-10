import type { RouteRecordRaw } from 'vue-router';
import Dashboard from './views/Dashboard.vue';

export const DashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    children: [
      {
        path: '',
        component: Dashboard,
      },
    ],
  },
];
