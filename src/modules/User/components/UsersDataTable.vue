<template>
  <div class="w-full">
    <!-- Filter and Search Section -->
    <div class="flex items-center justify-between py-4">
      <Input
        v-model="globalFilter"
        class="max-w-sm"
        placeholder="Cari pengguna..."
        @input="table.setGlobalFilter($event.target.value)"
      />
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
                    <SelectTrigger class="col-span-2 h-8">
                      <SelectValue placeholder="Semua Divisi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Divisi</SelectItem>
                      <SelectSeparator />
                      <SelectItem value="UMUM DAN KEUANGAN">Umum & Keuangan</SelectItem>
                      <SelectItem value="PERLENGKAPAN DAN RUMAH TANGGA">Perlengkapan & RT</SelectItem>
                      <SelectItem value="ORGANISASI">Organisasi</SelectItem>
                      <SelectItem value="HUKUM">Hukum</SelectItem>
                      <SelectItem value="PEREKONOMIAN DAN ADMINISTRASI PEMBANGUNAN"
                        >Perekonomian & Adm. Pembangunan</SelectItem
                      >
                      <SelectItem value="PEMERINTAHAN">Pemerintahan</SelectItem>
                      <SelectItem value="KESEJAHTERAAN RAKYAT">Kesejahteraan Rakyat</SelectItem>
                      <SelectItem value="PROTOKOL DAN KOMUNIKASI PIMPINAN">Protokol & Komun. Pimpinan</SelectItem>
                      <SelectItem value="PENGADAAN BARANG DAN JASA">Pengadaan Barang & Jasa</SelectItem>
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
                      <SelectItem value="Struktural">Struktural</SelectItem>
                      <SelectItem value="Fungsional">Fungsional</SelectItem>
                      <SelectItem value="Kontrak">Kontrak</SelectItem>
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
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                    </SelectContent>
                  </Select>
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
          <template v-if="table.getRowModel().rows?.length">
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
            <TableCell :colspan="columns.length" class="h-24 text-center">
              <div class="flex flex-col items-center justify-center space-y-2">
                <Icons.Search class="text-muted-foreground h-8 w-8" />
                <p class="text-muted-foreground">No users found.</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between space-x-2 py-4">
      <div class="text-muted-foreground flex-1 text-sm">
        {{ table.getFilteredSelectedRowModel().rows.length }} of {{ table.getFilteredRowModel().rows.length }} row(s)
        selected.
      </div>

      <div class="flex items-center space-x-6 lg:space-x-8">
        <div class="flex items-center space-x-2">
          <p class="text-sm font-medium">Baris per halaman</p>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" size="sm" class="h-8 px-3">
                {{ table.getState().pagination.pageSize }}
                <Icons.ChevronsUpDown class="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                v-for="pageSize in [10, 20, 30, 40, 50]"
                :key="pageSize"
                @click="table.setPageSize(pageSize)"
              >
                {{ pageSize }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div class="flex w-[100px] items-center justify-center text-sm font-medium">
          Halaman {{ table.getState().pagination.pageIndex + 1 }} dari {{ table.getPageCount() }}
        </div>

        <div class="flex items-center space-x-2">
          <Button
            variant="outline"
            class="hidden h-8 w-8 p-0 lg:flex"
            :disabled="!table.getCanPreviousPage()"
            @click="table.setPageIndex(0)"
          >
            <span class="sr-only">Go to first page</span>
            <Icons.ChevronsLeft class="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            class="h-8 w-8 p-0"
            :disabled="!table.getCanPreviousPage()"
            @click="table.previousPage()"
          >
            <span class="sr-only">Go to previous page</span>
            <Icons.ChevronLeft class="h-4 w-4" />
          </Button>
          <Button variant="outline" class="h-8 w-8 p-0" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
            <span class="sr-only">Go to next page</span>
            <Icons.ChevronRight class="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            class="hidden h-8 w-8 p-0 lg:flex"
            :disabled="!table.getCanNextPage()"
            @click="table.setPageIndex(table.getPageCount() - 1)"
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
import { computed, h, ref } from 'vue';

import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
  type ColumnDef,
} from '@tanstack/vue-table';

import { formatDate } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
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
import UsersDataTableDropdown from './UsersDataTableDropdown.vue';

import type { User } from '@/types/user';

interface UsersDataTableProps {
  users: User[];
}

const columnLabels: Record<string, string> = {
  name: 'Nama',
  departement: 'Divisi',
  position: 'Jabatan',
  employeeType: 'Jenis Pegawai',
  updated_at: 'Terakhir Diperbarui',
};

const props = defineProps<UsersDataTableProps>();
const emit = defineEmits<{
  editUser: [user: User];
  deleteUser: [user: User];
}>();

// Global filter state
const globalFilter = ref('');

// Filter states for select components
const filters = ref({
  department: 'all',
  employeeType: 'all',
  role: 'all',
  status: 'all',
});

// Helper function to get role color
const getRoleVariant = (role: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (role) {
    case 'admin':
      return 'destructive';
    case 'manager':
      return 'default';
    case 'employee':
      return 'secondary';
    default:
      return 'outline';
  }
};

// Helper function to get department display name (shortened)
const getDepartmentName = (dept: string): string => {
  const names: Record<string, string> = {
    'UMUM DAN KEUANGAN': 'Umum & Keuangan',
    'PERLENGKAPAN DAN RUMAH TANGGA': 'Perlengkapan & RT',
    ORGANISASI: 'Organisasi',
    HUKUM: 'Hukum',
    'PEREKONOMIAN DAN ADMINISTRASI PEMBANGUNAN': 'Perekonomian & Adm. Pembangunan',
    PEMERINTAHAN: 'Pemerintahan',
    'KESEJAHTERAAN RAKYAT': 'Kesejahteraan Rakyat',
    'PROTOKOL DAN KOMUNIKASI PIMPINAN': 'Protokol & Komun. Pimpinan',
    'PENGADAAN BARANG DAN JASA': 'Pengadaan Barang & Jasa',
  };
  return names[dept] || dept;
};

// Table columns definition
const columns: ColumnDef<User>[] = [
  {
    id: 'name',
    accessorFn: row => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Nama', h(Icons.ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return h('div', { class: 'font-medium' }, `${user.firstName} ${user.lastName}`);
    },
  },

  {
    accessorKey: 'department',
    header: 'Divisi',
    cell: ({ row }) => {
      const dept = row.getValue('department') as string;
      return h('div', { class: 'text-sm' }, getDepartmentName(dept));
    },
  },
  {
    accessorKey: 'position',
    header: 'Jabatan',
    cell: ({ row }) => {
      const position = row.getValue('position') as string;
      return h('div', { class: 'text-sm' }, position || '-');
    },
  },
  {
    accessorKey: 'employeeType',
    header: 'Jenis Pegawai',
    cell: ({ row }) => {
      const employeeType = row.getValue('employeeType') as string;

      return h('div', { class: 'text-sm' }, employeeType || '-');
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role') as string;

      return h(Badge, { variant: getRoleVariant(role) }, () => role.charAt(0).toUpperCase() + role.slice(1));
    },
  },
  {
    id: 'updated_at',
    header: 'Terakhir Diperbaharui',
    cell: ({ row }) => {
      const user = row.original;
      return h('div', { class: 'text-sm text-muted-foreground' }, formatDate(user.updated_at));
    },
  },
  {
    id: 'actions',
    header: 'Aksi',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return h('div', { class: 'relative' }, h(UsersDataTableDropdown, { user }));
    },
  },
];

// Filter out deleted users
const activeUsers = computed(() => props.users.filter(user => !user.deleted_at));

// Table configuration
const table = useVueTable({
  data: activeUsers,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get globalFilter() {
      return globalFilter.value;
    },
  },
  onGlobalFilterChange: value => {
    globalFilter.value = value;
  },
  initialState: {
    pagination: {
      pageSize: 10,
    },
  },
});
</script>
