import type { RouteRecordRaw } from 'vue-router';

import Question from './views/Question.vue';

export const QuestionRoutes: RouteRecordRaw[] = [
  {
    path: '/questions',
    name: 'Questions',
    component: Question,
    meta: {
      title: 'Bagor - Questions',
      description: 'Bagor Questions Page',
    },
  },
];
