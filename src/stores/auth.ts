import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  }),

  actions: {
    setAuthenticated(value: boolean) {
      this.isAuthenticated = value;
      localStorage.setItem('isAuthenticated', String(value));
    },
    logout() {
      this.setAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
    },
  },
});
