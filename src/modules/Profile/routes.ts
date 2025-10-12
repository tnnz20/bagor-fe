import type { RouteRecordRaw } from 'vue-router';

import Profile from './views/Profile.vue';

export const ProfileRoutes: RouteRecordRaw[] = [
  {
    path: 'profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Bagor - Profile',
      description: 'Bagor Profile Page',
    },
  },
];
