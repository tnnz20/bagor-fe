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
        <CardDescription> Daftar pegawai berdasarkan tahun dan bulan</CardDescription>
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

        <EmployeeDataTable
          v-else
          :data="data?.data"
          :pagination="data?.pagination"
          v-model:search="searchInput"
          v-model:page="Page"
          v-model:page-size="PageSize"
          v-model:filters="filters"
        />
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { useDebounceFn } from '@vueuse/core';

import { Icons } from '@/components/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EmployeeDataTable from '../components/EmployeeDataTable.vue';
import { getEmployeesScore } from '../services/employee';

import type { FilterEmployees } from '@/types/employee';

const route = useRoute();
const router = useRouter();

// Search State
const searchInput = ref<string>((route.query.search as string) || '');

// Pagination State
const Page = ref<number>(Number.parseInt((route.query.page as string) || '1', 10));
const PageSize = ref<number>(Number.parseInt((route.query.pageSize as string) || '10', 10));

// Filters State
const filters = reactive<FilterEmployees>({
  department: (route.query.department as string) || 'all',
  employeeType: (route.query.employeeType as string) || 'all',
  search: (route.query.search as string) || '',
});

const filtersForQuery = computed(() => {
  const query: Record<string, string> = {};

  if (filters.search?.trim()) query.search = filters.search.trim();
  if (filters.department !== 'all') query.department = filters.department;
  if (filters.employeeType !== 'all') query.employeeType = filters.employeeType;

  return query;
});

const updateQueryParams = () => {
  router.replace({
    query: {
      ...filtersForQuery.value,
      page: Page.value.toString(),
      pageSize: PageSize.value.toString(),
    },
  });
};

// SEARCH — Debounced
const debouncedSearchUpdate = useDebounceFn(() => {
  filters.search = searchInput.value;
  Page.value = 1;
  updateQueryParams();
}, 500);

watch(searchInput, debouncedSearchUpdate);

// FILTERS — Reset page to 1, no debounce
watch(
  () => ({
    department: filters.department,
    employeeType: filters.employeeType,
  }),
  () => {
    Page.value = 1;
    updateQueryParams();
  }
);

// PAGINATION — No reset
watch([Page, PageSize], () => {
  updateQueryParams();
});

const { data, isLoading, error } = useQuery({
  queryKey: computed(() => ['score', Page.value, PageSize.value, { ...filters }]),
  queryFn: () => getEmployeesScore({ current_page: Page.value, limit: PageSize.value }, { ...filters }),
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
