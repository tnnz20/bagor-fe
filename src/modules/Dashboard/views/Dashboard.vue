<template>
  <WelcomingDialog v-model:is-open="isWelcomingDialogOpen" />
  <ExplanationDialog v-model:is-open="isConfirmationOpen" />
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <DashboardSection />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import DashboardSection from '../components/DashboardSection.vue';
import ExplanationDialog from '../components/pop-up/ExplanationDialog.vue';
import WelcomingDialog from '../components/pop-up/WelcomingDialog.vue';

const isWelcomingDialogOpen = ref(true);
const isConfirmationOpen = ref(false);

watch(isWelcomingDialogOpen, newValue => {
  if (!newValue) {
    isConfirmationOpen.value = true;
  }
});
</script>
