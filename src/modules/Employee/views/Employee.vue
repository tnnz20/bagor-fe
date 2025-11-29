<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <!-- Header Section -->
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Data Pegawai</h1>
      <p class="text-muted-foreground">Kelola data pegawai Bagor</p>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Daftar Pegawai</CardTitle>
        <CardDescription> Daftar pegawai berdasarkan tahun dan kuartal</CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="isError" class="flex h-64 w-full flex-col items-center justify-center space-y-4">
          <Icons.AlertCircle class="text-destructive h-16 w-16" />
          <div class="text-center">
            <h2 class="text-xl font-semibold">Gagal Memuat Data</h2>
            <p class="text-muted-foreground mt-2">{{ errorMessage }}</p>
            <Button variant="outline" @click="refetch" class="mt-4">Coba Lagi</Button>
          </div>
        </div>

        <EmployeeDataTable
          v-else
          :loading="isLoading"
          :data="data?.data"
          :pagination="data?.pagination"
          v-model:search="searchInput"
          v-model:page="page"
          v-model:page-size="pageSize"
          v-model:filters="filters"
        />
      </CardContent>
    </Card>
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { ERROR_MESSAGES } from '@/constants';
import type { BaseError } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/vue-query';

import { Icons } from '@/components/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EmployeeDataTable from '../components/EmployeeDataTable.vue';
import SelectionDataTable from '../components/SelectionDataTable.vue';
import { useEmployeeFilters } from '../composables/useEmployeeFilters';
import { getEmployeesScore } from '../services/employee';
import { getNominations } from '../services/ranking';

const { searchInput, page, pageSize, filters } = useEmployeeFilters();

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['scores', page, pageSize, filters],
  queryFn: () => getEmployeesScore({ current_page: page.value, limit: pageSize.value }, { ...filters }),
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
  queryKey: ['nominations'],
  queryFn: () => getNominations(),
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
