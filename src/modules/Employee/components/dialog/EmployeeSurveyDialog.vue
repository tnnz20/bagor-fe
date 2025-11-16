<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Penilaian Kinerja</DialogTitle>
        <DialogDescription> Apakah anda ingin menilai kinerja dari {{ employee.full_name }} </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button variant="outline" @click="isOpen = false" class="cursor-pointer">Batal</Button>
        <Button @click="handleStartSurvey" :disabled="isPending" class="cursor-pointer">
          <Icons.Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
          {{ isPending ? 'Memulai...' : 'Ya' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useMutation } from '@tanstack/vue-query';
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
import { StartScoring } from '../../services/scoring';

import type { EmployeeTableColumn } from '@/types/employee';
import type { StartScoringPayload } from '@/types/scoring';

const props = defineProps<{
  employee: EmployeeTableColumn;
}>();

const isOpen = defineModel<boolean>('open', { default: false });
const router = useRouter();

// Mutation for starting survey
const { mutate: mutateStartSurvey, isPending } = useMutation({
  mutationFn: () =>
    StartScoring({
      user_id: props.employee.user_id,
    } as StartScoringPayload),
  onSuccess: response => {
    if (response.data?.slug_param) {
      toast.success('Penilaian kinerja dimulai');
      isOpen.value = false;
      // Redirect to questions page with slug
      router.push(`/questions/${response.data.slug_param}`);
    } else {
      toast.error('Gagal mendapatkan slug penilaian');
    }
  },
  onError: (error: any) => {
    toast.error(error?.response?.data?.message || 'Gagal memulai penilaian kinerja');
  },
});

const handleStartSurvey = () => {
  mutateStartSurvey();
};
</script>
