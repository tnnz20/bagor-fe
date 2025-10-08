import { createRouter, createWebHistory } from 'vue-router';

import Notfound from '@/Notfound.vue';

import { DashboardRoutes } from '@/modules/Dashboard/routes';
import { HomeRoutes } from '@/modules/Home/routes';
import { QuestionRoutes } from '@/modules/Question/routes';
import { UserRoutes } from '@/modules/User/routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...HomeRoutes,
    ...UserRoutes,
    ...DashboardRoutes,
    ...QuestionRoutes,
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: Notfound },
  ],
});

router.beforeEach((to, _, next) => {
  document.title = (to.meta.title as string) || 'Bagor';
  const metaDescription = (to.meta.description as string) || 'Bagor Application';
  const descriptionTag = document.querySelector('meta[name="description"]');

  if (descriptionTag) {
    descriptionTag.setAttribute('content', metaDescription);
  }

  next();
});

export default router;
