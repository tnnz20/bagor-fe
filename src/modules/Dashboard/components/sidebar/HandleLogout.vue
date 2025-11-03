<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Apakah anda ingin keluar dari aplikasi?</AlertDialogTitle>
        <AlertDialogDescription> Klik "Lanjut" untuk mengonfirmasi keluar dari aplikasi. </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Batal</AlertDialogCancel>
        <AlertDialogAction @click="onLogout">
          {{ isPending ? 'Memproses...' : 'Lanjut' }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';

import { LogoutUser } from '@/modules/User/services/auth';
import { useAuthStore } from '@/stores/auth';

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

const isOpen = defineModel('open', {
  type: Boolean,
  required: true,
});

const router = useRouter();

const authStore = useAuthStore();

const queryClient = useQueryClient();

const { mutate, isPending } = useMutation({
  mutationFn: LogoutUser,
  onSuccess: () => {
    queryClient.clear();
    authStore.logout();

    isOpen.value = false;

    router.push('/login');
  },
  onError: error => {
    toast.error('Gagal keluar dari aplikasi. Silakan coba lagi.');
    console.error('Logout error:', error);
  },
});

const onLogout = () => {
  mutate();
};
</script>
