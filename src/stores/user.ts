import { computed, ref } from 'vue';

import { defineStore } from 'pinia';

import type { User } from '@/types/user';

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const userRole = computed(() => user.value?.role || null);
  const userName = computed(() => user.value?.full_name || '');
  const userEmail = computed(() => user.value?.email || '');
  const isActive = computed(() => user.value?.is_active || false);

  // Actions
  const setUser = (userData: User) => {
    user.value = userData;
  };

  const clearUser = () => {
    user.value = null;
  };

  return {
    // State
    user,
    // Getters
    isAuthenticated,
    userRole,
    userName,
    userEmail,
    isActive,
    // Actions
    setUser,
    clearUser,
  };
});
