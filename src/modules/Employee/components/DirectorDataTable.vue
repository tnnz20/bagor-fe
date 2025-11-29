<template>
  <div class="w-full space-y-4">
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
          <template v-if="props.data && props.data.length > 0">
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
            <TableCell :colspan="ShortlistColumns.length" class="h-24 text-center">
              <div class="flex flex-col items-center justify-center space-y-2">
                <Icons.Search class="text-muted-foreground h-8 w-8" />
                <p class="text-muted-foreground">Tidak ada pegawai yang ditemukan.</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { FlexRender, getCoreRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table';

import { Icons } from '@/components/icons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShortlistColumns } from '../table/shortlist_columns';

import type { NominationDetail } from '@/types/ranking';

interface DirectorDataTableProps {
  data?: NominationDetail[] | null;
  loading?: boolean;
}

const props = withDefaults(defineProps<DirectorDataTableProps>(), {
  data: () => [],
  loading: false,
});

const tableData = computed<NominationDetail[]>(() => {
  if (!props.data) return [];

  return props.data.map((employee: NominationDetail) => ({
    ...employee,
  }));
});

const table = useVueTable({
  data: tableData,
  columns: ShortlistColumns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});
</script>
