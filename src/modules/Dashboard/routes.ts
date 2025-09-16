import type { RouteRecordRaw } from 'vue-router';

import DashboardFeedback from './components/DashboardFeedback.vue';
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
      {
        path: 'feedback',
        name: 'Feedback',
        component: DashboardFeedback,
        meta: {
          title: 'Bagor - Feedback',
          description: 'Bagor Feedback Page',
        },
      },
    ],
  },
];
