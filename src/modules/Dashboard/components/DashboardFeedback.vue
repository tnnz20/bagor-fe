<script lang="ts" setup>
import { accounts, feedbacks } from '../data/feedbacks';
import Feedback from './Feedback.vue';
</script>

<template>
  <div class="md:hidden">
    <VPImage
      alt="Mail"
      width="1280"
      height="727"
      class="block"
      :image="{
        dark: '/examples/mail-dark.png',
        light: '/examples/mail-light.png',
      }"
    />
  </div>
  <div class="hidden flex-col md:flex">
    <Feedback
      :accounts="accounts"
      :feedbacks="feedbacks"
      :nav-collapsed-size="4"
    />
  </div>
</template>
