import type { RouteRecordRaw } from 'vue-router';

import Feedback from './views/Feedback.vue';
import FeedbackUser from './views/FeedbackUser.vue';

export const FeedBackRoutes: RouteRecordRaw[] = [
  {
    path: 'masukan',
    name: 'Feedback',
    component: Feedback,
    meta: {
      title: 'Bagor - Feedback',
      description: 'Bagor Feedback Page',
      roles: ['admin'],
    },
  },
  {
    path: 'saran',
    name: 'FeedbackUser',
    component: FeedbackUser,
    meta: {
      title: 'Bagor - User Feedback',
      description: 'Bagor User Feedback Page',
      roles: ['employee'],
    },
  },
];
