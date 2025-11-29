<template>
  <div class="w-full space-y-4">
    <!-- Data Table -->
    <div class="overflow-x-auto rounded-md border">
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
          <template v-if="props.data && props.data.length > 0 && !props.loading">
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
            <TableCell :colspan="CertificateColumns.length" class="h-24 text-center">
              <div class="flex flex-col items-center justify-center space-y-2">
                <Icons.FileText class="text-muted-foreground h-8 w-8" />
                <p class="text-muted-foreground">Tidak ada sertifikat yang ditemukan.</p>
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
import { CertificateColumns } from '../../table/certificate_columns';

import type { Document } from '@/types/document';

interface CertificateDataTableProps {
  data?: Document[] | null;
  loading?: boolean;
}

const props = withDefaults(defineProps<CertificateDataTableProps>(), {
  data: () => [],
  loading: false,
});

const tableData = computed<Document[]>(() => {
  return props.data ?? [];
});

const table = useVueTable({
  data: tableData,
  columns: CertificateColumns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});
</script>
