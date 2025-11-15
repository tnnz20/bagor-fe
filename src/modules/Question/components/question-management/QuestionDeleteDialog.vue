<template>
  <Dialog v-model:open="DeleteDialogModel">
    <DialogContent class="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Konfirmasi Hapus Pertanyaan</DialogTitle>
        <DialogDescription>
          Apakah Anda yakin ingin menghapus pertanyaan ini? Tindakan ini tidak dapat dibatalkan.
        </DialogDescription>
      </DialogHeader>

      <div class="bg-destructive/10 flex items-center space-x-2 rounded-lg p-4">
        <Icons.AlertTriangle class="text-destructive h-5 w-5" />
        <span class="text-destructive text-sm"> Data pertanyaan akan dihapus secara permanen dari sistem. </span>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" @click="DeleteDialogModel = false"> Batal </Button>
        <Button type="button" variant="destructive" @click="handleConfirm"> Hapus Pertanyaan </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
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

const DeleteDialogModel = defineModel<boolean>('modelValue');

const emit = defineEmits<{
  confirm: [];
}>();

const handleConfirm = () => {
  emit('confirm');
};
</script>
