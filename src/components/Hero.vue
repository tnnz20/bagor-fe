<!-- Hero206.vue -->

<script setup lang="ts">
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Plus,
  RotateCw,
  Share,
} from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import FlipWords from "./ui/flip-words/FlipWords.vue";

// Data untuk avatar users
const avatars = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    fallback: "AB",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    fallback: "AB",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    fallback: "AB",
  },
];

// Configuration untuk browser mockup
const mockupConfig = {
  url: "https://shadcnblocks.com/block/hero206",
  dashboardUrlDesktop:
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/dashboard-1.png",
  dashboardUrlMobile:
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/dashboard-mobile-1.png",
};
</script>

<template>
  <section class="bg-background">
    <div class="container mx-auto relative pt-32 pb-8">
      <!-- Header Section -->
      <header class="mx-auto max-w-3xl text-center">
        <h1
          class="mx-auto font-anton text-foreground text-5xl font-semibold uppercase md:text-7xl"
        >
          Penilaian <br />
          Kinerja Lebih
          <FlipWords
            :words="['Cerdas', 'Cepat', 'Objektif']"
            :duration="2000"
            class="font-anton text-foreground text-5xl font-semibold uppercase md:text-7xl"
          />
        </h1>
        <p
          class="text-muted-foreground my-7 max-w-3xl tracking-tight md:text-xl"
        >
          Tinggalkan proses penilaian tahunan yang kaku, subjektif, dan memakan
          waktu. [Nama Aplikasi] adalah platform intuitif yang merevolusi cara
          Anda mengelola, mengukur, dan mengembangkan kinerja tim. Dapatkan
          wawasan mendalam untuk membuat keputusan yang lebih baik, tingkatkan
          keterlibatan karyawan, dan ciptakan budaya kerja yang adil dan
          transparan.
        </p>
      </header>

      <!-- Badge with Avatars -->
      <Badge
        variant="outline"
        class="mx-auto mt-10 flex w-fit cursor-pointer items-center justify-center rounded-full border py-1 pl-2 pr-3 font-normal transition-all ease-in-out hover:gap-3"
      >
        <!-- Avatar Loop -->
        <Avatar
          v-for="(avatar, index) in avatars"
          :key="index"
          class="relative -mr-5 overflow-hidden rounded-full border md:size-10"
        >
          <AvatarImage :src="avatar.src" alt="" />
          <AvatarFallback>{{ avatar.fallback }}</AvatarFallback>
        </Avatar>

        <p class="ml-6 capitalize tracking-tight md:text-lg">
          Dipercaya oleh
          <span class="text-foreground font-bold">100+</span> pengguna.
        </p>
      </Badge>

      <!-- Browser Mockup Section -->
      <div
        class="relative mt-12 flex h-full w-full flex-col items-center justify-center p-8"
      >
        <!-- Browser Mockup (Inline) -->
        <div
          :class="
            cn('rounded-4xl relative w-full overflow-hidden border', 'w-full')
          "
        >
          <!-- Browser Header -->
          <div
            class="bg-muted lg:gap-25 flex items-center justify-between gap-10 px-8 py-4"
          >
            <!-- Traffic Light Buttons -->
            <div class="flex items-center gap-2">
              <div class="size-3 rounded-full bg-red-500" />
              <div class="size-3 rounded-full bg-yellow-500" />
              <div class="size-3 rounded-full bg-green-500" />
              <div class="ml-6 hidden items-center gap-2 opacity-40 lg:flex">
                <ChevronLeft class="size-5" />
                <ChevronRight class="size-5" />
              </div>
            </div>

            <!-- URL Bar -->
            <div class="flex w-full items-center justify-center">
              <p
                class="bg-background relative hidden w-full rounded-full px-4 py-1 text-center text-sm tracking-tight md:block"
              >
                {{ mockupConfig.url }}
                <RotateCw class="absolute right-3 top-2 size-3.5" />
              </p>
            </div>

            <!-- Browser Actions -->
            <div class="flex items-center gap-4 opacity-40">
              <Share class="size-4" />
              <Plus class="size-4" />
              <Copy class="size-4" />
            </div>
          </div>

          <!-- Browser Content -->
          <div class="relative w-full">
            <!-- Desktop Image -->
            <img
              :src="mockupConfig.dashboardUrlDesktop"
              alt=""
              class="object-cover hidden aspect-video h-full w-full object-top md:block"
            />
            <!-- Mobile Image -->
            <img
              :src="mockupConfig.dashboardUrlMobile"
              alt=""
              class="block h-full w-full object-cover md:hidden"
            />
          </div>

          <!-- Mobile URL Bar -->
          <div
            class="bg-muted absolute bottom-0 z-10 flex w-full items-center justify-center py-3 md:hidden"
          >
            <p
              class="relative flex items-center gap-2 rounded-full px-8 py-1 text-center text-sm tracking-tight"
            >
              {{ mockupConfig.url }}
            </p>
          </div>
        </div>

        <!-- Gradient Overlay -->
        <div class="absolute bottom-0 h-2/3 w-full from-white to-transparent" />
      </div>
    </div>
  </section>
</template>
