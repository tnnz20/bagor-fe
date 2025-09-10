import type { RouteRecordRaw } from 'vue-router';
import Dashboard from './views/Dashboard.vue';

export const DashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: 'Bagor - Dashboard',
      description: 'Bagor Dashboard Page',
    },
    children: [
      {
        path: '',
        component: Dashboard,
      },
    ],
  },
];
