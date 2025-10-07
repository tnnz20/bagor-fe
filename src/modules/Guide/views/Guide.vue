<template>
  <div class="grid h-full grid-cols-12 gap-4">
    <GuideContent class="col-span-7" />
    <GuideList class="col-span-5 mr-[30px]" />
  </div>
</template>

<script setup lang="ts">
import GuideContent from '../components/GuideContent.vue';
import GuideList from '../components/GuideList.vue';
</script>
