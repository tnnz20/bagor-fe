<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Konfirmasi Hapus Pengguna</DialogTitle>
        <DialogDescription>
          Apakah Anda yakin ingin menghapus pengguna <strong>{{ props.fullName }}</strong
          >? Tindakan ini tidak dapat dibatalkan.
        </DialogDescription>
      </DialogHeader>
      <div class="bg-destructive/10 flex items-center space-x-2 rounded-lg p-4">
        <Icons.AlertTriangle class="text-destructive h-5 w-5" />
        <span class="text-destructive text-sm"> Data pengguna akan dihapus secara permanen dari sistem. </span>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" @click="isOpen = false"> Batal </Button>
        <Button @click="handleDeleteUser" :disabled="isPending">
          <Icons.Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
          {{ isPending ? 'Memproses...' : 'Hapus' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import type { BaseError } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';

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
import { deleteUser } from '../../services/user';

const props = defineProps<{
  userId: string;
  fullName: string;
}>();

const isOpen = defineModel<boolean>('open', { default: false });

const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();

const { mutate: mutateDeleteUser, isPending } = useMutation({
  mutationFn: () => deleteUser(props.userId),
  onSuccess: () => {
    toast.success('Pengguna berhasil dihapus');
    isOpen.value = false;
    queryClient.invalidateQueries({ queryKey: ['users'] });
    queryClient.invalidateQueries({ queryKey: ['user-detail', props.userId] });

    // Navigate to users list if on detail page
    if (route.name === 'User Detail') {
      router.push({ name: 'Users Managements' });
    }
  },
  onError: (error: BaseError) => {
    toast.error(`Gagal menghapus pengguna: ${error.message || 'Terjadi kesalahan saat menghapus pengguna.'}`);
  },
});

const handleDeleteUser = () => {
  mutateDeleteUser();
};
</script>
