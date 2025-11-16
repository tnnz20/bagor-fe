<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Penilaian Kehadiran</DialogTitle>
        <DialogDescription> Update skor kehadiran untuk {{ employee.full_name }} </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="presence_score" class="text-right">Skor Kehadiran</Label>
          <Input
            id="presence_score"
            v-model.number="presenceScoreInput"
            type="number"
            step="0.01"
            min="0"
            max="100"
            class="col-span-3"
            placeholder="Masukkan skor kehadiran"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="isOpen = false">Batal</Button>
        <Button @click="handleUpdatePresenceScore" :disabled="isUpdating">
          <Icons.Loader2 v-if="isUpdating" class="mr-2 h-4 w-4 animate-spin" />
          {{ isUpdating ? 'Menyimpan...' : 'Simpan' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateScore } from '../../services/employee';

import type { EmployeeScore } from '@/types/employee';

const props = defineProps<{
  employee: EmployeeScore;
}>();

const isOpen = defineModel<boolean>('open', { default: false });

const queryClient = useQueryClient();

// Form input for presence score
const presenceScoreInput = ref<number>(props.employee.presence_score);

// Watch for dialog open and initialize value
watch(isOpen, newValue => {
  if (newValue) {
    presenceScoreInput.value = props.employee.presence_score;
  }
});

// Mutation for updating presence score
const { mutate: mutatePresenceScore, isPending: isUpdating } = useMutation({
  mutationFn: (payload: { presence_score: number }) => updateScore(props.employee.user_id, payload),
  onSuccess: () => {
    toast.success('Skor kehadiran berhasil diperbarui');
    queryClient.invalidateQueries({ queryKey: ['score'] });
    isOpen.value = false;
  },
  onError: (error: any) => {
    toast.error(error?.response?.data?.message || 'Gagal memperbarui skor kehadiran');
  },
});

// Handle update function
const handleUpdatePresenceScore = () => {
  if (presenceScoreInput.value === undefined || presenceScoreInput.value < 0) {
    toast.error('Skor kehadiran tidak valid');
    return;
  }
  mutatePresenceScore({
    presence_score: presenceScoreInput.value,
  });
};
</script>
