<script setup lang="ts">
import { Button } from '@/components/ui/button';
import NavigationSheet from './HomeNavigationSheet.vue';
import NavMenu from './HomeNavMenu.vue';
</script>

<template>
  <nav
    class="bg-background fixed inset-x-4 top-6 z-50 mx-auto h-16 max-w-2xl rounded-full shadow-xl"
  >
    <div class="mx-auto flex h-full items-center justify-between px-8">
      <span>LOGO</span>
      <!-- Desktop Menu -->
      <NavMenu class="hidden md:block" />
      <div class="flex items-center gap-3">
        <Button class="rounded-full"
          ><RouterLink to="/login">Login</RouterLink></Button
        >

        <!-- Menu Mobile -->
        <div class="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </div>
  </nav>
</template>
