<template>
  <div class="space-y-4">
    <p class="text-sm font-medium">{{ label }}</p>

    <div
      ref="dropZone"
      class="relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors"
      :class="{
        'border-primary bg-primary/5': isDragOver,
        'border-muted-foreground/25 hover:border-muted-foreground/50': !isDragOver,
        'border-green-500 bg-green-50': modelValue,
        'border-red-500 bg-red-50': errorState,
      }"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="handleDrop"
      @click="triggerInput"
    >
      <input ref="fileInput" type="file" class="sr-only" :accept="accept" @change="handleFileChange" />

      <div v-if="!modelValue && !errorState" class="space-y-3">
        <div class="bg-muted mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <slot name="icon"><Icons.FileText class="text-muted-foreground h-6 w-6" /></slot>
        </div>
        <div class="space-y-1">
          <p class="text-sm font-medium">Drag & drop file or click to select</p>
          <p class="text-muted-foreground text-xs">Max size: {{ maxMb }}MB</p>
        </div>
      </div>

      <div v-else-if="modelValue && !errorState" class="space-y-3">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Icons.FileText class="h-6 w-6 text-green-600" />
        </div>
        <div class="space-y-1">
          <p class="text-sm font-medium text-green-700">{{ modelValue.name }}</p>
          <p class="text-xs text-green-600">{{ formatFileSize(modelValue.size) }}</p>
        </div>
        <Button variant="ghost" size="sm" class="text-red-600 hover:bg-red-50" @click.stop="removeFile">
          <Icons.X class="mr-1 h-3 w-3" /> Remove File
        </Button>
      </div>

      <div v-else-if="errorState" class="space-y-3">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <Icons.AlertTriangle class="h-6 w-6 text-red-600" />
        </div>
        <div class="space-y-1">
          <p class="text-sm font-medium text-red-700">{{ errorState }}</p>
          <p class="text-xs text-red-600">Click to try again</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { formatFileSize } from '@/lib/utils';

import { Icons } from '@/components/icons'; // Adjust path
import { Button } from '@/components/ui/button';

const props = defineProps<{
  modelValue: File | null;
  label?: string;
  accept?: string;
  maxMb?: number;
}>();

const emit = defineEmits(['update:modelValue', 'error']);

const fileInput = ref<HTMLInputElement>();
const isDragOver = ref(false);
const errorState = ref<string>('');

const MAX_SIZE = (props.maxMb || 5) * 1024 * 1024;

const validate = (file: File) => {
  if (props.accept && !file.type.match(props.accept.replace('*', '.*'))) {
    errorState.value = 'Invalid file format';
    return false;
  }
  if (file.size > MAX_SIZE) {
    errorState.value = `File too large (Max ${props.maxMb}MB)`;
    return false;
  }
  errorState.value = '';
  return true;
};

const handleFile = (file: File) => {
  if (validate(file)) {
    emit('update:modelValue', file);
  }
};

const handleDrop = (e: DragEvent) => {
  isDragOver.value = false;
  const file = e.dataTransfer?.files[0];
  if (file) handleFile(file);
};

const handleFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) handleFile(file);
};

const triggerInput = () => {
  if (errorState.value) errorState.value = ''; // Clear error on retry
  fileInput.value?.click();
};

const removeFile = () => {
  emit('update:modelValue', null);
  if (fileInput.value) fileInput.value.value = '';
};
</script>
