<template>
  <div class="hidden h-dvh flex-col md:flex">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex h-full w-full items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <Icons.Loader2 class="text-primary h-16 w-16 animate-spin" />
        <p class="text-muted-foreground text-lg">Memuat data...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="hasError" class="flex h-full w-full flex-col items-center justify-center space-y-4">
      <Icons.AlertCircle class="text-destructive h-16 w-16" />
      <div class="text-center">
        <h2 class="text-2xl font-semibold">Gagal Memuat Data</h2>
        <p class="text-muted-foreground mt-2">
          {{ errorMessage }}
        </p>
      </div>
      <Button @click="refetch" variant="outline">
        <Icons.RefreshCcw class="mr-2 h-4 w-4" />
        Coba Lagi
      </Button>
    </div>

    <!-- Success State (including 404 which will be handled by FeedbackList) -->
    <FeedbackContent
      v-else
      :data="data?.data"
      :pagination="data?.pagination"
      :error="error"
      v-model:page="page"
      v-model:limit="limit"
      v-model:is-read="isRead"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import type { BaseError } from '@/types';
import { useQuery } from '@tanstack/vue-query';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import FeedbackContent from '../components/FeedbackContent.vue';
import { getFeedbackList } from '../services/feedback';

const route = useRoute();
// Pagination state
const page = ref(1);
const limit = ref(8);

// IsRead State (undefined = all, false = unread, true = read)
const isRead = ref<boolean | undefined>(route.query.tabs === 'unread' ? false : undefined);

const { data, isLoading, error, refetch } = useQuery({
  queryKey: computed(() => ['feedbacks', page.value, limit.value, isRead.value]),
  queryFn: () => getFeedbackList({ current_page: page.value, limit: limit.value }, isRead.value),
  retry: 1,
  staleTime: 5 * 60 * 1000,
});

const hasError = computed(() => {
  const err = error.value as BaseError;
  if (err?.response?.status === 404) {
    return false;
  }
  return !!error.value;
});

const errorMessage = computed(() => {
  if (!error.value) return '';

  const err = error.value as any;
  const messages: Record<number, string> = {
    400: 'Permintaan tidak valid',
    500: 'Server error. Silahkan coba lagi nanti.',
  };

  return messages[err.response?.status] || err.message || 'Terjadi kesalahan';
});
</script>
