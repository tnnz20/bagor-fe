<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-center">Selamat Datang!</AlertDialogTitle>
        <AlertDialogDescription class="text-justify">
          <div class="flex flex-col gap-4 p-4">
            <div>
              <p class="mb-2">Yang menjadi Dasar Hukum yaitu :</p>
              <ul class="mt-2 list-decimal pl-5">
                <li v-for="(item, index) in listUUD" :key="index">{{ item }}</li>
              </ul>
            </div>
            <div>
              Atas hal tersebut Bagian Organisasi Sekretariat Daerah Pemerintah Kabupaten Tapin mengajukan PENTAS JAPIN
              (Penilaian Prestasi Kerja atas ASN dan NON ASN Tapin) yang berfokus pada penilaian kerja dengan aspek
              penilaian yaitu aspek pekerjaan, aspek non teknis, dan aspek budaya kerja (Ber AKHLAK).
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction @click="isOpen = false">Lanjutkan</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const isOpen = defineModel<boolean>('isOpen');

const listUUD: string[] = [
  'Undang-Undang Nomor 20 Tahun 2023 tentang Aparatur Sipil Negara',
  'Peraturan Pemerintah Nomor 30 Tahun 2019 tentang Penilaian Kinerja Pegawai Negeri Sipil',
  'Peraturan Pemerintah Nomor 17 Tahun 2020 tentang Perubahan atas Peraturan Pemerintah Nomor 11 Tahun 2017 tentang Manajemen Pegawai Negeri Sipil',
  'Peraturan Pemerintah Nomor 94 Tahun 2021 tentang Disiplin Pegawai Negeri Sipil',
  'Surat Edaran Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi Nomor 20 Tahun 2021 tentang Implementasi Core Values dan Employer Branding Aparatur Sipil Negara',
];
</script>
