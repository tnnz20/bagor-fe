<template>
  <AlertDialog v-model:open="props.isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-center">Sistem Penilaian Aplikasi KPI </AlertDialogTitle>
        <AlertDialogDescription class="max-h-[50vh] overflow-y-auto p-4 text-justify md:max-h-[100vh]">
          <div class="grid-rows-3-3 grid gap-4">
            <div class="row-span-1">
              Sistem penilaian dalam aplikasi KPI adalah platform digital yang dirancang untuk mengukur, memantau, dan
              mengevaluasi kinerja karyawan secara objektif berdasarkan indikator-indikator terukur yang telah
              ditetapkan perusahaan. Platform ini menyediakan data terorganisir dan analisis mendalam yang memungkinkan
              manajer mengakses laporan kinerja secara real-time untuk mengidentifikasi area yang memerlukan perhatian
              lebih cepat dibandingkan metode manual. Aplikasi ini mengintegrasikan seluruh proses evaluasi mulai dari
              pembuatan KPI, pemantauan progres, pemberian umpan balik, hingga evaluasi akhir dalam satu sistem
              terpusat.
            </div>
            <div class="row-span-1">
              Mekanisme penilaian menggunakan tiga bobot utama yaitu Bobot Penilaian KPI, Bobot Penilaian Kompetensi,
              dan Bobot Penilaian Core Values yang menjadi acuan untuk setiap jabatan. Proses evaluasi dilakukan secara
              bertingkat melibatkan penilaian diri (self-assessment), penilaian oleh atasan langsung, dan atasan penilai
              untuk memastikan objektivitas hasil dengan skala penilaian yang dapat dikustomisasi. Sistem menghitung dua
              metrik utama yaitu "kinerja" yang mengukur kesuksesan keseluruhan menurut KPI dengan nilai minimum dan
              maksimum, serta "kemajuan" yang mengukur sejauh mana target tercapai menggunakan nilai garis dasar dan
              target.
            </div>
            <div class="row-span-1">
              Aplikasi KPI melakukan otomatisasi pengumpulan data, analisis, dan evaluasi kinerja untuk mengurangi
              risiko kesalahan manual dan subjektivitas yang umum terjadi pada sistem penilaian konvensional. Sistem
              menyediakan dashboard interaktif dengan notifikasi otomatis jika ada metrik yang keluar dari batas yang
              ditentukan, sehingga manajemen dapat mengambil keputusan lebih cepat berdasarkan fakta dan analisis yang
              dapat diandalkan. Platform ini juga terintegrasi dengan sistem payroll untuk memudahkan penghitungan
              bonus, insentif, atau kenaikan gaji berdasarkan nilai KPI karyawan.
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction @click="$emit('update:isOpen')">Saya Mengerti</AlertDialogAction>
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

const props = defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  'update:isOpen': [];
}>();
</script>
