<template>
  <Toaster position="top-right" richColors />
  <div class="bg-background min-h-screen">
    <!-- Header -->
    <header
      class="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
    >
      <div class="container flex h-12 items-center px-4 sm:h-14 md:px-6">
        <SettingNav />
      </div>
    </header>

    <!-- Main Content -->
    <main class="container px-4 py-4 sm:py-6 md:px-6 lg:py-10">
      <!-- Page Header -->
      <div class="mb-4 space-y-0.5 sm:mb-6 sm:space-y-1">
        <h1 class="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">Pengaturan</h1>
        <p class="text-muted-foreground text-xs sm:text-sm">Kelola pengaturan akun dan preferensi Anda.</p>
      </div>

      <!-- Content Grid -->
      <div class="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-10">
        <!-- Sidebar - Horizontal scroll on mobile -->
        <aside class="-mx-4 px-4 sm:mx-0 sm:px-0 lg:w-56 lg:shrink-0 xl:w-64">
          <SettingAside />
        </aside>

        <!-- Main Content Area -->
        <div class="min-w-0 flex-1 lg:max-w-2xl">
          <RouterView />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner';

import SettingAside from '../components/setting/SettingAside.vue';
import SettingNav from '../components/setting/SettingNav.vue';
</script>
