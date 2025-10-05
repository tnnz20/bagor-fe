<template>
  <div class="flex flex-col gap-4 p-6 md:p-10">
    <div class="flex justify-center gap-2 md:justify-start">
      <RouterLink to="/" class="flex items-center gap-2 font-medium">
        <div class="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
          <Icons.GalleryVerticalEnd class-name="size-4" />
        </div>
        Acme Inc.
      </RouterLink>
    </div>
    <div class="flex flex-1 items-center justify-center">
      <div class="w-full max-w-xs">
        <LoginForm />
      </div>
    </div>
  </div>
  <div class="hidden h-full p-10 lg:flex lg:items-center lg:justify-center">
    <img src="@/assets/images/login-form.png" alt="Login background" class="h-auto max-w-full" />
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/components/icons';
import LoginForm from '../components/auth/LoginForm.vue';
</script>
