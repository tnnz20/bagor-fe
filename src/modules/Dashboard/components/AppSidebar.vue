<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <HeaderSidebar />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="nav in filteredNavItems" :key="nav.title">
              <SidebarMenuButton class="p-4" :class="cn('hover:bg-primary hover:text-accent h-12 rounded-2xl')" asChild>
                <RouterLink :to="{ path: `/${nav.href}` }" exactActiveClass="bg-primary text-accent">
                  <component :is="nav.icon" />
                  <span>{{ nav.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <FooterSidebar :user="userData" />
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { MenuItem } from '@/types';
import { useQuery } from '@tanstack/vue-query';

import { cn } from '@/lib/utils';

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

import type { BaseApi } from '@/types/index';
import type { User } from '@/types/user';

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: 'inset',
});

const { data } = useQuery<BaseApi<User>>({
  queryKey: ['user'],
  staleTime: 5 * 60 * 1000,
});

const userData = computed(() => {
  return data.value?.data || undefined;
});

const currentUserRole = computed(() => {
  return (data.value && (data.value as any).data && (data.value as any).data.Role) || null;
});

const navItems: MenuItem[] = [
  {
    title: 'Dashboard',
    href: 'dashboard',
    icon: Icons.Home,
    role: ['admin'],
  },
  {
    title: 'Panduan',
    href: 'panduan',
    icon: Icons.BookOpenText,
    role: ['admin', 'manager', 'employee'],
  },
  {
    title: 'Saran',
    href: 'saran',
    icon: Icons.MessageSquareDot,
    role: ['admin', 'employee'],
  },
  {
    title: 'Masukan Pengguna',
    href: 'masukan',
    icon: Icons.MessageSquareDot,
    role: ['admin'],
  },

  {
    title: 'Data Pegawai',
    href: 'pegawai',
    icon: Icons.FileText,
    role: ['admin', 'manager'],
  },
  {
    title: 'Pertanyaan',
    href: 'pertanyaan',
    icon: Icons.MessageCircleQuestionMark,
    role: ['admin', 'manager'],
  },
  {
    title: 'Berita Acara',
    href: 'berita-acara',
    icon: Icons.BookCheck,
    role: ['admin', 'manager'],
  },
  {
    title: 'Kelola Pengguna',
    href: 'users',
    icon: Icons.Users,
    role: ['admin'],
  },
];

// Filter nav items based on user's role. If no role available, show only items allowed for 'employee' (or none depending on requirement)
const filteredNavItems = computed(() => {
  const role = currentUserRole.value;
  if (!role) return [];

  return navItems.filter(item => item.role.includes(role));
});
</script>
