<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <HeaderSidebar />
    </SidebarHeader>
    <SidebarContent>
      <!-- Todo: Make it a Components -->
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="nav in navItems" :key="nav.title">
              <SidebarMenuButton asChild>
                <a :href="nav.href">
                  <component :is="nav.icon" />
                  <span>{{ nav.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <FooterSidebar :user="data.user" />
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/types';

import { Icons } from '@/components/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  type SidebarProps,
} from '@/components/ui/sidebar';
import FooterSidebar from './sidebar/FooterSidebar.vue';
import HeaderSidebar from './sidebar/HeaderSidebar.vue';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
};

const navItems: MenuItem[] = [
  {
    title: 'Home',
    href: '#',
    icon: Icons.Home,
  },
  {
    title: 'Inbox',
    href: '#',
    icon: Icons.Inbox,
  },
  {
    title: 'Calendar',
    href: '#',
    icon: Icons.Calendar,
  },
  {
    title: 'Search',
    href: '#',
    icon: Icons.Search,
  },
  {
    title: 'Settings',
    href: '#',
    icon: Icons.Settings,
  },
];

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: 'inset',
});
</script>
