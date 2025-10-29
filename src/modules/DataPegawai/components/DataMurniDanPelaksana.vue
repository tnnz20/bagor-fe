<script setup lang="ts">
import { computed, ref } from 'vue';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DocumentSection {
  id: string;
  nama: string;
  jabatan: string;
  attendance_percentage: number;
  score: number;
}

// Static data
const sections: DocumentSection[] = [
  {
    id: '1',
    nama: 'John Doe',
    jabatan: 'Kepala Bagian',
    attendance_percentage: 90,
    score: 35,
  },
  {
    id: '2',
    nama: 'MUHAMMAD NOVRIAN WIBOWO, S.Kom',
    jabatan: 'Staff',
    attendance_percentage: 80,
    score: 5,
  },
  {
    id: '3',
    nama: 'Cover page',
    jabatan: 'Staff',
    attendance_percentage: 18,
    score: 5,
  },
  {
    id: '4',
    nama: 'Cover page',
    jabatan: 'Staff',
    attendance_percentage: 18,
    score: 5,
  },
  {
    id: '5',
    nama: 'Cover page',
    jabatan: 'Staff',
    attendance_percentage: 18,
    score: 5,
  },
  {
    id: '6',
    nama: 'Cover page',
    jabatan: 'Staff',
    attendance_percentage: 18,
    score: 5,
  },
  {
    id: '7',
    nama: 'Cover page',
    jabatan: 'Staff',
    attendance_percentage: 18,
    score: 5,
  },
  {
    id: '8',
    nama: 'Cover page',
    jabatan: 'Staff',
    attendance_percentage: 18,
    score: 5,
  },
  {
    id: '9',
    nama: 'Cover page',
    jabatan: 'Staff',
    attendance_percentage: 18,
    score: 5,
  },
  {
    id: '10',
    nama: 'Cover page',
    jabatan: 'Staff',
    attendance_percentage: 18,
    score: 5,
  },
];

const selectedRows = ref<Set<string>>(new Set());
const rowsPerPage = ref('10');

const selectedCount = computed(() => selectedRows.value.size);
const totalRows = computed(() => sections.length);
</script>

<template>
  <div class="rounded-lg border bg-white shadow-sm">
    <Table>
      <TableHeader>
        <TableRow class="bg-gray-50">
          <TableHead>Nama Lengkap</TableHead>
          <TableHead class="w-64">Jabatan</TableHead>
          <TableHead class="w-16">Presentasi Kehadiran</TableHead>
          <TableHead class="w-16">Skor Penilaian</TableHead>
          <TableHead class="w-32"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="section in sections"
          :key="section.id"
          :class="selectedRows.has(section.id) ? 'bg-blue-50' : ''"
        >
          <TableCell class="font-medium">{{ section.nama }}</TableCell>
          <TableCell>
            <Badge variant="secondary" class="font-normal">
              {{ section.jabatan }}
            </Badge>
          </TableCell>
          <TableCell class="w-fit text-center"> {{ section.attendance_percentage }}% </TableCell>
          <TableCell class="text-center">{{ section.score }}</TableCell>
          <TableCell class="flex items-center justify-center">
            <Button>Nilai</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <!-- Footer -->
    <div class="flex items-center justify-between border-t bg-gray-50 px-4 py-3">
      <div class="text-sm text-gray-600">{{ selectedCount }} of {{ totalRows }} row(s) selected.</div>
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Rows per page</span>
          <Select v-model="rowsPerPage">
            <SelectTrigger class="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="text-sm text-gray-600">Page 1 of 1</div>
        <div class="flex gap-1">
          <Button variant="outline" size="sm" disabled>««</Button>
          <Button variant="outline" size="sm" disabled>‹</Button>
          <Button variant="outline" size="sm" disabled>›</Button>
          <Button variant="outline" size="sm" disabled>»»</Button>
        </div>
      </div>
    </div>
  </div>
</template>
