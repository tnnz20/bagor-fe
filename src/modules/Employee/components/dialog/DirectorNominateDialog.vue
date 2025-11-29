<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Nominate Pegawai</DialogTitle>
        <DialogDescription> Apakah anda ingin memilih {{ employee.employee_name }} sebagai nominasi </DialogDescription>
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
import { createShortlist } from '../../services/ranking';

import type { NominatePayload, NominationDetail } from '@/types/ranking';

const props = defineProps<{
  employee: NominationDetail;
}>();

const queryClient = useQueryClient();
const isOpen = defineModel<boolean>('open', { default: false });

const { mutate: mutateCreateNomination, isPending } = useMutation({
  mutationFn: () =>
    createShortlist({
      employee_id: props.employee.employee_id,
    } as NominatePayload),
  onSuccess: _ => {
    toast.success('Berhasil menambahkan nominasi');
    isOpen.value = false;
    queryClient.invalidateQueries({ queryKey: ['shortlist'] });
  },
  onError: (error: BaseError) => {
    const err = error.response?.data;
    let errMessage =
      err?.code === 400 ? 'Tidak Boleh Memilih Pegawai dengan Jenis Jabatan yang Sama' : 'Gagal menambahkan nominasi';
    toast.error(errMessage);
    isOpen.value = false;
  },
});

const handleNominate = () => {
  mutateCreateNomination();
};
</script>
