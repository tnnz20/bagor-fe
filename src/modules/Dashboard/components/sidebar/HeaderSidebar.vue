<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" as-child>
        <RouterLink to="/" class="rounded-lg border bg-white shadow-md">
          <div class="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center">
            <img src="@/assets/images/logo.webp" alt="Logo Bagor" />
          </div>
          <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="text-md truncate font-semibold">PENTAS JAPIN</span>
          </div>
        </RouterLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<script setup lang="ts">
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
</script>
