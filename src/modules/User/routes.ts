import type { RouteRecordRaw } from 'vue-router';

import UserLogin from '@/modules/User/views/UserLogin.vue';

import AuthLayout from './layouts/AuthLayout.vue';
import UsersManagement from './views/UsersManagement.vue';

export const UserRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Authentications',
    component: AuthLayout,
    meta: {
      title: 'Bagor - Login',
      description: 'Bagor Authentication Page',
    },
    children: [
      {
        path: 'login',
        component: UserLogin,
      },
    ],
  },
];

export const UserDashboardRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    name: 'Users Managements',
    component: UsersManagement,
    meta: {
      title: 'Bagor - Users Management',
      description: 'Bagor Users Management Page',
    },
  },
];
