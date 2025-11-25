<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Kelola Pengguna</h1>
        <p class="text-muted-foreground">Kelola akun pengguna bagor</p>
      </div>
      <Button @click="isAddUserDialogOpen = true" class="cursor-pointer">
        <Icons.UserRoundPlus class="mr-2 h-4 w-4" />
        Tambah Pengguna
      </Button>
    </div>

    <!-- Stats Cards -->
    <!-- <UsersStatsCard
      :total-users="totalUsers"
      :total-users-with-position-fungsional="fungsionalUsers"
      :total-users-with-position-struktural="strukturalUsers"
      :total-users-with-position-kontrak="kontrakUsers"
      :new-users-this-month="newUsersThisMonth"
    /> -->

    <!-- Users Table -->
    <Card>
      <CardHeader>
        <CardTitle>Daftar Pengguna</CardTitle>
        <CardDescription> Daftar seluruh pengguna dalam sistem beserta peran dan status mereka </CardDescription>
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

        <UsersDataTable
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

    <UsersAddDialog v-model="isAddUserDialogOpen" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { BaseError } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { useDebounceFn } from '@vueuse/core';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UsersAddDialog from '../components/dialog/UsersAddDialog.vue';
import UsersDataTable from '../components/UsersDataTable.vue';
import { getUserList } from '../services/user';

import type { FilterUsers } from '@/types/user';

const route = useRoute();
const router = useRouter();

// Dialog State
const isAddUserDialogOpen = ref(false);

// --- State Initialization (Search, Pagination, Filters from URL) ---
const searchInput = ref<string>((route.query.search as string) || '');
const page = ref<number>(Number(route.query.page) || 1);
const pageSize = ref<number>(Number(route.query.pageSize) || 10);

// Filters State
const filters = reactive<FilterUsers>({
  department: (route.query.department as string) || 'all',
  employeeType: (route.query.employeeType as string) || 'all',
  role: (route.query.role as string) || 'all',
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
  if (filters.role !== 'all') query.role = filters.role;
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

// Handle Filter Dropdowns (Immediate)
watch(
  () => [filters.department, filters.employeeType, filters.role, filters.sort_order],
  () => {
    page.value = 1; // Reset to page 1 on filter change
    syncUrl();
  }
);

// Handle Pagination (Immediate)
watch([page, pageSize], syncUrl);

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['users', page, pageSize, filters],
  queryFn: () => getUserList({ current_page: page.value, limit: pageSize.value }, filters),
  placeholderData: keepPreviousData, // Keeps old table data while fetching new page
  retry: false,
  refetchOnWindowFocus: false,
});

const errorMessage = computed(() => {
  if (!error.value) return '';

  const err = error.value as BaseError;
  const messages: Record<number, string> = {
    400: 'Permintaan tidak valid',
    500: 'Server error. Silahkan coba lagi nanti.',
  };

  const errorCode = err?.response?.data?.code;
  return (errorCode ? messages[errorCode] : undefined) || err.message || 'Terjadi kesalahan pada server.';
});
</script>
