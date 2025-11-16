<template>
  <Dialog v-model:open="dialogModel">
    <DialogContent class="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle class="text-2xl">Hasil Penilaian</DialogTitle>
        <DialogDescription> Berikut adalah hasil penilaian berdasarkan pilihan jawaban Anda </DialogDescription>
      </DialogHeader>

      <div class="space-y-6">
        <!-- Score Summary -->
        <div class="border-primary/20 from-primary/5 to-primary/10 rounded-xl border-2 bg-linear-to-br p-6">
          <div class="text-center">
            <p class="text-muted-foreground mb-2 text-sm font-medium tracking-wide uppercase">Total Skor Anda</p>
            <div class="mb-3 flex items-center justify-center gap-2">
              <span class="text-primary text-5xl font-bold">{{ totalScore }}</span>
              <span class="text-muted-foreground text-2xl font-medium">/</span>
              <span class="text-muted-foreground text-3xl font-semibold">{{ maxPossibleScore }}</span>
            </div>
            <!-- Percentage Display -->
            <div class="mt-4 flex items-center justify-center gap-2">
              <div class="bg-primary/10 text-primary rounded-full px-6 py-2">
                <span class="text-2xl font-bold">{{ totalPercentage.toFixed(2) }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Question Results -->
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">Detail Jawaban</h3>
          <div class="max-h-80 space-y-2 overflow-y-auto pr-2">
            <Card
              v-for="(question, index) in questions"
              :key="question.id"
              class="border-l-4 transition-all hover:shadow-md"
              :class="{
                'border-l-primary': userAnswers[question.id] !== undefined,
                'border-l-muted': userAnswers[question.id] === undefined,
              }"
            >
              <CardContent class="p-4">
                <div class="flex items-start gap-4">
                  <!-- Question Number -->
                  <div class="flex shrink-0 flex-col items-center gap-1">
                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold"
                      :class="{
                        'border-primary bg-primary/10 text-primary': userAnswers[question.id] !== undefined,
                        'border-muted-foreground bg-muted text-muted-foreground':
                          userAnswers[question.id] === undefined,
                      }"
                    >
                      {{ index + 1 }}
                    </div>
                  </div>

                  <!-- Question Details -->
                  <div class="min-w-0 flex-1">
                    <div class="mb-2 flex items-center gap-2">
                      <Badge variant="outline" class="text-xs">{{ question.category }}</Badge>
                    </div>
                    <p class="mb-2 text-sm leading-relaxed font-medium">{{ question.question_text }}</p>

                    <div class="bg-muted/50 mt-3 flex items-center justify-between rounded-lg p-3">
                      <div class="flex items-center gap-2">
                        <span class="text-muted-foreground text-xs font-medium">Jawaban Anda:</span>
                        <Badge variant="secondary" class="font-mono text-xs">
                          {{ getAnswerLabel(userAnswers[question.id]) }}
                        </Badge>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="text-muted-foreground text-xs font-medium">Skor:</span>
                        <Badge :variant="getUserChoiceScore(question.id) > 0 ? 'default' : 'outline'" class="font-mono">
                          {{ getUserChoiceScore(question.id) }}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" class="cursor-pointer" @click="$emit('reset')">
          <Icons.RotateCw class="mr-2 h-4 w-4" />
          Ulangi Penilaian
        </Button>
        <Button @click="$emit('submit', slug, totalPercentage)" class="cursor-pointer">
          <Icons.Check class="mr-2 h-4 w-4" />
          Selesai
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

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

interface QuestionResultDialogProps {
  questions: Question[];
  userAnswers: Record<number, number>;
  slug: string;
}

const props = defineProps<QuestionResultDialogProps>();
const dialogModel = defineModel<boolean>('modelValue');

defineEmits<{
  reset: [];
  submit: [slug: string, percentage: number];
}>();

// Computed properties
const totalScore = computed(() => {
  return props.questions.reduce((total: number, question) => {
    const userAnswer = props.userAnswers[question.id];
    if (userAnswer === undefined) return total;

    const selectedChoice = question.choices[userAnswer];
    return total + (selectedChoice?.score || 0);
  }, 0);
});

const maxPossibleScore = computed(() => {
  return props.questions.reduce((total: number, question) => {
    const maxScore = Math.max(...question.choices.map(choice => choice.score));
    return total + maxScore;
  }, 0);
});

const totalPercentage = computed(() => {
  if (maxPossibleScore.value === 0) return 0;
  return (totalScore.value / maxPossibleScore.value) * 100;
});

// Methods
const getUserChoiceScore = (questionId: number) => {
  const question = props.questions.find(q => q.id === questionId);
  if (!question) return 0;

  const userAnswer = props.userAnswers[questionId];
  if (userAnswer === undefined) return 0;

  return question.choices[userAnswer]?.score || 0;
};

const getAnswerLabel = (answerIndex: number | undefined) => {
  if (answerIndex === undefined) return '-';
  return String.fromCodePoint(65 + answerIndex); // A, B, C, D
};
</script>
