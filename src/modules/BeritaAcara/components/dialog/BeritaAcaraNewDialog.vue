<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <Button @click="isDialogOpen = true"> <Icons.Plus class="mr-2 h-4 w-4" /> Tambah Berita Acara </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Tambah Berita Acara</DialogTitle>
        <DialogDescription>Upload file berita acara dalam format PDF</DialogDescription>
      </DialogHeader>

      <div class="grid gap-6 py-4">
        <FileDropzone v-model="selectedFile" label="File Berita Acara" accept="application/pdf" :max-mb="5" />

        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="title">Judul Berita Acara</Label>
            <Input id="title" v-model="formData.title" placeholder="Masukkan judul..." />
          </div>
          <div class="space-y-2">
            <Label for="description">Deskripsi (Opsional)</Label>
            <Input id="description" v-model="formData.description" placeholder="Deskripsi singkat..." />
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" @click="handleCancel" :disabled="isPending">Batal</Button>
        <Button type="submit" :disabled="!isValidForm || isPending" @click="handleSubmit">
          <Icons.Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
          {{ isPending ? 'Mengunggah...' : 'Tambah Berita Acara' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';

import FileDropzone from '@/components/FileDropzone.vue';
// Import your new component
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
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import { uploadBeritaAcara } from '../../services/berita-acara';

// State
const isDialogOpen = ref(false);
const selectedFile = ref<File | null>(null);
const formData = reactive({ title: '', description: '' });

// Computed Validation
const isValidForm = computed(() => !!selectedFile.value && !!formData.title.trim());

const queryClient = useQueryClient();

const { mutate: mutateUpload, isPending } = useMutation({
  mutationFn: (data: FormData) => uploadBeritaAcara(data),
  onSuccess: () => {
    toast.success('Berita acara berhasil ditambahkan');
    queryClient.invalidateQueries({ queryKey: ['berita-acara'] });
    handleCancel();
  },
  onError: (error: any) => {
    toast.error(`Gagal: ${error.message || 'Error uploading'}`);
  },
});

const handleCancel = () => {
  selectedFile.value = null;
  formData.title = '';
  formData.description = '';
  isDialogOpen.value = false;
};

const handleSubmit = () => {
  if (!selectedFile.value) return;

  const uploadData = new FormData();
  uploadData.append('file', selectedFile.value);
  uploadData.append('title', formData.title.trim());
  if (formData.description.trim()) {
    uploadData.append('description', formData.description.trim());
  }

  mutateUpload(uploadData);
};
</script>
