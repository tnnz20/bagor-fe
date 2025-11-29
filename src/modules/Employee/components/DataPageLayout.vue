<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Data Pegawai</h1>
      <p class="text-muted-foreground">Kelola data pegawai Bagor</p>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
        <CardDescription>{{ description }} </CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="isError" class="flex h-64 w-full flex-col items-center justify-center space-y-4">
          <Icons.AlertCircle class="text-destructive h-16 w-16" />
          <div class="text-center">
            <h2 class="text-xl font-semibold">Gagal Memuat Data</h2>
            <p class="text-muted-foreground mt-2">{{ errorMessage }}</p>
            <Button variant="outline" @click="$emit('retry')" class="mt-4">Coba Lagi</Button>
          </div>
        </div>
        <div v-else>
          <slot></slot>
        </div>
      </CardContent>
    </Card>
    <slot name="second-card"></slot>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

defineProps<{
  title: string;
  description: string;
  isError: boolean;
  errorMessage: string;
}>();

defineEmits(['retry']);
</script>
