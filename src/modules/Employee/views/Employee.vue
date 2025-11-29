<template>
  <component :is="activeComponent" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useUserStore } from '@/stores/user';

import DirectorEmployee from './DirectorEmployee.vue';
// Import the sub-views
import ManagerEmployee from './ManagerEmployee.vue';

const userStore = useUserStore();

const activeComponent = computed(() => {
  const role = userStore.userRole;

  if (role === 'director') {
    return DirectorEmployee;
  }

  return ManagerEmployee;
});
</script>
