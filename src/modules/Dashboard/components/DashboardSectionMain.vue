<template>
  <div class="flex flex-col lg:grid lg:grid-cols-4 lg:gap-6">
    <Card class="col-span-2 rounded-xl p-6 shadow">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-xl font-medium">Pegawai Terbaik</CardTitle>
      </CardHeader>
      <CardContent class="p-6">
        <DashboardTopEmployeeContent :employees="topthreescore" />
      </CardContent>
    </Card>
    <Card class="col-span-2 rounded-xl p-6 shadow">
      <CardHeader>
        <CardTitle>Data Nilai Pegawai</CardTitle>
        <CardDescription>Berikut adalah data nilai pegawai yang telah diperbarui.</CardDescription>
      </CardHeader>
      <CardContent> <DashboardTableContent :employees="employees" /> </CardContent>
      <CardFooter class="flex justify-end">
        <Button variant="outline">
          <RouterLink to="/dashboard/pegawai" class="text-foreground flex items-center gap-2 text-sm font-medium">
            Lihat Seluruh Pegawai
            <Icons.ChevronRight />
          </RouterLink>
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import DashboardTableContent from './section/DashboardTableContent.vue';
import DashboardTopEmployeeContent from './section/DashboardTopEmployeeContent.vue';

import type { Employee } from '@/types/employee';

const employees: Employee[] = [
  {
    id: 1,
    name: 'Ahmad Rahman',
    score: 10.0,
    avatarUrl: 'https://github.com/shadcn.png',
    position: 'ASN',
    created_at: 1672531200, // 2023-01-01 00:00:00
    updated_at: 1704067200, // 2024-01-01 00:00:00
    deleted_at: 1735689600, // 2025-01-01 00:00:00
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    score: 9.8,
    avatarUrl: 'https://github.com/vercel.png',
    position: 'NON-ASN',
    created_at: 1640995200, // 2022-01-01 00:00:00
    updated_at: 1696118400, // 2023-10-01 00:00:00
    deleted_at: 1719792000, // 2024-07-01 00:00:00
  },
  {
    id: 3,
    name: 'Maya Sari',
    score: 9.0,
    avatarUrl: 'https://github.com/nuxt.png',
    position: 'ASN',
    created_at: 1609459200, // 2021-01-01 00:00:00
    updated_at: 1688169600, // 2023-07-01 00:00:00
    deleted_at: 1712534400, // 2024-04-08 00:00:00
  },
  {
    id: 4,
    name: 'Budi Santoso',
    score: 8.5,
    position: 'ASN',
    avatarUrl: 'https://github.com/shadcn.png',
    created_at: 1656633600, // 2022-07-01 00:00:00
    updated_at: 1714521600, // 2024-05-01 00:00:00
    deleted_at: 1743465600, // 2025-04-01 00:00:00
  },
  {
    id: 5,
    name: 'Rina Dewi',
    score: 8.2,
    position: 'NON-ASN',
    avatarUrl: 'https://github.com/shadcn.png',
    created_at: 1577836800, // 2020-01-01 00:00:00
    updated_at: 1669852800, // 2022-12-01 00:00:00
    deleted_at: 1698796800, // 2023-11-01 00:00:00
  },
  {
    id: 6,
    name: 'Andi Wijaya',
    score: 9.3,
    avatarUrl: 'https://github.com/tailwindcss.png',
    position: 'ASN',
    created_at: 1663545600, // 2022-09-19 00:00:00
    updated_at: 1701388800, // 2023-12-01 00:00:00
    deleted_at: 1727740800, // 2024-10-01 00:00:00
  },
  {
    id: 7,
    name: 'Dewi Kusuma',
    score: 7.8,
    position: 'NON-ASN',
    avatarUrl: 'https://github.com/tailwindcss.png',
    created_at: 1622505600, // 2021-06-01 00:00:00
    updated_at: 1680307200, // 2023-04-01 00:00:00
    deleted_at: 1725148800, // 2024-09-01 00:00:00
  },
];

// Top three employees sorted by score
const topthreescore = computed(() => {
  return [...employees].sort((a, b) => b.score - a.score).slice(0, 3);
});
</script>
