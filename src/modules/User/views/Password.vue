<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-base font-semibold sm:text-lg">Ubah Password</h2>
      <p class="text-muted-foreground text-xs sm:text-sm">
        Pastikan password baru Anda memiliki minimal 8 karakter dan maksimal 72 karakter.
      </p>
    </div>

    <Separator />

    <!-- Password Form -->
    <PasswordForm />
  </div>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator';
import PasswordForm from '../components/setting/PasswordForm.vue';
</script>
