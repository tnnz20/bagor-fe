<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <HeaderSidebar :user="data.user" />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="nav in navItems" :key="nav.title">
              <SidebarMenuButton
                class="p-4"
                :class="
                  cn('hover:bg-primary hover:text-accent h-12 rounded-2xl')
                "
                asChild
              >
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
      <FooterSidebar />
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/types';

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

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '',
  },
};

const navItems: MenuItem[] = [
  {
    title: 'Panduan',
    href: '/dashboard/panduan',
    icon: Icons.BookOpenText,
  },
  {
    title: 'Saran',
    href: '/dashboard/saran',
    icon: Icons.MessageSquareDot,
  },
  {
    title: 'Data Pegawai',
    href: '/dashboard/pegawao',
    icon: Icons.FileText,
  },
  {
    title: 'Pertanyaan',
    href: '/dashboard/pertanyaan',
    icon: Icons.MessageCircleQuestionMark,
  },
  {
    title: 'Berita Acara',
    href: '/dashboard/berita-acara',
    icon: Icons.BookCheck,
  },
];

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: 'inset',
});
</script>
