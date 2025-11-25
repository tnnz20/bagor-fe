<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {{ user?.is_active ? 'Nonaktifkan Pengguna' : 'Aktifkan Pengguna' }}
        </AlertDialogTitle>
        <AlertDialogDescription>
          Apakah Anda yakin ingin {{ user?.is_active ? 'menonaktifkan' : 'mengaktifkan' }} pengguna
          <strong>{{ user?.profile.full_name }}</strong
          >?
          {{
            user?.is_active
              ? 'Pengguna yang dinonaktifkan tidak akan dapat mengakses sistem.'
              : 'Pengguna akan dapat mengakses sistem kembali.'
          }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Batal</AlertDialogCancel>
        <AlertDialogAction @click="handleStatusChange" :disabled="updateStatusMutation.isPending.value">
          {{ updateStatusMutation.isPending.value ? 'Memproses...' : 'Ya, Lanjutkan' }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import type { BaseError } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';

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
import { updateUserStatus } from '../../services/user';

import type { UserDetail } from '@/types/user';

interface Props {
  user: UserDetail;
}

const props = defineProps<Props>();

const queryClient = useQueryClient();

const isOpen = defineModel<boolean>('open', { default: false });

// Update user status mutation
const updateStatusMutation = useMutation({
  mutationFn: (isActive: boolean) => updateUserStatus(props?.user?.id, isActive),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['user-detail', props?.user?.id] });
    queryClient.invalidateQueries({ queryKey: ['users'] });
    toast.success('Berhasil!', {
      description: `Status pengguna berhasil ${props?.user?.is_active ? 'dinonaktifkan' : 'diaktifkan'}.`,
    });
    isOpen.value = false;
  },
  onError: (err: BaseError) => {
    const errRes = err.response?.data;
    console.error('Failed to update user status:', err);
    const errorMessage = errRes?.error?.error_description || 'Terjadi kesalahan saat memperbarui status pengguna.';
    toast.error('Gagal Memperbarui Status', {
      description: errorMessage,
    });
  },
});

// Handle status change
const handleStatusChange = () => {
  if (!props.user) return;
  const newStatus = !props.user.is_active;
  updateStatusMutation.mutate(newStatus);
};
</script>
