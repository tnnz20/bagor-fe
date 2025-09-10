import type { RouteRecordRaw } from 'vue-router';
import DashboardView from './views/DashboardView.vue';

export const DashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    children: [
      {
        path: '',
        component: DashboardView,
      },
    ],
  },
];
