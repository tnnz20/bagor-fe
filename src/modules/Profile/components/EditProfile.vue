<template>
  <div>
    <h3 class="text-lg font-medium">Profile</h3>
    <p class="text-muted-foreground text-sm">Anda dapat mengatur data diri anda disini.</p>
  </div>
  <Separator />
  <form class="space-y-8">
    <FormField name="nama">
      <FormItem>
        <FormLabel>Nama Lengkap</FormLabel>
        <FormControl>
          <Input disabled type="text" placeholder="Ahmad Khairol Maulidi S.T.," />
        </FormControl>
        <FormDescription> Jika nama anda salah, silahkan hubungi admin untuk mengubahnya. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="jabatan">
      <FormItem>
        <FormLabel>Jabatan</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Software Engineer" />
        </FormControl>
        <FormDescription> Jika jabatan anda salah, silahkan isi dengan jabatan yang benar. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="Bagian">
      <FormItem>
        <FormLabel>Bagian</FormLabel>
        <Select>
          <FormControl>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Pilih Bagian" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Bagian</SelectLabel>
              <SelectItem value="bagian_umum_dan_keuangan"> BAGIAN UMUM DAN KEUANGAN </SelectItem>
              <SelectItem value="bagian_perlengkapan_dan_rumah_tangga">
                BAGIAN PERLENGKAPAN DAN RUMAH TANGGA
              </SelectItem>
              <SelectItem value="bagian_organisasi"> BAGIAN ORGANISASI </SelectItem>
              <SelectItem value="bagian_hukum"> BAGIAN HUKUM </SelectItem>
              <SelectItem value="bagian_perekonomian_dan_administrasi_pembangunan">
                BAGIAN PEREKONOMIAN DAN ADMINISTRASI PEMBANGUNAN
              </SelectItem>
              <SelectItem value="bagian_pemerintahan"> BAGIAN PEMERINTAHAN </SelectItem>
              <SelectItem value="bagian_kesejahteraan_rakyat"> BAGIAN KESEJAHTERAAN RAKYAT </SelectItem>
              <SelectItem value="bagian_protokol_dan_komunikasi_pimpinan">
                BAGIAN PROTOKOL DAN KOMUNIKASI PIMPINAN
              </SelectItem>
              <SelectItem value="bagian_pengadaan_barang_dan_jasa"> BAGIAN PENGADAAN BARANG DAN JASA </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormDescription> Jika bagian anda salah, silahkan isi dengan bagian yang benar. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="prestasi">
      <FormItem>
        <FormLabel>Upload Prestasi</FormLabel>
        <FormControl>
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
        </FormControl>
        <FormDescription class="text-muted-foreground space-y-1 text-xs">
          <p>• Format yang didukung: PDF</p>
          <p>• Maksimal ukuran file: 5MB</p>
          <p>• Drag & drop atau klik untuk memilih file</p>
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-start gap-2">
      <Button type="submit"> Update profile </Button>

      <Button type="button" variant="outline" @click="resetForm"> Reset form </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const fileInput = ref<HTMLInputElement>();
const dropZone = ref<HTMLDivElement>();
const selectedFile = ref<File | null>(null);
const isDragOver = ref(false);
const hasError = ref(false);
const errorMessage = ref('');

const formData = reactive({
  title: '',
  description: '',
});

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

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
