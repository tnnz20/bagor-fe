<!-- Feature16.vue -->

<script setup lang="ts">
import { Timer, Zap, ZoomIn } from "lucide-vue-next";

// Memisahkan data ke dalam array untuk dirender secara dinamis.
// Ini membuat template lebih bersih dan data lebih mudah diubah.
const features = [
  {
    icon: Timer,
    title: "Mengatasi Ketidakefektifan Sistem Manual",
    description:
      "Sistem penilaian tradisional dengan spreadsheet dan formulir kertas memakan waktu berhari-hari, rentan kesalahan, dan menghabiskan 80% waktu untuk administrasi daripada pengembangan karyawan. Inovasi ini mengotomatisasi proses tersebut untuk meningkatkan efisiensi operasional secara drastis.",
  },
  {
    icon: ZoomIn,
    title: "Menghilangkan Subjektivitas dan Bias",
    description:
      "Penilaian konvensional sering dipengaruhi bias personal dan faktor subjektif, menciptakan ketidakadilan dalam promosi dan bonus. Aplikasi ini memberikan metrik terukur dan objektif sehingga setiap keputusan dapat dipertanggungjawabkan dengan data yang valid dan transparan.",
  },
  {
    icon: Zap,
    title: "Mendukung Keputusan Bisnis Strategis",
    description:
      "Perusahaan membutuhkan data kinerja real-time untuk membuat keputusan strategis seperti alokasi sumber daya, perencanaan suksesi, dan pengembangan talent. Tanpa sistem terstruktur, data tersebar dan sulit dianalisis untuk keperluan bisnis jangka panjang.",
  },
];
</script>

<template>
  <section class="pb-32">
    <div class="container mx-auto">
      <p class="mb-4 text-sm text-muted-foreground lg:text-base md:px-8 px-4">
        ALASAN INOVASI INI HADIR
      </p>
      <h2 class="text-3xl font-medium lg:text-4xl md:px-8 px-4">
        Manfaat yang Anda Dapatkan
      </h2>

      <!-- Menggunakan v-for untuk merender setiap item fitur dari array -->
      <div class="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3 md:px-8 px-4">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="rounded-lg bg-accent p-5"
        >
          <span
            class="mb-8 flex size-12 items-center justify-center rounded-full bg-background"
          >
            <!-- Merender komponen ikon secara dinamis menggunakan <component :is="..."> -->
            <component :is="feature.icon" class="size-6" />
          </span>
          <h3 class="mb-2 text-xl font-medium">{{ feature.title }}</h3>
          <p class="leading-7 text-muted-foreground">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
