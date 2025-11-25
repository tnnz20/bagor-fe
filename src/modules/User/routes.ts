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
        name: 'Users Managements',
        path: '',
        component: UsersManagement,
        meta: {
          title: 'Bagor - Manajemen Pengguna',
          description: 'Bagor Users Management Page',
          roles: ['admin'],
        },
      },
      {
        name: 'User Detail',
        path: 'detail/:id',
        component: User,
        meta: {
          title: 'Bagor - Detail Pengguna',
          description: 'Bagor User Detail Page',
          roles: ['admin', 'manager', 'director', 'executive'],
        },
      },
    ],
  },
];
