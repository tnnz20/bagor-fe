<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <RouterLink to="#">
        <Button :class="cn('hover:bg-primary hover:text-accent w-full')" variant="outline" @click="onLogout">
          <Icons.LogOut />Logout
        </Button>
      </RouterLink>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';

const router = useRouter();

const authStore = useAuthStore();
const onLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
