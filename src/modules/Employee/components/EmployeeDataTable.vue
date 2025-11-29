<template>
  <div class="w-full space-y-4">
    <!-- Filter and Search Section -->
    <div class="flex items-center justify-between py-4">
      <div class="relative w-full max-w-sm">
        <Input v-model="search" placeholder="Cari pegawai..." class="pr-10" />

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
        <EmployeeDataFilter v-model:filters="filters" :loading="loading" />
        <!-- Column Visibility -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm">
              <Icons.Filter class="mr-2 h-4 w-4" />
              Filter Kolom
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Toggle Kolom</DropdownMenuLabel>
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

    <!-- Data Table -->
    <div class="rounded-md border">
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
          <template v-if="(pagination?.total_rows as number) > 0">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <!-- Empty State -->
          <TableRow v-else>
            <TableCell :colspan="EmployeeColumns.length" class="h-24 text-center">
              <div class="flex flex-col items-center justify-center space-y-2">
                <Icons.Search class="text-muted-foreground h-8 w-8" />
                <p class="text-muted-foreground">Tidak ada pegawai yang ditemukan.</p>
              </div>
            </TableCell>
          </TableRow>
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmployeeColumns } from '../table/employee_columns';
import EmployeeDataFilter from './EmployeeDataFilter.vue';

import type { DepartmentCode, EmployeeScore, EmployeeType, FilterEmployees } from '@/types/employee';
import type { UserRole } from '@/types/user';

interface EmployeeDataTableProps {
  data?: EmployeeScore[] | null;
  pagination?: PaginationMeta;
  loading?: boolean;
}

const props = withDefaults(defineProps<EmployeeDataTableProps>(), {
  data: () => [],
  loading: false,
});

// Model
const search = defineModel<string>('search', { default: '' });
const PageSize = defineModel<number>('pageSize', { default: 10 });
const Page = defineModel<number>('page', { default: 1 });
const filters = defineModel<FilterEmployees>('filters', {
  default: () => ({
    department: 'all',
    employeeType: 'all',
    search: '',
    sort_order: 'ASC',
  }),
});

const totalPages = computed(() => props.pagination?.total_pages || 1);

const columnLabels: Record<string, string> = {
  full_name: 'Nama',
  department_code: 'Divisi',
  position: 'Jabatan',
  employee_type: 'Jenis Pegawai',
  presence_score: 'Skor Presensi',
  survey_score: 'Skor Survei',
  attendance_delay_seconds: 'Total Keterlambatan',
  updated_at: 'Terakhir Diperbarui',
};

const tableData = computed<EmployeeScore[]>(() => {
  if (!props.data) return [];

  return props.data.map((employee: EmployeeScore) => ({
    score_id: employee.score_id,
    user_id: employee.user_id,
    role: employee.role as UserRole,
    full_name: employee.full_name,
    employee_type: employee.employee_type as EmployeeType,
    department_code: employee.department_code as DepartmentCode,
    presence_score: employee.presence_score,
    survey_score: employee.survey_score,
    attendance_delay_seconds: employee.attendance_delay_seconds,
    quarter: employee.quarter,
    year: employee.year,
    created_at: employee.created_at,
    updated_at: employee.updated_at,
  }));
});

// Table configuration
const table = useVueTable({
  data: tableData,
  columns: EmployeeColumns,
  manualPagination: true,
  manualFiltering: true,
  rowCount: props.pagination?.total_rows ?? 0,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});
</script>
