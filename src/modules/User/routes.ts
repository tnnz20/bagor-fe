import UserLogin from '@/modules/User/views/UserLogin.vue';
import type { RouteRecordRaw } from 'vue-router';
import AuthLayout from './layouts/AuthLayout.vue';

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
