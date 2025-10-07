<template>
  <Card class="bg-primary/5 sticky top-4 flex h-fit justify-start gap-0 px-8">
    <div class="flex items-center gap-2">
      <RouterLink to="/dashboard/panduan/panduan-lupa-password" class="group flex items-center gap-2">
        <div class="bg-primary/50 group-hover:bg-primary rounded-full p-2 transition-colors duration-200">
          <Icons.Play class="h-4 w-4 text-white" />
        </div>
        <span class="group-hover:text-primary transition-colors duration-200"> Panduan Lupa Password </span>
      </RouterLink>
    </div>
    <div class="bg-primary my-1 ml-3.5 h-8 w-0.5 rounded-xl" />
    <div class="flex items-center gap-2">
      <RouterLink to="/dashboard/panduan/panduan-cara-memberikan-saran" class="group flex items-center gap-2">
        <div class="bg-primary/50 group-hover:bg-primary rounded-full p-2 transition-colors duration-200">
          <Icons.Play class="h-4 w-4 text-white" />
        </div>
        <span class="group-hover:text-primary transition-colors duration-200">
          Panduan Cara Memberikan Saran atau Masukan
        </span>
      </RouterLink>
    </div>
    <div class="bg-primary my-1 ml-3.5 h-8 w-0.5 rounded-xl" />
    <div class="flex items-center gap-2">
      <RouterLink to="/dashboard/panduan/panduan-lupa-password" class="group flex items-center gap-2">
        <div class="bg-primary/50 group-hover:bg-primary rounded-full p-2 transition-colors duration-200">
          <Icons.Play class="h-4 w-4 text-white" />
        </div>
        <span class="group-hover:text-primary transition-colors duration-200">Panduan Lupa Password</span>
      </RouterLink>
    </div>
    <div class="bg-primary my-1 ml-3.5 h-8 w-0.5 rounded-xl" />
    <div class="flex items-center gap-2">
      <RouterLink to="/dashboard/panduan/panduan-lupa-password" class="group flex items-center gap-2">
        <div class="bg-primary/50 group-hover:bg-primary rounded-full p-2 transition-colors duration-200">
          <Icons.Play class="h-4 w-4 text-white" />
        </div>
        <span class="group-hover:text-primary transition-colors duration-200">Tutorial 4</span>
      </RouterLink>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Icons } from '@/components/icons';
import Card from '@/components/ui/card/Card.vue';
</script>
