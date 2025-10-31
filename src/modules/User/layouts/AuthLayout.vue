<template>
  <Toaster position="top-right" richColors />
  <div class="grid min-h-svh lg:grid-cols-2">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';

import 'vue-sonner/style.css';
</script>
