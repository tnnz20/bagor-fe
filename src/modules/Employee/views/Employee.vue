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
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { ERROR_MESSAGES } from '@/constants';
import type { BaseError } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { useDebounceFn } from '@vueuse/core';

import { useUserStore } from '@/stores/user';

import { Icons } from '@/components/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EmployeeDataTable from '../components/EmployeeDataTable.vue';
import { getEmployeesScore } from '../services/employee';

import type { FilterEmployees } from '@/types/employee';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const requiredDepartmentFilter = computed(() => {
  if (userStore.userRole !== 'admin' && userStore.userDepartmentCode) {
    return userStore.userDepartmentCode;
  }
  return 'all';
});

// Search State
const searchInput = ref<string>((route.query.search as string) || '');

// Pagination State
const page = ref<number>(Number(route.query.page) || 1);
const pageSize = ref<number>(Number(route.query.pageSize) || 10);

const initialDepartment = (route.query.department as string) || 'all';

// Filters State
const filters = reactive<FilterEmployees>({
  department: initialDepartment,
  employeeType: (route.query.employeeType as string) || 'all',
  search: (route.query.search as string) || '',
  sort_order: (route.query.sort_order as 'ASC' | 'DESC') || 'ASC',
});

const activeFiltersForUrl = computed(() => {
  const query: Record<string, string> = {
    page: page.value.toString(),
    pageSize: pageSize.value.toString(),
  };

  if (filters.search?.trim()) query.search = filters.search.trim();
  if (filters.department !== 'all') query.department = filters.department;
  if (filters.employeeType !== 'all') query.employeeType = filters.employeeType;
  if (filters.sort_order) query.sort_order = filters.sort_order;

  return query;
});

const syncUrl = () => {
  router.replace({ query: activeFiltersForUrl.value });
};

// Handle Search Input (Debounced)
const handleSearchUpdate = useDebounceFn((newVal: string) => {
  filters.search = newVal;
  page.value = 1; // Reset to page 1 on new search
  syncUrl();
}, 500);

watch(searchInput, handleSearchUpdate);

// Watch for user's role/department code to load/change.
watch(
  requiredDepartmentFilter,
  newRequiredDepartment => {
    if (newRequiredDepartment === 'all') {
      // Admin: If previously restricted by URL, reset to 'all' if the URL parameter isn't set.
      if (!route.query.department) {
        filters.department = 'all';
      }
    } else {
      // Manager/Restricted Role: FORCE filter to their department code, overriding URL query if it conflicts.
      filters.department = newRequiredDepartment;
    }
    page.value = 1;
    syncUrl();
  },
  { immediate: true }
);

// Handle Filter Dropdowns (Immediate)
watch(
  () => [filters.department, filters.employeeType, filters.sort_order],
  () => {
    page.value = 1; // Reset to page 1 on filter change
    syncUrl();
  }
);

// Handle Pagination (Immediate)
watch([page, pageSize], syncUrl);

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
</script>
