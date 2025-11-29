<template>
  <DataPageLayout
    title="Data Pegawai"
    description="Kelola data pegawai Bagor Berdasarkan tahun dan kuartal"
    :is-error="isError"
    :error-message="errorMessage"
    @retry="refetch"
  >
    <EmployeeDataTable
      :loading="isLoading"
      :data="data?.data"
      :pagination="data?.pagination"
      v-model:search="searchInput"
      v-model:page="page"
      v-model:page-size="pageSize"
      v-model:filters="filters"
    />

    <Card v-if="userRole === 'manager'">
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
  </DataPageLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { ERROR_MESSAGES } from '@/constants';
import type { BaseError } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/vue-query';

import { useEmployeeFilters } from '@/modules/Employee/composables/useEmployeeFilters';
import { getEmployeesScore } from '@/modules/Employee/services/employee';
import { useUserStore } from '@/stores/user';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DataPageLayout from '../components/DataPageLayout.vue';
// Components
import EmployeeDataTable from '../components/EmployeeDataTable.vue';
import SelectionDataTable from '../components/SelectionDataTable.vue';
import { getNominations } from '../services/ranking';

const { searchInput, page, pageSize, filters } = useEmployeeFilters();

const userStore = useUserStore();
const userRole = userStore.userRole;

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
