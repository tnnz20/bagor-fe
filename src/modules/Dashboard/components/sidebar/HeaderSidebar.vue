<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" as-child>
        <RouterLink to="/">
          <div
            class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
          >
            <Icons.Command class="size-4" />
          </div>
          <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-semibold">Bagor</span>
            <span class="truncate text-xs">Enterprise</span>
          </div>
        </RouterLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<script setup lang="ts">
import { Icons } from '@/components/icons';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
</script>
