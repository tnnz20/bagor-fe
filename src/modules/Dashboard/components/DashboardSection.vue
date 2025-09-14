<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <DashboardSectionCard />
    <DashboardSectionMain />
  </div>
</template>

<script setup lang="ts">
import DashboardSectionCard from './DashboardSectionCard.vue';
import DashboardSectionMain from './DashboardSectionMain.vue';
</script>
