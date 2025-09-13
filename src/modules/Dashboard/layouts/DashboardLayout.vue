<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <DashboardHeader />
      <RouterView />
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '../components/AppSidebar.vue';
import DashboardHeader from '../components/DashboardHeader.vue';
</script>
