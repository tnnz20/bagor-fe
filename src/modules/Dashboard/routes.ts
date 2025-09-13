import type { RouteRecordRaw } from 'vue-router';

import Dashboard from './views/Dashboard.vue';

export const DashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
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
    ],
  },
];
