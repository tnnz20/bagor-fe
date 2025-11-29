<template>
  <nav class="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-visible lg:pb-0">
    <RouterLink
      v-for="link in routerLinks"
      :key="link.to"
      :to="link.to"
      class="hover:bg-accent hover:text-accent-foreground flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:gap-3 sm:text-sm"
      :class="[isActiveRoute(link.to) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground']"
    >
      <component :is="link.icon" class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      <span class="whitespace-nowrap">{{ link.name }}</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { Icons } from '@/components/icons';

interface RouterLinkItem {
  name: string;
  to: string;
  icon: typeof Icons.User;
}

const route = useRoute();

const routerLinks: RouterLinkItem[] = [
  { name: 'Profil', to: '/profile/me', icon: Icons.User },
  { name: 'Upload Sertifikat', to: '/profile/upload-sertifikat', icon: Icons.FileText },
  { name: 'Ubah Password', to: '/profile/change-password', icon: Icons.Shield },
];

const isActiveRoute = computed(() => (path: string) => {
  return route.path === path;
});
</script>
