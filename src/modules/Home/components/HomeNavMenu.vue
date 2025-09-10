<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useAttrs } from 'vue';

const attrs = useAttrs(); // forward semua atribut/props ke NavigationMenu

const menuLinks = [
  { title: 'Home', href: '#' },
  { title: 'Blog', href: '#' },
  { title: 'About', href: '#' },
  { title: 'Contact Us', href: '#' },
];
</script>

<template>
  <NavigationMenu v-bind="attrs">
    <NavigationMenuList
      class="gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start"
    >
      <NavigationMenuItem v-for="(link, index) in menuLinks" :key="index">
        <NavigationMenuLink as-child>
          <RouterLink :to="link.href">{{ link.title }}</RouterLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
