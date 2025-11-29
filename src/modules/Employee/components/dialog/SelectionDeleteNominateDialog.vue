<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Hapus Pegawai Sebagai Nominasi</DialogTitle>
        <DialogDescription>
          Apakah anda yakin ingin menghapus {{ employee.employee_name }} dari nominasi
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button variant="outline" @click="isOpen = false" class="cursor-pointer">Batal</Button>
        <Button @click="handleNominate" :disabled="isPending" class="cursor-pointer">
          <Icons.Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
          {{ isPending ? 'Memulai...' : 'Ya' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
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
import { deleteNomination } from '../../services/ranking';

import type { NominationDetail } from '@/types/ranking';

const props = defineProps<{
  employee: NominationDetail;
}>();

const queryClient = useQueryClient();
const isOpen = defineModel<boolean>('open', { default: false });

const { mutate: mutateDeleteNomination, isPending } = useMutation({
  mutationFn: () => deleteNomination({ employee_id: props.employee.employee_id }),
  onSuccess: _ => {
    toast.success('Berhasil menghapus nominasi');
    queryClient.invalidateQueries({ queryKey: ['nominations'] });
    isOpen.value = false;
  },
  onError: (error: BaseError) => {
    const err = error.response?.data;
    toast.error(err?.error.error_description || 'Gagal menghapus nominasi');
    isOpen.value = false;
  },
});

function handleNominate() {
  mutateDeleteNomination();
}
</script>
