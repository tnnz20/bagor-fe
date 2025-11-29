<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Berita Acara</h1>
        <p class="text-muted-foreground">Kelola dokumen berita acara</p>
      </div>
      <BeritaAcaraNew />
    </div>

    <!-- Content Section -->
    <Card>
      <CardHeader>
        <CardTitle>Daftar Berita Acara</CardTitle>
        <CardDescription>Daftar seluruh berita acara yang telah diupload ke sistem</CardDescription>
      </CardHeader>
      <CardContent>
        <!-- Error State -->
        <div v-if="isError" class="flex h-64 w-full flex-col items-center justify-center space-y-4">
          <Icons.AlertCircle class="text-destructive h-16 w-16" />
          <div class="text-center">
            <h2 class="text-xl font-semibold">Gagal Memuat Data</h2>
            <p class="text-muted-foreground mt-2">{{ errorMessage }}</p>
            <Button variant="outline" @click="refetch" class="mt-4">
              <Icons.RefreshCcw class="mr-2 h-4 w-4" />
              Coba Lagi
            </Button>
          </div>
        </div>

        <!-- Data Table -->
        <BeritaAcaraDataTable v-else :data="data?.data ?? undefined" :loading="isLoading" />
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { BaseError } from '@/types';
import { useQuery } from '@tanstack/vue-query';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BeritaAcaraDataTable from '../components/BeritaAcaraDataTable.vue';
import BeritaAcaraNew from '../components/dialog/BeritaAcaraNewDialog.vue';
import { getBeritaAcaraList } from '../services/berita-acara';

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['berita-acara'],
  queryFn: getBeritaAcaraList,
  retry: false,
  refetchOnWindowFocus: false,
});

const errorMessage = computed(() => {
  if (!error.value) return '';

  const err = error.value as BaseError;
  return err.response?.data?.error?.error_description || err.message || 'Terjadi kesalahan pada server.';
});
</script>
