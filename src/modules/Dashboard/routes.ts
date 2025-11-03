import type { RouteRecordRaw } from 'vue-router';

import { BeritaAcaraRoutes } from '../BeritaAcara/routes';
import { FeedBackRoutes } from '../Feedback/routes';
import { GuideRoutes } from '../Guide/routes';
import { UserDashboardRoutes } from '../User/routes';
import DashboardLayout from './layouts/DashboardLayout.vue';
import Dashboard from './views/Dashboard.vue';

export const DashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DashboardLayout,
    meta: {
      title: 'Bagor - Dashboard',
      description: 'Bagor Dashboard Page',
      requiresAuth: true,
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          roles: ['admin'],
        },
      },
      ...FeedBackRoutes,
      ...GuideRoutes,
      ...UserDashboardRoutes,
      ...BeritaAcaraRoutes,
    ],
  },
];
