<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Hapus Sertifikat</AlertDialogTitle>
        <AlertDialogDescription>
          Apakah Anda yakin ingin menghapus sertifikat
          <span class="font-medium">"{{ certificateName }}"</span>? Tindakan ini tidak dapat dibatalkan.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel :disabled="isPending">Batal</AlertDialogCancel>
        <AlertDialogAction @click="handleDelete" :disabled="isPending" class="bg-destructive hover:bg-destructive/90">
          <Icons.Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
          {{ isPending ? 'Menghapus...' : 'Hapus' }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import type { BaseError } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';

import { Icons } from '@/components/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deleteUserCertificate } from '../../services/certificate';

interface Props {
  certificateId: number;
  certificateName: string;
}

const props = defineProps<Props>();
const open = defineModel<boolean>('open', { required: true });

const queryClient = useQueryClient();

// Delete mutation
const { mutate: mutateDelete, isPending } = useMutation({
  mutationFn: () => deleteUserCertificate(props.certificateId),
  onSuccess: () => {
    toast.success('Sertifikat berhasil dihapus');
    queryClient.invalidateQueries({ queryKey: ['user-certificates'] });
    open.value = false;
  },
  onError: (err: BaseError) => {
    toast.error('Gagal menghapus sertifikat', {
      description: err.response?.data?.error?.error_description || err.message || 'Terjadi kesalahan',
    });
  },
});

const handleDelete = () => {
  mutateDelete();
};
</script>
