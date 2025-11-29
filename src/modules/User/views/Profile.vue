<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Profile Header -->
    <div>
      <h2 class="text-base font-medium sm:text-lg">Profil</h2>
      <p class="text-muted-foreground text-xs sm:text-sm">Kelola informasi profil Anda.</p>
    </div>

    <Separator />

    <!-- Loading State -->
    <div v-if="showLoading && !isError" class="space-y-4 sm:space-y-6">
      <div class="space-y-1.5 sm:space-y-2">
        <Skeleton class="h-3 w-20 sm:h-4 sm:w-24" />
        <Skeleton class="h-9 w-full sm:h-10" />
      </div>
      <div class="space-y-1.5 sm:space-y-2">
        <Skeleton class="h-3 w-20 sm:h-4 sm:w-24" />
        <Skeleton class="h-9 w-full sm:h-10" />
      </div>
      <div class="space-y-1.5 sm:space-y-2">
        <Skeleton class="h-3 w-20 sm:h-4 sm:w-24" />
        <Skeleton class="h-9 w-full sm:h-10" />
      </div>
      <Skeleton class="h-px w-full" />
      <div class="space-y-1.5 sm:space-y-2">
        <Skeleton class="h-3 w-20 sm:h-4 sm:w-24" />
        <Skeleton class="h-9 w-full sm:h-10" />
      </div>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div class="space-y-1.5 sm:space-y-2">
          <Skeleton class="h-3 w-20 sm:h-4 sm:w-24" />
          <Skeleton class="h-9 w-full sm:h-10" />
        </div>
        <div class="space-y-1.5 sm:space-y-2">
          <Skeleton class="h-3 w-20 sm:h-4 sm:w-24" />
          <Skeleton class="h-9 w-full sm:h-10" />
        </div>
      </div>
      <div class="space-y-1.5 sm:space-y-2">
        <Skeleton class="h-3 w-20 sm:h-4 sm:w-24" />
        <Skeleton class="h-20 w-full sm:h-24" />
      </div>
      <div class="flex justify-end pt-2">
        <Skeleton class="h-8 w-full sm:h-9 sm:w-32" />
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="isError" class="flex flex-col items-center justify-center space-y-3 py-6 sm:space-y-4 sm:py-8">
      <Icons.AlertCircle class="text-destructive h-8 w-8 sm:h-12 sm:w-12" />
      <div class="text-center">
        <h3 class="text-sm font-medium sm:text-base">Gagal Memuat Data</h3>
        <p class="text-muted-foreground text-xs sm:text-sm">{{ errorMessage }}</p>
      </div>
      <Button variant="outline" size="sm" @click="refetch">
        <Icons.RefreshCcw class="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        Coba Lagi
      </Button>
    </div>

    <!-- Profile Form -->
    <ProfileForm v-else-if="data?.data" :user-data="data.data" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { BaseError } from '@/types';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import ProfileForm from '../components/setting/ProfileForm.vue';
import { getUserDetailById } from '../services/user';

const userStore = useUserStore();
const { userId } = storeToRefs(userStore);

// Fetch user detail - uses reactive userId in queryKey
const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
  queryKey: computed(() => ['user-profile', userId.value]),
  queryFn: () => getUserDetailById(userId.value),
  enabled: computed(() => !!userId.value),
});

// Combined loading state (initial load or waiting for userId)
const showLoading = computed(() => isLoading.value || isFetching.value || !userId.value);

// Error message
const errorMessage = computed(() => {
  if (!error.value) return '';
  const err = error.value as BaseError;
  return err.response?.data?.error?.error_description || err.message || 'Terjadi kesalahan pada server.';
});
</script>
