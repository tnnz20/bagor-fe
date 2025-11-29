import type { RouteRecordRaw } from 'vue-router';

import AuthUserLogin from '@/modules/User/views/AuthUserLogin.vue';

import AuthLayout from './layouts/AuthLayout.vue';
import SettingLayout from './layouts/SettingLayout.vue';
import Certificate from './views/Certificate.vue';
import Password from './views/Password.vue';
import Profile from './views/Profile.vue';
import User from './views/UserDetail.vue';
import UsersManagement from './views/UsersManagement.vue';

export const UserRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Authentications',
    component: AuthLayout,
    meta: {
      title: 'Bagor - Login',
      description: 'Bagor Authentication Page',
    },
    children: [
      {
        path: 'login',
        component: AuthUserLogin,
      },
    ],
  },
  {
    path: '/profile',
    name: 'User Profile',
    component: SettingLayout,
    meta: {
      title: 'Bagor - Setting Profile',
      description: 'Bagor User Profile Page',
    },
    children: [
      {
        path: 'me',
        component: Profile,
        meta: {
          title: 'Bagor - Profil Saya',
          description: 'Bagor Halaman Profil Saya',
        },
      },
      {
        path: 'change-password',
        component: Password,
        meta: {
          title: 'Bagor - Ubah Kata Sandi',
          description: 'Bagor Halaman Ubah Kata Sandi',
        },
      },
      {
        path: 'upload-certificate',
        component: Certificate,
        meta: {
          title: 'Bagor - Unggah Sertifikat',
          description: 'Bagor Halaman Unggah Sertifikat',
        },
      },
    ],
  },
];

export const UserDashboardRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    children: [
      {
        name: 'Users Managements',
        path: '',
        component: UsersManagement,
        meta: {
          title: 'Bagor - Manajemen Pengguna',
          description: 'Bagor Users Management Page',
          roles: ['admin'],
        },
      },
      {
        name: 'User Detail',
        path: 'detail/:id',
        component: User,
        meta: {
          title: 'Bagor - Detail Pengguna',
          description: 'Bagor User Detail Page',
          roles: ['admin', 'manager', 'director', 'executive'],
        },
      },
    ],
  },
];
