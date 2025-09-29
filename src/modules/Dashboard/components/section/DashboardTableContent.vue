<template>
  <div class="w-full">
    <!-- Filter and Search Section -->
    <div class="flex items-center justify-end py-4">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Filter Kolom
            <Icons.ChevronDown class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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
              <p class="text-muted-foreground">No employees found.</p>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';

import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
  type ColumnDef,
  type VisibilityState,
} from '@tanstack/vue-table';

import { formatDate } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { valueUpdater } from '@/components/ui/table/utils';
import DashboardDataTableDropdown from './DashboardDataTableDropdown.vue';

import type { Employee } from '@/types/employee';

interface DashboardTableContentProps {
  employees: Employee[];
}

const props = defineProps<DashboardTableContentProps>();

const columnVisibility = ref<VisibilityState>({});

// Table columns definition
const columnLabels: Record<string, string> = {
  name: 'Name',
  score: 'Nilai',
  position: 'Posisi',
  updated_at: 'Diperbarui',
};

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'name',
    header: 'Nama',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return h('div', { class: 'font-medium' }, name);
    },
    meta: {
      label: 'nama',
    },
  },

  {
    accessorKey: 'score',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          class: 'w-full',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Nilai', h(Icons.ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      );
    },
    cell: ({ row }) => {
      const score = Number.parseFloat(row.getValue('score'));
      return h('div', { class: 'text-center font-semibold' }, score.toFixed(1));
    },
    meta: {
      label: 'nilai',
    },
  },
  {
    accessorKey: 'position',
    header: 'Posisi',
    cell: ({ row }) => {
      const position = row.getValue('position') as string;
      const variant = position === 'ASN' ? 'default' : 'secondary';
      return h(Badge, { variant }, { default: () => position });
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Diperbarui',
    cell: ({ row }) => {
      const timestamp = row.getValue('updated_at') as number;
      return h('div', { class: 'text-sm text-muted-foreground' }, formatDate(timestamp));
    },
    meta: {
      label: 'diperbarui',
    },
  },
  {
    id: 'actions',
    header: 'Aksi',
    enableHiding: false,
    cell: ({ row }) => {
      const employee = row.original;

      return h(
        'div',
        { class: 'relative' },
        h(DashboardDataTableDropdown, {
          employee,
        })
      );
    },
  },
];
// Table configuration
const table = useVueTable({
  data: props.employees,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  state: {
    get columnVisibility() {
      return columnVisibility.value;
    },
  },
});
</script>
