import type { RouteRecordRaw } from 'vue-router';

import Question from './views/Question.vue';
import QuestionManagement from './views/QuestionManagement.vue';

export const QuestionRoutes: RouteRecordRaw[] = [
  {
    path: '/questions/:slug_param',
    name: 'Questions',
    component: Question,
    meta: {
      title: 'Bagor - Questions',
      description: 'Bagor Questions Page',
    },
  },
];

export const QuestionDashboardRoutes: RouteRecordRaw[] = [
  {
    path: 'manajemen-pertanyaan',
    name: 'Question Management',
    component: QuestionManagement,
    meta: {
      title: 'Bagor - Manajemen Pertanyaan',
      description: 'Bagor Question Management Page',
      roles: ['admin'],
    },
  },
];
