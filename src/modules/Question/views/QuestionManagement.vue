<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Kelola Pertanyaan</h1>
        <p class="text-muted-foreground">Kelola pertanyaan untuk Penilaian</p>
      </div>
      <Button class="cursor-pointer" @click="isAddQuestionDialogOpen = true">
        <Icons.Plus class="mr-2 h-4 w-4" />
        Tambah Pertanyaan
      </Button>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Daftar Pertanyaan</CardTitle>
        <CardDescription> Daftar Pertanyaan yang tersedia</CardDescription>
      </CardHeader>
      <CardContent>
        <!-- Loading State -->
        <div v-if="isLoading" class="flex min-h-64 w-full items-center justify-center">
          <div class="flex flex-col items-center gap-2">
            <Icons.Loader2 class="text-primary h-16 w-16 animate-spin" />
            <p class="text-muted-foreground">Memuat data...</p>
          </div>
        </div>

        <div v-else-if="hasError" class="flex h-64 w-full flex-col items-center justify-center space-y-4">
          <Icons.AlertCircle class="text-destructive h-16 w-16" />
          <div class="text-center">
            <h2 class="text-xl font-semibold">Gagal Memuat Data</h2>
            <p class="text-muted-foreground mt-2">
              {{ errorMessage }}
            </p>
          </div>
        </div>

        <QuestionContentList :error="error" :data="data?.data" />
      </CardContent>
    </Card>
    <QuestionAddDialog v-model="isAddQuestionDialogOpen" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { keepPreviousData, useQuery } from '@tanstack/vue-query';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import QuestionAddDialog from '../components/question-management/QuestionAddDialog.vue';
import QuestionContentList from '../components/question-management/QuestionContentList.vue';
import { getQuestionList } from '../services/question';

const isAddQuestionDialogOpen = ref(false);

const { data, isLoading, error } = useQuery({
  queryKey: computed(() => ['questions']),
  queryFn: () => getQuestionList(),
  placeholderData: keepPreviousData,
  retry: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
});

const hasError = computed(() => {
  const err = error.value as any;
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
