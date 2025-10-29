<script setup lang="ts">
import { Card } from '@/components/ui/card';
import DataTable from '../components/DataTable.vue';
</script>

<template>
  <div class="w-full space-y-4 bg-gray-50 p-6">
    <h1 class="text-3xl font-bold tracking-tight">Berita Acara</h1>
    <Card class="p-4">
      <DataTable />
    </Card>
  </div>
</template>
