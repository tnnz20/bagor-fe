import type { RouteRecordRaw } from 'vue-router';

import BeritaAcara from './views/BeritaAcara.vue';

export const BeritaAcaraRoutes: RouteRecordRaw[] = [
  {
    path: 'berita-acara',
    name: 'Berita Acara',
    component: BeritaAcara,
    meta: {
      title: 'Bagor - Berita Acara',
      description: 'Bagor Berita Acara Page',
    },
  },
];
