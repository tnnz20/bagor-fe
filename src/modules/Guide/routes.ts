import type { RouteRecordRaw } from 'vue-router';

import Guide from './views/Guide.vue';

export const GuideRoutes: RouteRecordRaw[] = [
  {
    path: 'panduan',
    name: 'Guide',
    component: Guide,
    meta: {
      title: 'Bagor - Guide',
      description: 'Bagor Guide Page',
      roles: ['admin', 'manager', 'employee'],
    },
  },
];
