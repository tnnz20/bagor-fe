import type { RouteRecordRaw } from 'vue-router';
import HomeView from './views/HomeView.vue';


export const HomeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    children: [
      {
        path: '',
        component: HomeView,
      },
    ],
  },
];