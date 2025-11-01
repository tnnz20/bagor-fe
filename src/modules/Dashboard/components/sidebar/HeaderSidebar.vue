<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" as-child>
        <RouterLink to="/dashboard">
          <Avatar>
            <AvatarFallback class="bg-primary text-accent font-medium uppercase">
              {{ fallbackName }}
            </AvatarFallback>
          </Avatar>

          <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-semibold">{{ user?.Username.substring(0, 15) }}</span>
            <span class="truncate text-xs">{{ user?.Email }}</span>
          </div>
        </RouterLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

import type { User } from '@/types/user';

interface Props {
  user: User | undefined;
}
const props = defineProps<Props>();

const fallbackName = computed(() => {
  return props.user?.Username.split(' ')
    .map(chunk => chunk[0])
    .join('');
});
</script>
