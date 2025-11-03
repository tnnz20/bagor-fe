<template>
  <div class="flex items-end justify-center">
    <template v-for="(employee, index) in employees">
      <!-- 2nd Place -->
      <div v-if="index === 1" :key="employee.id" class="order-1 flex flex-col items-center space-y-3">
        <div class="relative">
          <Avatar :class="cn('h-14 w-14 ring-2 ring-slate-200')">
            <AvatarImage v-if="employee.avatarUrl" :src="employee.avatarUrl" :alt="employee.name" />
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
          <img src="@/assets/images/Rank2.webp" alt="2nd Place" />
        </div>
      </div>

      <!-- 1st Place -->
      <div v-if="index === 0" :key="employee.id" class="order-2 flex flex-col items-center space-y-3">
        <div class="relative">
          <Avatar :class="cn('h-16 w-16 ring-2 ring-yellow-200')">
            <AvatarImage v-if="employee.avatarUrl" :src="employee.avatarUrl" :alt="employee.name" />
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
          <img src="@/assets/images/Rank1.webp" alt="1st Place" />
        </div>
      </div>

      <!-- 3rd Place -->
      <div v-if="index === 2" :key="employee.id" class="order-3 flex flex-col items-center space-y-3">
        <div class="relative">
          <Avatar :class="cn('h-14 w-14 ring-2 ring-slate-200')">
            <AvatarImage v-if="employee.avatarUrl" :src="employee.avatarUrl" :alt="employee.name" />
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
          <img src="@/assets/images/Rank3.webp" alt="3rd Place" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { cn, getInitials } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import type { Employee } from '@/types/employee';

interface DashboardTopEmployeeContentProps {
  employees: Employee[];
}

const { employees } = defineProps<DashboardTopEmployeeContentProps>();
</script>
