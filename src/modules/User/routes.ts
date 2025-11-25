import type { RouteRecordRaw } from 'vue-router';

import AuthUserLogin from '@/modules/User/views/AuthUserLogin.vue';

import AuthLayout from './layouts/AuthLayout.vue';
import User from './views/UserDetail.vue';
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
        component: AuthUserLogin,
      },
    ],
  },
];

export const UserDashboardRoutes: RouteRecordRaw[] = [
  {
    path: 'users',

    children: [
      {
        path: '',
        name: 'Users Managements',
        component: UsersManagement,
        meta: {
          title: 'Bagor - Manajemen Pengguna',
          description: 'Bagor Users Management Page',
          roles: ['admin'],
        },
      },
      {
        path: 'user/:id',
        name: 'User Details',
        component: User,
        meta: {
          title: 'Bagor - Detail Pengguna',
          description: 'Bagor User Detail Page',
        },
      },
    ],
  },
];
