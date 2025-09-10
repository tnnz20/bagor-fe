import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css';
import { UserRoutes } from '@/components/modules/User/routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [...UserRoutes],
});

createApp(App).use(router).mount('#app');
