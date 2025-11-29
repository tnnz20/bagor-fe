<template>
  <nav class="flex items-center gap-4">
    <Button variant="ghost" size="sm" as-child class="gap-2">
      <RouterLink to="/dashboard">
        <Icons.ChevronLeft class="h-4 w-4" />
        <span class="hidden sm:inline">Kembali ke Dashboard</span>
        <span class="sm:hidden">Kembali</span>
      </RouterLink>
    </Button>
  </nav>
</template>

<script setup lang="ts">
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
</script>
