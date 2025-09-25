<template>
  <div class="flex flex-col lg:grid lg:grid-cols-5 lg:gap-6">
    <Card class="col-span-3 rounded-xl p-6 shadow">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-xl font-medium">Pegawai Terbaik</CardTitle>
      </CardHeader>
      <CardContent class="p-6">
        <div class="flex items-end justify-center">
          <!-- 2nd Place -->
          <template v-for="(employee, index) in topthreescore">
            <div v-if="index === 1" :key="employee.id" class="order-1 flex flex-col items-center space-y-3">
              <div class="relative">
                <Avatar :class="cn('h-14 w-14 ring-2 ring-slate-200')">
                  <AvatarImage v-if="employee.avatar" :src="employee.avatar" :alt="employee.name" />
                  <AvatarFallback class="bg-slate-100 font-medium text-slate-600">
                    {{ getInitials(employee.name) }}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div class="text-center">
                <p class="text-foreground text-sm font-medium">{{ employee.name }}</p>
                <div
                  class="bg-primary text-primary-foreground mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {{ employee.score }}
                </div>
              </div>
              <div class="relative">
                <img src="@/assets/images/Rank2.png" alt="2nd Place" />
              </div>
            </div>

            <!-- 1st Place -->
            <div v-if="index === 0" :key="employee.id" class="order-2 flex flex-col items-center space-y-3">
              <div class="relative">
                <Avatar :class="cn('h-16 w-16 ring-2 ring-yellow-200')">
                  <AvatarImage v-if="employee.avatar" :src="employee.avatar" :alt="employee.name" />
                  <AvatarFallback class="bg-yellow-50 font-semibold text-slate-600">
                    {{ getInitials(employee.name) }}
                  </AvatarFallback>
                </Avatar>
                <!-- Crown Icon -->
                <div class="absolute -top-2 left-1/2 -translate-x-1/2">
                  <svg class="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
              </div>
              <div class="text-center">
                <p class="text-foreground text-sm font-semibold">{{ employee.name }}</p>
                <div
                  class="bg-primary text-primary-foreground mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold"
                >
                  {{ employee.score }}
                </div>
              </div>
              <div class="relative">
                <img src="@/assets/images/Rank1.png" alt="1st Place" />
              </div>
            </div>

            <!-- 3rd Place -->
            <div v-if="index === 2" :key="employee.id" class="order-3 flex flex-col items-center space-y-3">
              <div class="relative">
                <Avatar :class="cn('h-14 w-14 ring-2 ring-slate-200')">
                  <AvatarImage v-if="employee.avatar" :src="employee.avatar" :alt="employee.name" />
                  <AvatarFallback class="bg-slate-100 font-medium text-slate-600">
                    {{ getInitials(employee.name) }}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div class="text-center">
                <p class="text-foreground text-sm font-medium">{{ employee.name }}</p>
                <div
                  class="bg-primary text-primary-foreground mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {{ employee.score }}
                </div>
              </div>
              <div class="relative">
                <img src="@/assets/images/Rank3.png" alt="3rd Place" />
              </div>
            </div>
          </template>
        </div>
      </CardContent>
    </Card>
    <Card class="col-span-2 rounded-xl p-6 shadow">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-xl font-medium">Data Nilai Pegawai</CardTitle>
      </CardHeader>
      <CardContent class="p-6"> Table </CardContent>
      <CardFooter>
        <Button variant="outline">
          <RouterLink to="/dashboard/employees" class="text-foreground flex items-center gap-2 text-sm font-medium">
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

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Employee data type
interface Employee {
  id: number;
  name: string;
  score: number;
  avatar?: string;
  position: string;
}

const employees: Employee[] = [
  {
    id: 1,
    name: 'Ahmad Rahman',
    score: 10.0,
    avatar: 'https://github.com/shadcn.png',
    position: 'ASN',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    score: 9.8,
    avatar: 'https://github.com/vercel.png',
    position: 'NON-ASN',
  },
  {
    id: 3,
    name: 'Maya Sari',
    score: 9.0,
    avatar: 'https://github.com/nuxt.png',
    position: 'ASN',
  },
  {
    id: 4,
    name: 'Budi Santoso',
    score: 8.5,
    position: 'ASN',
  },
  {
    id: 5,
    name: 'Rina Dewi',
    score: 8.2,
    position: 'NON-ASN',
  },
];

// Helper function to generate initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n: string) => n[0])
    .join('');
};

// Top three employees sorted by score
const topthreescore = computed(() => {
  return [...employees].sort((a, b) => b.score - a.score).slice(0, 3);
});
</script>
