<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Berita Acara</h1>
      </div>
      <BeritaAcaraNew />
    </div>
    <!-- Content Section -->
    <Card>
      <CardHeader>
        <CardTitle>Daftar Berita Acara</CardTitle>
        <CardDescription>Daftar seluruh berita acara yang telah diupload ke sistem</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[300px]">Judul</TableHead>
                <TableHead class="w-[400px]">Deskripsi</TableHead>
                <TableHead class="w-[200px]">Nama File</TableHead>
                <TableHead class="w-[150px]">Dibuat</TableHead>
                <TableHead class="w-[100px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="item in beritaAcaraList" :key="item.id">
                <TableCell class="font-medium">
                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 rounded-lg bg-red-50 p-2">
                      <Icons.FileText class="text-destructive h-5 w-5" />
                    </div>
                    <div>
                      <p class="text-sm font-semibold">{{ item.title }}</p>
                      <p class="text-muted-foreground text-xs">PDF Document</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p class="text-muted-foreground text-sm">
                    {{ item.description || 'Tidak ada deskripsi' }}
                  </p>
                </TableCell>
                <TableCell>
                  <div class="flex items-center space-x-2">
                    <Badge variant="outline" class="text-xs">
                      {{ item.fileName }}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div class="text-sm">
                    <p class="font-medium">{{ formatDate(item.createdAt) }}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" class="h-8 w-8 p-0">
                        <span class="sr-only">Open menu</span>
                        <Icons.MoreHorizontal class="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                      <DropdownMenuItem @click="downloadFile(item)">
                        <Icons.Download class="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        class="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        @click="deleteFile(item)"
                      >
                        <Icons.Trash2 class="mr-2 h-4 w-4" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>

              <!-- Empty State -->
              <TableRow v-if="beritaAcaraList.length === 0">
                <TableCell colspan="5" class="h-24 text-center">
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
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { formatDate } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import BeritaAcaraNew from '../components/BeritaAcaraNew.vue';

// Interface for BeritaAcara
interface BeritaAcara {
  id: number;
  title: string;
  description?: string;
  fileName: string;
  filePath: string;
  createdAt: number; // Unix timestamp
}

// Sample data for berita acara
const beritaAcaraList = ref<BeritaAcara[]>([
  {
    id: 1,
    title: 'Berita Acara Rapat Koordinasi Bulanan',
    description: 'Berita acara hasil rapat koordinasi bulanan departemen IT dengan management',
    fileName: 'BA_Rapat_Koordinasi_Oktober_2025.pdf',
    filePath: '/modules/BeritaAcara/pdf/BA_Rapat_Koordinasi_Oktober_2025.pdf',
    createdAt: 1728201600000, // October 6, 2025
  },
  {
    id: 2,
    title: 'Berita Acara Serah Terima Aset',
    description: 'Dokumentasi serah terima aset komputer dari departemen HR ke IT',
    fileName: 'BA_Serah_Terima_Aset_2025.pdf',
    filePath: '/modules/BeritaAcara/pdf/BA_Serah_Terima_Aset_2025.pdf',
    createdAt: 1728115200000, // October 5, 2025
  },
  {
    id: 3,
    title: 'Berita Acara Pemeliharaan Server',
    fileName: 'BA_Maintenance_Server_Q4_2025.pdf',
    filePath: '/modules/BeritaAcara/pdf/BA_Maintenance_Server_Q4_2025.pdf',
    createdAt: 1727942400000, // October 3, 2025
  },
  {
    id: 4,
    title: 'Berita Acara Training Karyawan Baru',
    description: 'Dokumentasi pelaksanaan training orientasi untuk karyawan baru batch Oktober 2025',
    fileName: 'BA_Training_Karyawan_Baru_Okt25.pdf',
    filePath: '/modules/BeritaAcara/pdf/BA_Training_Karyawan_Baru_Okt25.pdf',
    createdAt: 1727856000000, // October 2, 2025
  },
]);

// File actions
const downloadFile = (item: BeritaAcara) => {
  // Create a temporary link to download the file
  const link = document.createElement('a');
  link.href = item.filePath;
  link.download = item.fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log('Downloading file:', item.fileName);
};

// const viewFile = (item: BeritaAcara) => {
//   // Open PDF in new window/tab
//   window.open(item.filePath, '_blank');
//   console.log('Viewing file:', item.fileName);
// };

const deleteFile = (item: BeritaAcara) => {
  if (confirm(`Apakah Anda yakin ingin menghapus "${item.title}"?`)) {
    const index = beritaAcaraList.value.findIndex(ba => ba.id === item.id);
    if (index > -1) {
      beritaAcaraList.value.splice(index, 1);
      console.log('Deleted file:', item.fileName);
    }
  }
};
</script>
