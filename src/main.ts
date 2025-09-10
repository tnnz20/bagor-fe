import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css';
import { UserRoutes } from '@/modules/User/routes';
import { HomeRoutes } from './modules/Home/routes';



const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...HomeRoutes,
  ...UserRoutes]
});

createApp(App).use(router).mount('#app');
