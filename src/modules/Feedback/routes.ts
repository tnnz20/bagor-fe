import type { RouteRecordRaw } from 'vue-router';

import Feedback from './views/Feedback.vue';

export const FeedBackRoutes: RouteRecordRaw[] = [
  {
    path: 'saran',
    name: 'Feedback',
    component: Feedback,
    meta: {
      title: 'Bagor - Feedback',
      description: 'Bagor Feedback Page',
    },
  },
];
