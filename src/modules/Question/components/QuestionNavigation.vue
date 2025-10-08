<template>
  <Card class="sticky top-4">
    <CardHeader>
      <CardTitle class="text-lg">Navigasi Soal</CardTitle>
      <CardDescription class="text-foreground text-sm">Klik nomor untuk langsung ke soal</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-5 gap-2">
        <Button
          v-for="(question, index) in sortedQuestions"
          :key="question.id"
          :variant="getQuestionButtonVariant(index)"
          class="aspect-square text-sm font-medium"
          :class="{
            'ring-primary ring-2': currentQuestionIndex === index,
            'bg-primary/15 hover:bg-primary/35': getQuestionButtonVariant(index) === 'secondary',
          }"
          @click="$emit('goToQuestion', index)"
          :title="`${question.category}: ${question.quiz}`"
        >
          {{ index + 1 }}
        </Button>
      </div>

      <!-- Legend -->
      <div class="mt-6 space-y-2 text-xs">
        <div class="flex items-center space-x-2">
          <div class="bg-primary h-4 w-4 rounded"></div>
          <span>Soal saat ini</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="bg-primary/15 h-4 w-4 rounded"></div>
          <span>Sudah dijawab</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="bg-background h-4 w-4 rounded border"></div>
          <span>Belum dijawab</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import type { Question } from '@/types/question';

interface QuestionDisplayProps {
  sortedQuestions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<number, number>;
}

const { sortedQuestions, currentQuestionIndex, userAnswers } = defineProps<QuestionDisplayProps>();

const emit = defineEmits<{
  goToQuestion: [index: number];
}>();

const getQuestionButtonVariant = (index: number) => {
  const questionId = sortedQuestions[index].id;

  if (currentQuestionIndex === index) {
    return 'default';
  } else if (userAnswers[questionId] !== undefined) {
    return 'secondary';
  } else {
    return 'outline';
  }
};
</script>
