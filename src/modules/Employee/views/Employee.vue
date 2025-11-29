<template>
  <component :is="activeComponent" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useUserStore } from '@/stores/user';

// Import the sub-views
import ManagerEmployee from './ManagerEmployee.vue';

const userStore = useUserStore();

const activeComponent = computed(() => {
  const role = userStore.userRole;

  // 1. Director gets their specific view
  // if (role === 'director') {
  //   return DirectorEmployee;
  // }

  // 2. Admin and Manager share the same view (and route)
  // Default to ManagerEmployee for everyone else
  return ManagerEmployee;
});
</script>
