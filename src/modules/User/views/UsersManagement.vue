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

        <UsersDataTable
          v-else
          :data="data?.data"
          v-model:search="searchInput"
          v-model:page="Page"
          v-model:page-size="PageSize"
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

// Search State
const searchInput = ref<string>((route.query.search as string) || '');

// Pagination State
const Page = ref<number>(Number.parseInt((route.query.page as string) || '1', 10));
const PageSize = ref<number>(Number.parseInt((route.query.pageSize as string) || '10', 10));

// Filters State
const filters = reactive<FilterUsers>({
  department: (route.query.department as string) || 'all',
  employeeType: (route.query.employeeType as string) || 'all',
  role: (route.query.role as string) || 'all',
  search: (route.query.search as string) || '',
});

const filtersForQuery = computed(() => {
  const query: Record<string, string> = {};

  if (filters.search?.trim()) query.search = filters.search.trim();
  if (filters.department !== 'all') query.department = filters.department;
  if (filters.employeeType !== 'all') query.employeeType = filters.employeeType;
  if (filters.role !== 'all') query.role = filters.role;

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
    role: filters.role,
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
  queryKey: computed(() => ['users', Page.value, PageSize.value, { ...filters }]),
  queryFn: () => getUserList({ page: Page.value, limit: PageSize.value }, { ...filters }),
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

// Computed statistics
// const totalUsers = computed(() => users.value.length);
// const fungsionalUsers = computed(() => users.value.filter(u => u.employeeType === 'Fungsional').length);
// const strukturalUsers = computed(() => users.value.filter(u => u.employeeType === 'Struktural').length);
// const kontrakUsers = computed(() => users.value.filter(u => u.employeeType === 'Kontrak').length);
// const newUsersThisMonth = computed(() => {
//   const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
//   return users.value.filter(u => u.created_at > oneMonthAgo).length;
// });
</script>
