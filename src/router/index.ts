import { createRouter, createWebHistory } from 'vue-router';

import Notfound from '@/Notfound.vue';

import { DashboardRoutes } from '@/modules/Dashboard/routes';
import { HomeRoutes } from '@/modules/Home/routes';
import { QuestionRoutes } from '@/modules/Question/routes';
import { UserRoutes } from '@/modules/User/routes';
import { useAuthStore } from '@/stores/auth';

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

  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
    return;
  }

  if (to.path === '/login' && authStore.isAuthenticated) {
    next('/dashboard');
    return;
  }

  next();
});

export default router;
