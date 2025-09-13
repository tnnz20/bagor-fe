import type { RouteRecordRaw } from 'vue-router';

import Home from './views/Home.vue';

export const HomeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      title: 'Bagor',
      description: 'Bagor Home Page',
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
    ],
  },
];
