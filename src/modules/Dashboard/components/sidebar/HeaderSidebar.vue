<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" as-child>
        <div>
          <Avatar
            class="bg-primary text-accent flex h-8 w-8 items-center justify-center rounded-lg"
          >
            <AvatarImage :src="user.avatar" :alt="user.name" />
            <AvatarFallback class="rounded-lg font-medium uppercase">
              {{ fallbackName }}
            </AvatarFallback>
          </Avatar>

          <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-semibold">{{
              user.name.substring(0, 15)
            }}</span>
            <span class="truncate text-xs">{{ user.email }}</span>
          </div>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Props {
  user: User;
}
const props = defineProps<Props>();

const fallbackName = computed(() => {
  return props.user?.name
    .split(' ')
    .map(chunk => chunk[0])
    .join('');
});
</script>
