import AuthLayout from '@/components/layouts/AuthLayout.vue';
import UserLogin from '@/components/modules/User/view/UserLogin.vue';
import type { RouteRecordRaw } from 'vue-router';

export const UserRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
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
