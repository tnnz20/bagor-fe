<template>
  <PopUpAlert v-model:is-open="isWelcomeOpen" @continue="handleContinue" />
  <AlertSistemPenilaian v-model:is-open="isConfirmationOpen" @confirm="handleConfirm" />
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <DashboardSection />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import DashboardSection from '../components/DashboardSection.vue';
import AlertSistemPenilaian from '../components/pop-up/AlertSistemPenilaian.vue';
import PopUpAlert from '../components/pop-up/PopUpAlert.vue';

const isWelcomeOpen = ref(false);
const isConfirmationOpen = ref(false);

onMounted(() => {
  isWelcomeOpen.value = true;
});

const handleContinue = () => {
  setTimeout(() => {
    isConfirmationOpen.value = true;
  }, 300);
};

const handleConfirm = () => {
  console.log('User mengkonfirmasi');
};
</script>
