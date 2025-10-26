<template>
  <PopUpAlert v-model:is-open="isWelcomeOpen" @update:is-open="handleContinueDialog" />
  <AlertSistemPenilaian v-model:is-open="isConfirmationOpen" @confirm="handleFinishDialog" />
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <DashboardSection />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import DashboardSection from '../components/DashboardSection.vue';
import AlertSistemPenilaian from '../components/pop-up/AlertSistemPenilaian.vue';
import PopUpAlert from '../components/pop-up/PopUpAlert.vue';

const isWelcomeOpen = ref(true);
const isConfirmationOpen = ref(false);

const handleContinueDialog = () => {
  isWelcomeOpen.value = false;
  isConfirmationOpen.value = true;
};

const handleFinishDialog = () => {
  isConfirmationOpen.value = false;
};
</script>
