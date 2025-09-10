import type { RouteRecordRaw } from 'vue-router';
import Home from './views/Home.vue';

export const HomeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    children: [
      {
        path: '',
        component: Home,
      },
    ],
  },
];
