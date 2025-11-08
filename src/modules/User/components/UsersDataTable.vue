<template>
  <div class="w-full space-y-4">
    <!-- Filter and Search Section -->
    <div class="flex items-center justify-between py-4">
      <div class="relative w-full max-w-sm">
        <Input v-model="search" placeholder="Cari pengguna..." class="pr-10" />

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
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" class="ml-auto">
              Filter Data
              <Icons.ChevronDown class="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-full">
            <div class="grid gap-4">
              <div class="space-y-2">
                <h4 class="leading-none font-medium">Filter Data</h4>
                <p class="text-muted-foreground text-sm">Saring pengguna berdasarkan berbagai kriteria.</p>
              </div>
              <div class="grid gap-4">
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="department">Divisi</Label>
                  <Select v-model="filters.department" defaultValue="all" class="w-full">
                    <SelectTrigger class="col-span-2 h-auto">
                      <SelectValue placeholder="Semua Divisi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Divisi</SelectItem>
                      <SelectSeparator />
                      <template v-for="division in divisions" :key="division.value">
                        <SelectItem :value="division.value">{{ division.label }}</SelectItem>
                      </template>
                    </SelectContent>
                  </Select>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="employeeType">Jenis Pegawai</Label>
                  <Select v-model="filters.employeeType" defaultValue="all">
                    <SelectTrigger class="col-span-2 h-8">
                      <SelectValue placeholder="Semua Jenis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Jenis</SelectItem>
                      <SelectSeparator />
                      <template v-for="type in employeeTypes" :key="type.value">
                        <SelectItem :value="type.value">{{ type.label }}</SelectItem>
                      </template>
                    </SelectContent>
                  </Select>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="role">Role</Label>
                  <Select v-model="filters.role" defaultValue="all">
                    <SelectTrigger class="col-span-2 h-8">
                      <SelectValue placeholder="Semua Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Role</SelectItem>
                      <SelectSeparator />
                      <template v-for="role in roles" :key="role.value">
                        <SelectItem :value="role.value">{{ role.label }}</SelectItem>
                      </template>
                    </SelectContent>
                  </Select>
                </div>
                <div class="mt-4 flex items-center justify-end">
                  <Button class="cursor-pointer" @click="handleReset">Reset Filter</Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
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
          <template v-if="(data?.total_rows as number) > 0">
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

          <TableRow v-else>
            <TableCell :colspan="UserColumns.length" class="h-24 text-center">
              <div class="flex flex-col items-center justify-center space-y-2">
                <Icons.Search class="text-muted-foreground h-8 w-8" />
                <p class="text-muted-foreground">Tidak ada pengguna yang ditemukan.</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between space-x-2 py-4">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">Baris per halaman</p>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm" class="h-8 px-3">
              {{ PageSize }}
              <Icons.ChevronsUpDown class="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" @click="PageSize = pageSize">
              {{ pageSize }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div class="flex items-center space-x-6 lg:space-x-8">
        <div class="flex w-[120px] items-center justify-center text-sm font-medium">
          Halaman {{ Page }} dari {{ data?.total_pages || 1 }}
        </div>

        <div class="flex items-center space-x-2">
          <Button
            variant="outline"
            class="hidden h-8 w-8 cursor-pointer p-0 lg:flex"
            :disabled="Page === 1"
            @click="Page = 1"
          >
            <span class="sr-only">Go to first page</span>
            <Icons.ChevronsLeft class="h-4 w-4" />
          </Button>
          <Button variant="outline" class="h-8 w-8 cursor-pointer p-0" :disabled="Page <= 1" @click="Page -= 1">
            <span class="sr-only">Go to previous page</span>
            <Icons.ChevronLeft class="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            class="h-8 w-8 cursor-pointer p-0"
            :disabled="Page === data?.total_pages"
            @click="Page += 1"
          >
            <span class="sr-only">Go to next page</span>
            <Icons.ChevronRight class="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            class="hidden h-8 w-8 cursor-pointer p-0 lg:flex"
            :disabled="Page === data?.total_pages"
            @click="Page = data?.total_pages as number"
          >
            <span class="sr-only">Go to last page</span>
            <Icons.ChevronsRight class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { FlexRender, getCoreRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { divisions, employeeTypes, roles } from '../constants/user';
import { UserColumns } from '../table/user_columns';

import type { EmployeeType } from '@/types/employee';
import type { FilterUsers, UserListResponseWithPagination, UserTableColumn } from '@/types/user';

interface UsersDataTableProps {
  data?: UserListResponseWithPagination | null;
}

const props = defineProps<UsersDataTableProps>();

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
  }),
});

const columnLabels: Record<string, string> = {
  name: 'Nama',
  departement: 'Divisi',
  position: 'Jabatan',
  employeeType: 'Jenis Pegawai',
  updated_at: 'Terakhir Diperbarui',
};

// Filter out deleted users
const tableData = computed<UserTableColumn[]>(() => {
  if (!props.data?.users) return [];

  return props.data.users.map(user => ({
    id: user.id,
    name: user.profile?.full_name ?? user.username,
    department: user.employee_detail?.department as any,
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
  rowCount: props.data?.total_rows ?? 0,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  initialState: {
    pagination: {
      pageSize: props.data?.limit || 10,
    },
  },
});

const handleReset = () => {
  filters.value.department = 'all';
  filters.value.employeeType = 'all';
  filters.value.role = 'all';
};
</script>
