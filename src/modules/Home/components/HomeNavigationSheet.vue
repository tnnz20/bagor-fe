<script setup lang="ts">
import { Icons } from '@/components/icons';
import Button from '@/components/ui/button/Button.vue';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavMenu from './HomeNavMenu.vue';
</script>

<template>
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" class="rounded-full">
        <Icons.Menu />
      </Button>
    </SheetTrigger>
    <SheetContent class="px-6 py-3">
      <span>LOGO DISINI</span>
      <NavMenu orientation="vertical" class="mt-6 [&>div]:h-full" />
    </SheetContent>
  </Sheet>
</template>
