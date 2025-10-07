<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>
        <Icons.Plus class="mr-2 h-4 w-4" />
        Tambah Berita Acara
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Tambah Berita Acara</DialogTitle>
        <DialogDescription>Upload file berita acara dalam format PDF</DialogDescription>
      </DialogHeader>
      <div class="grid gap-6 py-4">
        <!-- File Upload Area -->
        <div class="space-y-4">
          <p class="text-sm font-medium">File Berita Acara</p>
          <div
            ref="dropZone"
            class="relative rounded-lg border-2 border-dashed p-8 text-center transition-colors"
            :class="{
              'border-primary bg-primary/5': isDragOver,
              'border-muted-foreground/25 hover:border-muted-foreground/50': !isDragOver,
              'border-green-500 bg-green-50': selectedFile,
              'border-red-500 bg-red-50': hasError,
            }"
            @dragover.prevent="handleDragOver"
            @dragleave.prevent="handleDragLeave"
            @drop.prevent="handleDrop"
            @click="triggerFileInput"
          >
            <input ref="fileInput" type="file" class="sr-only" accept=".pdf" @change="handleFileChange" />

            <!-- Upload State -->
            <div v-if="!selectedFile && !hasError" class="space-y-3">
              <div class="bg-muted mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                <Icons.FileText class="text-muted-foreground h-6 w-6" />
              </div>
              <div class="space-y-1">
                <p class="text-sm font-medium">Drag & drop file PDF atau klik untuk memilih</p>
                <p class="text-muted-foreground text-xs">Maksimal ukuran file 5MB</p>
              </div>
            </div>

            <!-- Selected File State -->
            <div v-else-if="selectedFile && !hasError" class="space-y-3">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Icons.FileText class="h-6 w-6 text-green-600" />
              </div>
              <div class="space-y-1">
                <p class="text-sm font-medium text-green-700">{{ selectedFile.name }}</p>
                <p class="text-xs text-green-600">
                  {{ formatFileSize(selectedFile.size) }}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                class="text-red-600 hover:bg-red-50 hover:text-red-700"
                @click.stop="removeFile"
              >
                <Icons.X class="mr-1 h-3 w-3" />
                Hapus File
              </Button>
            </div>

            <!-- Error State -->
            <div v-else-if="hasError" class="space-y-3">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Icons.AlertTriangle class="h-6 w-6 text-red-600" />
              </div>
              <div class="space-y-1">
                <p class="text-sm font-medium text-red-700">{{ errorMessage }}</p>
                <p class="text-xs text-red-600">Klik untuk mencoba lagi</p>
              </div>
            </div>
          </div>

          <!-- File Requirements -->
          <div class="text-muted-foreground space-y-1 text-xs">
            <p>• Format yang didukung: PDF</p>
            <p>• Maksimal ukuran file: 5MB</p>
            <p>• Drag & drop atau klik untuk memilih file</p>
          </div>
        </div>

        <!-- Additional Fields -->
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="title">Judul Berita Acara</Label>
            <Input id="title" v-model="formData.title" placeholder="Masukkan judul berita acara..." />
          </div>
          <div class="space-y-2">
            <Label for="description">Deskripsi (Opsional)</Label>
            <Input id="description" v-model="formData.description" placeholder="Deskripsi singkat berita acara..." />
          </div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline" @click="resetForm">Batal</Button>
        </DialogClose>
        <Button type="submit" :disabled="!selectedFile || hasError" @click="handleSubmit"> Tambah Berita Acara </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// File upload state
const fileInput = ref<HTMLInputElement>();
const dropZone = ref<HTMLDivElement>();
const selectedFile = ref<File | null>(null);
const isDragOver = ref(false);
const hasError = ref(false);
const errorMessage = ref('');

// Form data
const formData = reactive({
  title: '',
  description: '',
});

// File size formatter
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// File validation
const validateFile = (file: File): boolean => {
  // Check file type
  if (file.type !== 'application/pdf') {
    errorMessage.value = 'Hanya file PDF yang diizinkan';
    hasError.value = true;
    return false;
  }

  // Check file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    errorMessage.value = 'Ukuran file terlalu besar. Maksimal 5MB';
    hasError.value = true;
    return false;
  }

  hasError.value = false;
  errorMessage.value = '';
  return true;
};

// File input handlers
const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file && validateFile(file)) {
    selectedFile.value = file;
  }
};

// Drag and drop handlers
const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = true;
};

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;

  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    const file = files[0];
    if (validateFile(file)) {
      selectedFile.value = file;
    }
  }
};

// File management
const removeFile = () => {
  selectedFile.value = null;
  hasError.value = false;
  errorMessage.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// Form handlers
const resetForm = () => {
  selectedFile.value = null;
  hasError.value = false;
  errorMessage.value = '';
  formData.title = '';
  formData.description = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const handleSubmit = () => {
  if (!selectedFile.value) {
    hasError.value = true;
    errorMessage.value = 'Silakan pilih file PDF terlebih dahulu';
    return;
  }

  if (!formData.title.trim()) {
    alert('Judul berita acara harus diisi');
    return;
  }

  // Handle form submission here

  console.log('Submitting:', {
    file: selectedFile.value,
    title: formData.title,
    description: formData.description,
  });

  // Reset form after successful submission
  resetForm();
};
</script>
