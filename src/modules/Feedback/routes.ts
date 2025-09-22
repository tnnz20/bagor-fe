import type { RouteRecordRaw } from 'vue-router';

import Feedback from './views/Feedback.vue';

export const FeedBackRoutes: RouteRecordRaw[] = [
  {
    path: 'feedback',
    name: 'Feedback',
    component: Feedback,
    meta: {
      title: 'Bagor - Feedback',
      description: 'Bagor Feedback Page',
    },
  },
];
