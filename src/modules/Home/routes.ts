import type { RouteRecordRaw } from 'vue-router';

import Home from './views/Home.vue';

export const HomeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Bagor',
      description: 'Bagor Home Page',
    },
    children: [
      {
        path: '',
        component: Home,
      },
    ],
  },
];
