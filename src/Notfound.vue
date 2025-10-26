<template>
  <div
    class="from-background to-secondary/20 flex min-h-screen items-center justify-center bg-gradient-to-br px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8 text-center">
      <!-- 404 Large Number -->
      <div class="mb-8">
        <h1 class="text-muted-foreground/30 text-9xl font-extrabold tracking-widest select-none">404</h1>
        <div class="bg-primary absolute -mt-4 ml-8 rotate-12 rounded px-2 text-sm">
          <span class="text-primary-foreground font-semibold">Page Not Found</span>
        </div>
      </div>

      <!-- Error Message -->
      <div class="space-y-4">
        <h2 class="text-foreground text-3xl font-bold sm:text-4xl">Ups! Halaman tidak ditemukan</h2>
        <p class="text-muted-foreground mx-auto max-w-sm text-lg">
          Halaman yang Anda cari tidak ada atau telah dipindahkan ke lokasi lain.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        <!-- Go Back Button -->
        <Button
          @click="goBack"
          size="lg"
          :class="cn('transform shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl')"
        >
          <Icons.ArrowLeft class="mr-2 h-4 w-4" />
          Go Back
        </Button>

        <!-- Home Button -->
        <Button
          as-child
          variant="outline"
          size="lg"
          :class="cn('transform shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl')"
        >
          <router-link to="/">
            <Icons.Home class="mr-2 h-4 w-4" />
            Go Home
          </router-link>
        </Button>
      </div>

      <!-- Decorative Elements -->
      <div class="relative mt-12">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="border-border w-full border-t"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="from-background to-secondary/20 text-muted-foreground bg-gradient-to-br px-4 text-sm">
            Lost in space?
          </span>
        </div>
      </div>

      <!-- Fun Animation -->
      <div class="mt-8 flex justify-center">
        <div class="animate-bounce">
          <svg
            class="text-primary h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

const router = useRouter();

const goBack = () => {
  // Check if there's history to go back to
  if (globalThis.history.length > 1) {
    router.go(-1);
  } else {
    // If no history, go to home page
    router.push('/');
  }
};
</script>

<style scoped>
/* Additional custom styles if needed */
.select-none {
  user-select: none;
}
</style>
