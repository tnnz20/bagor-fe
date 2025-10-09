import type { RouteRecordRaw } from 'vue-router';

import FeedbackUser from './views/FeedbackUser.vue';

export const FeedbackUserRoutes: RouteRecordRaw[] = [
  {
    path: 'masukan',
    name: 'FeedbackUser',
    component: FeedbackUser,
    meta: {
      title: 'Bagor - User Feedback',
      description: 'Bagor User Feedback Page',
    },
  },
];
