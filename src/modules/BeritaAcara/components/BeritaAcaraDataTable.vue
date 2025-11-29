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
          <!-- Loading State -->
          <template v-if="loading">
            <TableRow v-for="i in 5" :key="i">
              <TableCell>
                <div class="flex items-start space-x-3">
                  <Skeleton class="h-9 w-9 rounded-lg" />
                  <div class="space-y-2">
                    <Skeleton class="h-4 w-32" />
                    <Skeleton class="h-3 w-20" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-48" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-5 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-8 w-8" />
              </TableCell>
            </TableRow>
          </template>

          <!-- Data Rows -->
          <template v-else-if="data && data.length > 0">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>

          <!-- Empty State -->
          <TableRow v-else>
            <TableCell :colspan="BeritaAcaraColumns.length" class="h-24 text-center">
              <div class="flex flex-col items-center justify-center space-y-2">
                <Icons.FileText class="text-muted-foreground h-8 w-8" />
                <p class="text-muted-foreground">Belum ada berita acara yang diupload.</p>
                <p class="text-muted-foreground text-sm">Klik tombol "Tambah Berita Acara" untuk menambahkan.</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';

import { Icons } from '@/components/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BeritaAcaraColumns } from '../table/berita_acara_columns';

import type { BeritaAcara } from '@/types/berita-acara';

const props = defineProps<{
  data?: BeritaAcara[];
  loading?: boolean;
}>();

const table = useVueTable({
  get data() {
    return props.data ?? [];
  },
  columns: BeritaAcaraColumns,
  getCoreRowModel: getCoreRowModel(),
});
</script>
