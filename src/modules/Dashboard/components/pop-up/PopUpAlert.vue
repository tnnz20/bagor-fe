<template>
  <AlertDialog v-model:open="dialogOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-center">Selamat Datang!</AlertDialogTitle>
        <AlertDialogDescription class="max-h-[40vh] overflow-y-auto text-justify">
          Yang menjadi Dasar Hukum yaitu :
          <ul class="mt-2 list-decimal pl-5">
            <li>Undang-Undang Nomor 20 Tahun 2023 tentang Aparatur Sipil Negara</li>
            <li>Peraturan Pemerintah Nomor 30 Tahun 2019 tentang Penilaian Kinerja Pegawai Negeri Sipil</li>
            <li>
              Peraturan Pemerintah Nomor 17 Tahun 2020 tentang Perubahan atas Peraturan Pemerintah Nomor 11 Tahun 2017
              tentang Manajemen Pegawai Negeri Sipil
            </li>
            <li>Peraturan Pemerintah Nomor 94 Tahun 2021 tentang Disiplin Pegawai Negeri Sipil</li>
            <li>
              Surat Edaran Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi Nomor 20 Tahun 2021 tentang
              Implementasi Core Values dan Employer Branding Aparatur Sipil Negara
            </li>
          </ul>
          <p class="mt-2">
            Atas hal tersebut Bagian Organisasi Sekretariat Daerah Pemerintah Kabupaten Tapin mengajukan PENTAS JAPIN
            (Penilaian Prestasi Kerja atas ASN dan NON ASN Tapin) yang berfokus pada penilaian kerja dengan aspek
            penilaian yaitu aspek pekerjaan, aspek non teknis, dan aspek budaya kerja (Ber AKHLAK).
          </p>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction @click="handleContinue">Lanjutkan</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  'update:isOpen': [value: boolean];
  continue: [];
}>();

const dialogOpen = computed({
  get: () => props.isOpen,
  set: (value: boolean) => emit('update:isOpen', value),
});

const handleContinue = () => {
  emit('update:isOpen', false);
  emit('continue');
};
</script>
