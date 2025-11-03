<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarFallback class="bg-primary text-accent font-medium uppercase">
                {{ fallbackName }}
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ user?.Username }}</span>
              <span class="truncate text-xs">{{ user?.Email }}</span>
            </div>
            <Icons.ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="rounded-lg">
                <AvatarFallback class="bg-primary text-accent font-medium uppercase">
                  {{ fallbackName }}
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user?.Username }}</span>
                <span class="truncate text-xs">{{ user?.Email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem class="cursor-pointer">
              <Icons.UserRound />
              <RouterLink to="/#">Profile Saya </RouterLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-destructive cursor-pointer" @click="isDialogLogoutOpen = true">
            <Icons.LogOut class="text-destructive" />
            Keluar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <HandleLogout v-model:open="isDialogLogoutOpen" />
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import HandleLogout from './HandleLogout.vue';

import type { User } from '@/types/user';

interface Props {
  user: User | undefined;
}

const isDialogLogoutOpen = ref(false);

const props = defineProps<Props>();

const fallbackName = computed(() => {
  return props.user?.Username.split(' ')
    .map(chunk => chunk[0])
    .join('');
});
const { isMobile } = useSidebar();
</script>
