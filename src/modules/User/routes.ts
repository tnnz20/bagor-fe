import UserLogin from '@/modules/User/view/UserLogin.vue';
import type { RouteRecordRaw } from 'vue-router';
import AuthLayout from './layouts/AuthLayout.vue';

export const UserRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Authentications',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: UserLogin,
      },
    ],
  },
];
