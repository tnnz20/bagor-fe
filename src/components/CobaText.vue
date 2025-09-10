<script setup lang="ts">
import FlipWords from "./ui/flip-words/FlipWords.vue";
</script>

<template>
  <div class="flex h-[40rem] items-center justify-center px-4">
    <h1
      class="mx-auto font-anton text-foreground text-5xl font-semibold uppercase md:text-7xl"
    >
      Vuejs: The
      <FlipWords
        :words="['Progressive', 'Approachable', 'Performant', 'Versatile']"
        :duration="2000"
        class="font-anton text-foreground text-5xl font-semibold uppercase md:text-7xl"
      />
      <h1
        class="font-anton text-foreground text-5xl font-semibold uppercase md:text-7xl"
      >
        JavaScript Framework for building <br />
        Modern Web Apps
      </h1>
    </h1>
  </div>
</template>
