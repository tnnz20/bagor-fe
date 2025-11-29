<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Penilaian Keterlambatan</DialogTitle>
        <DialogDescription> Update total keterlambatan untuk {{ employee.full_name }} </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="attendance_delay_seconds">Total Keterlambatan</Label>
          <div class="col-span-3 flex items-center gap-2">
            <div class="flex-1">
              <Label for="hours" class="text-muted-foreground text-xs">Jam</Label>
              <Input
                id="hours"
                v-model.number="delayHours"
                type="number"
                min="0"
                max="23"
                placeholder="0"
                class="mt-1"
              />
            </div>
            <span class="text-muted-foreground mt-6">:</span>
            <div class="flex-1">
              <Label for="minutes" class="text-muted-foreground text-xs">Menit</Label>
              <Input
                id="minutes"
                v-model.number="delayMinutes"
                type="number"
                min="0"
                max="59"
                placeholder="0"
                class="mt-1"
              />
            </div>
            <span class="text-muted-foreground mt-6">:</span>
            <div class="flex-1">
              <Label for="seconds" class="text-muted-foreground text-xs">Detik</Label>
              <Input
                id="seconds"
                v-model.number="delaySeconds"
                type="number"
                min="0"
                max="59"
                placeholder="0"
                class="mt-1"
              />
            </div>
          </div>
        </div>
        <div v-if="totalDelayInSeconds > 0" class="grid grid-cols-4 items-center gap-4">
          <div class="text-muted-foreground col-span-3 col-start-2 text-sm">
            Total: {{ totalDelayInSeconds }} detik ({{ formatDelayTime(totalDelayInSeconds) }})
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="isOpen = false">Batal</Button>
        <Button @click="handleUpdateAttendanceDelay" :disabled="isUpdating">
          <Icons.Loader2 v-if="isUpdating" class="mr-2 h-4 w-4 animate-spin" />
          {{ isUpdating ? 'Menyimpan...' : 'Simpan' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateScore } from '../../services/employee';

import type { EmployeeScore } from '@/types/employee';

const props = defineProps<{
  employee: EmployeeScore;
}>();

const isOpen = defineModel<boolean>('open', { default: false });

const queryClient = useQueryClient();

// Form inputs for attendance delay (time picker: hours, minutes, seconds)
const delayHours = ref<number>(0);
const delayMinutes = ref<number>(0);
const delaySeconds = ref<number>(0);

// Computed: Convert time inputs to total seconds
const totalDelayInSeconds = computed(() => {
  const hours = delayHours.value || 0;
  const minutes = delayMinutes.value || 0;
  const seconds = delaySeconds.value || 0;
  return hours * 3600 + minutes * 60 + seconds;
});

// Helper function to convert seconds back to hours, minutes, seconds
const secondsToTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
};

// Helper function to format delay time for display
const formatDelayTime = (totalSeconds: number) => {
  const { hours, minutes, seconds } = secondsToTime(totalSeconds);
  const parts = [];
  if (hours > 0) parts.push(`${hours} jam`);
  if (minutes > 0) parts.push(`${minutes} menit`);
  if (seconds > 0) parts.push(`${seconds} detik`);
  return parts.length > 0 ? parts.join(' ') : '0 detik';
};

// Watch for dialog open and initialize time values
watch(isOpen, newValue => {
  if (newValue) {
    // Convert current attendance_delay_seconds to hours, minutes, seconds
    const time = secondsToTime(props.employee.attendance_delay_seconds);
    delayHours.value = time.hours;
    delayMinutes.value = time.minutes;
    delaySeconds.value = time.seconds;
  }
});

// Mutation for updating attendance delay
const { mutate: mutateAttendanceDelay, isPending: isUpdating } = useMutation({
  mutationFn: (payload: { attendance_delay_seconds: number }) => updateScore(props.employee.user_id, payload),
  onSuccess: () => {
    toast.success('Skor keterlambatan berhasil diperbarui');
    queryClient.invalidateQueries({ queryKey: ['scores'] });
    isOpen.value = false;
  },
  onError: (error: BaseError) => {
    const err = error?.response?.data;
    const errorMessage = err?.error?.error_name || 'Gagal memperbarui skor keterlambatan';
    toast.error(errorMessage);
    isOpen.value = false;
  },
});

// Handle update function
const handleUpdateAttendanceDelay = () => {
  if (totalDelayInSeconds.value < 0) {
    toast.error('Nilai keterlambatan tidak valid');
    return;
  }
  mutateAttendanceDelay({
    attendance_delay_seconds: totalDelayInSeconds.value,
  });
};
</script>
