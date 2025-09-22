<template>
  <div class="hidden h-screen flex-col md:flex">
    <FeedbackContent :feedbacks="feedbacks" />
  </div>
</template>

<script setup lang="ts">
import FeedbackContent from '../components/FeedbackContent.vue';
import { feedbacks } from '../data/feedback';
</script>
