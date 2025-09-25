<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <RouterLink to="#">
        <Button
          type="submit"
          class="w-full bg-gray-200 text-black hover:cursor-pointer hover:bg-gray-300"
        >
          <Icons.LogOut />Logout
        </Button>
      </RouterLink>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<script setup lang="ts">
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
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

const { isMobile } = useSidebar();
</script>
