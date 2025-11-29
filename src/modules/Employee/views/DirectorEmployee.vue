<template>
  <DataPageLayout
    title="Data Pegawai"
    description="Kelola data pegawai Bagor Berdasarkan tahun dan kuartal"
    :is-error="isError"
    :error-message="errorMessage"
    @retry="refetch"
  >
    <DirectorDataTable :loading="isLoading" :data="data?.data" />
    <template #second-card>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Nominasi Pegawai</CardTitle>
          <CardDescription>Daftar Nominasi Yang anda pilih</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="selectionError" class="flex h-64 w-full flex-col items-center justify-center space-y-4">
            <Icons.AlertCircle class="text-destructive h-16 w-16" />
            <div class="text-center">
              <h2 class="text-xl font-semibold">Gagal Memuat Data</h2>
              <p class="text-muted-foreground mt-2">{{ selectionErrorMessage }}</p>
              <Button variant="outline" @click="selectionRefetch" class="mt-4">Coba Lagi</Button>
            </div>
          </div>
          <SelectionDataTable v-else :loading="selectionLoading" :data="selectionData?.data" />
        </CardContent>
      </Card>
    </template>
  </DataPageLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { ERROR_MESSAGES } from '@/constants';
import type { BaseError } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/vue-query';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DataPageLayout from '../components/DataPageLayout.vue';
import DirectorDataTable from '../components/DirectorDataTable.vue';
// Components
import SelectionDataTable from '../components/SelectionDataTable.vue';
import { getNomanationShortlist, getShortlist } from '../services/ranking';

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['shortlist-nominations'],
  queryFn: () => getNomanationShortlist(),
  placeholderData: keepPreviousData,
  retry: false,
  refetchOnWindowFocus: false,
});

const errorMessage = computed(() => {
  if (!error.value) return '';

  const err = error.value as BaseError;
  const status = err.response?.status;
  const dataCode = err.response?.data?.code;

  return (
    (status && ERROR_MESSAGES[status]) ||
    (dataCode && ERROR_MESSAGES[dataCode]) ||
    err.message ||
    'Terjadi kesalahan pada server.'
  );
});

const {
  data: selectionData,
  isLoading: selectionLoading,
  isError: selectionError,
  error: selectionErrorObj,
  refetch: selectionRefetch,
} = useQuery({
  queryKey: ['shortlist'],
  queryFn: () => getShortlist(),
  placeholderData: keepPreviousData,
  retry: false,
  refetchOnWindowFocus: false,
});

const selectionErrorMessage = computed(() => {
  if (!selectionErrorObj.value) return '';

  const err = error.value as BaseError;
  const status = err.response?.status;
  const dataCode = err.response?.data?.code;

  return (
    (status && ERROR_MESSAGES[status]) ||
    (dataCode && ERROR_MESSAGES[dataCode]) ||
    err.message ||
    'Terjadi kesalahan pada server.'
  );
});
</script>
