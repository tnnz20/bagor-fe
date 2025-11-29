<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-base font-semibold sm:text-lg">Sertifikat</h2>
        <p class="text-muted-foreground text-xs sm:text-sm">Kelola sertifikat dan dokumen pendukung Anda.</p>
      </div>
      <Button size="sm" @click="isUploadDialogOpen = true" class="w-full sm:w-auto">
        <Icons.Upload class="mr-2 h-4 w-4" />
        Unggah Sertifikat
      </Button>
    </div>

    <Separator />

    <!-- Loading State -->
    <template v-if="isLoading">
      <div class="space-y-3">
        <Skeleton class="h-12 w-full" />
        <Skeleton class="h-12 w-full" />
        <Skeleton class="h-12 w-full" />
      </div>
    </template>

    <!-- Error State -->
    <template v-else-if="isError">
      <div class="flex flex-col items-center justify-center space-y-4 py-8">
        <Icons.AlertCircle class="text-destructive h-12 w-12" />
        <div class="text-center">
          <p class="text-destructive font-medium">Gagal memuat sertifikat</p>
          <p class="text-muted-foreground text-sm">{{ error?.message || 'Terjadi kesalahan' }}</p>
        </div>
        <Button variant="outline" size="sm" @click="refetch">
          <Icons.RefreshCcw class="mr-2 h-4 w-4" />
          Coba Lagi
        </Button>
      </div>
    </template>

    <!-- Empty State -->
    <template v-else-if="!certificates || certificates.length === 0">
      <div class="bg-muted/20 flex flex-col items-center justify-center space-y-4 rounded-lg border py-12">
        <div class="bg-muted rounded-full p-4">
          <Icons.FileText class="text-muted-foreground h-10 w-10" />
        </div>
        <div class="space-y-1 text-center">
          <p class="font-medium">Belum ada sertifikat</p>
          <p class="text-muted-foreground text-sm">
            Anda belum mengunggah sertifikat apapun.<br />
            Mulai dengan mengunggah sertifikat pertama Anda.
          </p>
        </div>
        <Button variant="outline" size="sm" @click="isUploadDialogOpen = true">
          <Icons.Plus class="mr-2 h-4 w-4" />
          Unggah Sertifikat Pertama
        </Button>
      </div>
    </template>

    <!-- Certificates Table -->
    <template v-else>
      <CertificateDataTable :data="certificates" :loading="isLoading" />
    </template>

    <!-- Upload Dialog -->
    <UploadCertificateDialog v-model:open="isUploadDialogOpen" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useQuery } from '@tanstack/vue-query';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import UploadCertificateDialog from '../components/dialog/UploadCertificateDialog.vue';
import CertificateDataTable from '../components/setting/CertificateDataTable.vue';
import { getMyCertificates } from '../services/certificate';

// Upload Dialog State
const isUploadDialogOpen = ref(false);

// Fetch certificates
const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['user-certificates'],
  queryFn: () => getMyCertificates(),
});

const certificates = computed(() => data.value?.data || []);
</script>
