<!-- Feature16.vue -->

<script setup lang="ts">
import { Icons } from '@/components/icons';
import type { MenuItem } from '@/types';

const features: MenuItem[] = [
  {
    icon: Icons.Timer,
    title: 'Mengatasi Ketidakefektifan Sistem Manual',
    description:
      'Sistem penilaian tradisional dengan spreadsheet dan formulir kertas memakan waktu berhari-hari, rentan kesalahan, dan menghabiskan 80% waktu untuk administrasi daripada pengembangan karyawan. Inovasi ini mengotomatisasi proses tersebut untuk meningkatkan efisiensi operasional secara drastis.',
  },
  {
    icon: Icons.ZoomIn,
    title: 'Menghilangkan Subjektivitas dan Bias',
    description:
      'Penilaian konvensional sering dipengaruhi bias personal dan faktor subjektif, menciptakan ketidakadilan dalam promosi dan bonus. Aplikasi ini memberikan metrik terukur dan objektif sehingga setiap keputusan dapat dipertanggungjawabkan dengan data yang valid dan transparan.',
  },
  {
    icon: Icons.Zap,
    title: 'Mendukung Keputusan Bisnis Strategis',
    description:
      'Perusahaan membutuhkan data kinerja real-time untuk membuat keputusan strategis seperti alokasi sumber daya, perencanaan suksesi, dan pengembangan talent. Tanpa sistem terstruktur, data tersebar dan sulit dianalisis untuk keperluan bisnis jangka panjang.',
  },
];
</script>

<template>
  <section class="pb-32">
    <div class="container mx-auto">
      <p class="text-muted-foreground mb-4 px-4 text-sm md:px-8 lg:text-base">
        ALASAN INOVASI INI HADIR
      </p>
      <h2 class="px-4 text-3xl font-medium md:px-8 lg:text-4xl">
        Manfaat yang Anda Dapatkan
      </h2>

      <div class="mt-14 grid gap-6 px-4 md:px-8 lg:mt-20 lg:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-accent rounded-lg p-5"
        >
          <span
            class="bg-background mb-8 flex size-12 items-center justify-center rounded-full"
          >
            <component :is="feature.icon" class="size-6" />
          </span>
          <h3 class="mb-2 text-xl font-medium">{{ feature.title }}</h3>
          <p class="text-muted-foreground leading-7">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
