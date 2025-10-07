<script setup lang="ts">
import { computed } from 'vue';

// Definisikan props yang akan diterima komponen
const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
});

// Buat URL embed YouTube secara dinamis berdasarkan videoId
const embedUrl = computed(() => {
  return `https://www.youtube.com/embed/${props.videoId}?si=uK6RXLcH8_6QRPK0`;
});
</script>

<template>
  <!-- 
    Gunakan kelas aspect-ratio dari Tailwind CSS untuk membuat video responsif.
    'aspect-video' akan menjaga rasio aspek 16:9.
  -->
  <div class="aspect-video w-auto py-6">
    <iframe
      :src="embedUrl"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      class="h-full w-full rounded-lg shadow-md"
    ></iframe>
  </div>
</template>
