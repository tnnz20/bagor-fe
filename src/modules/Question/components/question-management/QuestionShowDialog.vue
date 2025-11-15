<template>
  <Dialog v-model:open="ShowDialogModel">
    <DialogContent class="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Detail Pertanyaan</DialogTitle>
        <DialogDescription> Informasi lengkap tentang pertanyaan ini </DialogDescription>
      </DialogHeader>

      <div v-if="question" class="space-y-6">
        <!-- Question Info -->
        <div class="space-y-4">
          <!-- Category & Order -->
          <div class="flex items-center gap-3">
            <Badge variant="secondary" class="text-sm">
              <Icons.BookOpenText class="mr-2 h-3 w-3" />
              {{ question.category }}
            </Badge>
            <Badge variant="outline" class="text-sm"> Urutan: {{ question.display_order }} </Badge>
          </div>

          <!-- Question Text -->
          <div class="space-y-2">
            <p class="text-base font-semibold">Pertanyaan</p>
            <div class="bg-muted/50 rounded-lg border p-4">
              <p class="text-sm leading-relaxed">{{ question.question_text }}</p>
            </div>
          </div>

          <!-- Choices Section -->
          <div class="space-y-3">
            <p class="text-base font-semibold">Pilihan Jawaban ({{ question.choices.length }})</p>
            <div class="space-y-2">
              <Card v-for="(choice, index) in question.choices" :key="choice.id">
                <CardContent class="p-4">
                  <div class="flex items-start gap-3">
                    <!-- Choice Letter -->
                    <div
                      class="border-primary bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold"
                    >
                      {{ String.fromCharCode(65 + index) }}
                    </div>

                    <!-- Choice Content -->
                    <div class="flex-1 space-y-2">
                      <p class="text-sm leading-relaxed font-medium">{{ choice.choice_text }}</p>
                      <div class="flex items-center gap-2">
                        <Badge :variant="choice.score > 0 ? 'default' : 'secondary'" class="text-xs">
                          Skor: {{ choice.score }}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <!-- Metadata -->
          <div class="bg-muted/30 rounded-lg border p-4">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="space-y-1">
                <p class="text-muted-foreground text-xs font-medium">Dibuat pada</p>
                <p class="font-medium">{{ formatDate(question.created_at) }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-muted-foreground text-xs font-medium">Terakhir diubah</p>
                <p class="font-medium">{{ formatDate(question.updated_at) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center py-12 text-center">
        <Icons.FileQuestion class="text-muted-foreground mb-4 h-12 w-12" />
        <p class="text-muted-foreground text-sm">Tidak ada data pertanyaan yang dipilih</p>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" @click="ShowDialogModel = false"> Tutup </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { Question } from '@/types/question';

interface QuestionShowDialogProps {
  question?: Question | null;
}

defineProps<QuestionShowDialogProps>();

const ShowDialogModel = defineModel<boolean>('modelValue', { default: false });

const formatDate = (timestamp: number) => {
  return DateTime.fromSeconds(timestamp).setLocale('id').toLocaleString(DateTime.DATE_FULL);
};
</script>
