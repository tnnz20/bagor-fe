<template>
  <header class="flex h-16 shrink-0 items-center gap-2">
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <RouterLink :to="routePath[1] ? `/${routePath[1]}` : '/'">
              <BreadcrumbLink as-child>
                {{ capitalizedSegments[0] || 'Dashboard' }}
              </BreadcrumbLink>
            </RouterLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator v-if="capitalizedSegments.length > 1" class="hidden md:block" />

          <BreadcrumbItem v-if="capitalizedSegments.length > 1" class="hidden md:block">
            <BreadcrumbPage>
              {{ capitalizedSegments[1] }}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

const route = useRoute();
const routePath = computed(() => route.path.split('/'));
const capitalizedSegments = computed(() => {
  return route.path
    .split('/')
    .filter(segment => segment.length > 0)
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1));
});
</script>
