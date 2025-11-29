<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Unggah Sertifikat</DialogTitle>
        <DialogDescription>Pilih file sertifikat yang ingin diunggah.</DialogDescription>
      </DialogHeader>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="title">Judul Sertifikat</Label>
          <Input
            id="title"
            v-model="title"
            placeholder="Masukkan judul sertifikat"
            :disabled="isPending"
            :class="{ 'border-destructive': errors.title }"
          />
          <p v-if="errors.title" class="text-destructive text-xs">{{ errors.title }}</p>
        </div>
        <div class="space-y-2">
          <Label for="description">Deskripsi</Label>
          <Textarea
            id="description"
            v-model="description"
            placeholder="Masukkan deskripsi sertifikat (opsional)"
            :disabled="isPending"
            rows="3"
          />
        </div>

        <!-- File Dropzone -->
        <FileDropzone v-model="file" label="File Sertifikat" accept="application/pdf" :max-mb="5" />
        <p v-if="errors.file" class="text-destructive text-xs">{{ errors.file }}</p>
        <p class="text-muted-foreground text-xs">Format yang didukung: PDF. Maks 5MB.</p>

        <DialogFooter class="gap-2 sm:gap-0">
          <Button type="button" variant="outline" @click="handleClose" :disabled="isPending"> Batal </Button>
          <Button type="submit" :disabled="isPending">
            <Icons.Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
            {{ isPending ? 'Mengunggah...' : 'Unggah' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import type { BaseError } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';

import FileDropzone from '@/components/FileDropzone.vue';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { uploadUserCertificate } from '../../services/certificate';

const open = defineModel<boolean>('open', { required: true });

const queryClient = useQueryClient();

// Form State
const title = ref('');
const description = ref('');
const file = ref<File | null>(null);
const errors = ref<{ title?: string; file?: string }>({});

// Reset form when dialog closes
watch(open, newValue => {
  if (!newValue) {
    resetForm();
  }
});

// Upload mutation
const { mutate: mutateUpload, isPending } = useMutation({
  mutationFn: (formData: FormData) => uploadUserCertificate(formData),
  onSuccess: () => {
    toast.success('Sertifikat berhasil diunggah');
    queryClient.invalidateQueries({ queryKey: ['user-certificates'] });
    open.value = false;
  },
  onError: (err: BaseError) => {
    toast.error('Gagal mengunggah sertifikat', {
      description: err.response?.data?.error?.error_description || err.message || 'Terjadi kesalahan',
    });
  },
});

// Reset form
const resetForm = () => {
  title.value = '';
  description.value = '';
  file.value = null;
  errors.value = {};
};

// Validate form
const validateForm = (): boolean => {
  errors.value = {};

  if (!title.value.trim()) {
    errors.value.title = 'Judul sertifikat wajib diisi';
  }

  if (!file.value) {
    errors.value.file = 'File sertifikat wajib dipilih';
  }

  if (Object.keys(errors.value).length > 0) {
    toast.error('Validasi Gagal', {
      description: Object.values(errors.value).join(', '),
    });
    return false;
  }

  return true;
};

// Handle close
const handleClose = () => {
  open.value = false;
};

// Submit handler
const onSubmit = () => {
  if (!validateForm()) return;

  const formData = new FormData();
  formData.append('title', title.value.trim());
  formData.append('description', description.value.trim());
  formData.append('file', file.value!);

  mutateUpload(formData);
};
</script>
