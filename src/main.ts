import { createApp } from 'vue';

import App from './App.vue';

import './assets/css/main.css';

import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';

import router from './router';

const pinia = createPinia();

createApp(App).use(router).use(VueQueryPlugin).use(pinia).mount('#app');
