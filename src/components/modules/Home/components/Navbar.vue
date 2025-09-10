<script setup lang="ts">
import NavigationSheet from "./NavigationSheet.vue";
import NavMenu from "./NavMenu.vue";
import { Button } from "../../../ui/button";
</script>

<template>
  <nav
    class="fixed top-6 inset-x-4 h-16 bg-background max-w-2xl mx-auto rounded-full z-50 shadow-xl"
  >
    <div class="h-full flex items-center justify-between mx-auto px-8">
      <span>LOGO</span>
      <!-- Desktop Menu -->
      <NavMenu class="hidden md:block" />
      <div class="flex items-center gap-3">
        <Button class="rounded-full">Login</Button>

        <!-- Menu Mobile -->
        <div class="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </div>
  </nav>
</template>
