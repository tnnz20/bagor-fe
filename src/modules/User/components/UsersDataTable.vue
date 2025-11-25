<template>
  <div class="w-full space-y-4">
    <!-- Filter and Search Section -->
    <div class="flex items-center justify-between py-4">
      <div class="relative w-full max-w-sm">
        <Input v-model="search" placeholder="Cari pengguna..." class="pr-10" :disabled="loading" />
        <Button
          v-if="search"
          variant="ghost"
          size="icon"
          class="absolute inset-y-0 right-1 my-auto h-6 w-6 cursor-pointer rounded-full p-0"
          @click="search = ''"
        >
          <Icons.X class="h-4 w-4" />
        </Button>
      </div>

      <div class="flex items-center space-x-2">
        <!-- Filter Popover -->
        <UsersDataFilter v-model:filters="filters" :loading="loading" />
        <!-- Column Visibility -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm">
              <Icons.Filter class="mr-2 h-4 w-4" />
              Kolom
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Tampilkan Kolom</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              v-for="column in table.getAllColumns().filter(column => column.getCanHide())"
              :key="column.id"
              class="capitalize"
              :modelValue="column.getIsVisible()"
              @update:modelValue="
                value => {
                  column.toggleVisibility(!!value);
                }
              "
            >
              {{ columnLabels[column.id] ?? column.id }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Table Container -->
    <div class="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <!-- Loading Skeleton State -->
          <template v-if="loading">
            <TableRow v-for="i in 5" :key="i">
              <TableCell v-for="cell in UserColumns.length" :key="cell">
                <Skeleton class="h-6 w-full rounded" />
              </TableCell>
            </TableRow>
          </template>

          <!-- Data State -->
          <template v-else-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>

          <!-- Empty State -->
          <template v-else>
            <TableRow>
              <TableCell :colspan="UserColumns.length" class="h-64 text-center">
                <div class="flex flex-col items-center justify-center space-y-3">
                  <div class="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
                    <Icons.Search class="text-muted-foreground h-6 w-6" />
                  </div>
                  <div class="space-y-1">
                    <h3 class="font-medium">Tidak ada pengguna</h3>
                    <p class="text-muted-foreground text-sm">Coba sesuaikan kata kunci pencarian atau filter Anda.</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between px-2">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">Baris per halaman</p>
        <Select :model-value="PageSize.toString()" @update:model-value="val => (PageSize = Number(val))">
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="PageSize.toString()" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="size in [10, 20, 30, 40, 50]" :key="size" :value="size.toString()">
              {{ size }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="flex items-center space-x-4">
        <div class="flex w-[120px] items-center justify-center text-sm font-medium">
          <p class="hidden md:block">Halaman {{ Page }} dari {{ totalPages }}</p>
        </div>
        <div class="flex items-center space-x-2">
          <Button
            variant="outline"
            class="hidden h-8 w-8 p-0 lg:flex"
            :disabled="Page <= 1 || loading"
            @click="Page = 1"
          >
            <span class="sr-only">First</span>
            <Icons.ChevronsLeft class="h-4 w-4" />
          </Button>
          <Button variant="outline" class="h-8 w-8 p-0" :disabled="Page <= 1 || loading" @click="Page -= 1">
            <span class="sr-only">Previous</span>
            <Icons.ChevronLeft class="h-4 w-4" />
          </Button>
          <Button variant="outline" class="h-8 w-8 p-0" :disabled="Page >= totalPages || loading" @click="Page += 1">
            <span class="sr-only">Next</span>
            <Icons.ChevronRight class="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            class="hidden h-8 w-8 p-0 lg:flex"
            :disabled="Page >= totalPages || loading"
            @click="Page = totalPages"
          >
            <span class="sr-only">Last</span>
            <Icons.ChevronsRight class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { PaginationMeta } from '@/types';
import { FlexRender, getCoreRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserColumns } from '../table/user_columns';
import UsersDataFilter from './UsersDataFilter.vue';

import type { Department, EmployeeType } from '@/types/employee';
import type { FilterUsers, UserDetail, UserTableColumn } from '@/types/user';

interface UsersDataTableProps {
  data?: UserDetail[] | null;
  pagination?: PaginationMeta;
  loading?: boolean;
}

const props = withDefaults(defineProps<UsersDataTableProps>(), {
  data: () => [],
  loading: false,
});

// Model
const search = defineModel<string>('search', { default: '' });
const PageSize = defineModel<number>('pageSize', { default: 10 });
const Page = defineModel<number>('page', { default: 1 });
const filters = defineModel<FilterUsers>('filters', {
  default: () => ({
    department: 'all',
    employeeType: 'all',
    role: 'all',
    search: '',
    sort_order: 'ASC',
  }),
});

const totalPages = computed(() => props.pagination?.total_pages || 1);

const columnLabels: Record<string, string> = {
  name: 'Nama',
  departement: 'Divisi',
  position: 'Jabatan',
  employeeType: 'Jenis Pegawai',
  updated_at: 'Terakhir Diperbarui',
};

// Filter out deleted users
const tableData = computed<UserTableColumn[]>(() => {
  if (!props.data) return [];

  return props.data.map(user => ({
    id: user.id,
    name: user.profile?.full_name ?? user.username,
    department: user.employee_detail?.department as Department,
    position: user.employee_detail?.position ?? '-',
    employeeType: user.employee_detail?.employee_type as EmployeeType,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
    is_deleted: user.is_deleted,
  }));
});

// Table configuration
const table = useVueTable({
  data: tableData,
  columns: UserColumns,
  manualPagination: true,
  manualFiltering: true,
  rowCount: props.pagination?.total_rows ?? 0,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});

const handleReset = () => {
  filters.value.department = 'all';
  filters.value.employeeType = 'all';
  filters.value.role = 'all';
  filters.value.sort_order = 'ASC';
};
</script>
