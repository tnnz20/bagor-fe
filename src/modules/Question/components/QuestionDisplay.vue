<template>
  <Card class="p-6">
    <div class="space-y-6">
      <!-- Question Header -->
      <CardHeader>
        <div class="flex items-center space-x-4">
          <Badge variant="outline" class="px-3 py-1 text-lg"> Pertanyaan {{ currentQuestionIndex + 1 }} </Badge>
          <div class="bg-muted h-2 flex-1 overflow-hidden rounded-full">
            <div
              class="bg-primary h-full transition-all duration-300"
              :style="{ width: `${((currentQuestionIndex + 1) / sortedQuestionsLength) * 100}%` }"
            ></div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <Badge variant="secondary" class="px-2 py-1 text-sm">Kategori :</Badge>
          <p class="text-sm">{{ currentQuestion.category }}</p>
        </div>
      </CardHeader>

      <!-- Question Text -->
      <CardContent>
        <div class="space-y-4">
          <h2 class="text-xl leading-relaxed font-semibold">
            {{ currentQuestion.quiz }}
          </h2>

          <!-- Answer Choices -->
          <div class="space-y-3">
            <Button
              v-for="(choice, index) in currentQuestion.choices"
              :key="choice.id"
              variant="outline"
              class="h-auto w-full justify-start p-4 text-left text-wrap"
              :class="{
                'border-primary bg-primary/10 text-primary': userAnswers[currentQuestion.id] === index,
                'hover:border-primary/50': userAnswers[currentQuestion.id] !== index,
              }"
              @click="$emit('selectAnswer', currentQuestion.id, index)"
            >
              <div class="flex w-full items-start space-x-3">
                <div
                  class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2"
                  :class="{
                    'border-primary bg-primary text-primary-foreground': userAnswers[currentQuestion.id] === index,
                    'border-muted-foreground': userAnswers[currentQuestion.id] !== index,
                  }"
                >
                  <span class="text-sm font-medium">{{ String.fromCharCode(65 + index) }}</span>
                </div>
                <span class="flex-1 text-sm">{{ choice.text }}</span>
              </div>
            </Button>
          </div>
        </div>
      </CardContent>
      <!-- Navigation Buttons -->
      <CardFooter>
        <div
          :class="
            cn('flex w-full items-center justify-between border-t pt-6', {
              'justify-end': currentQuestionIndex === 0,
            })
          "
        >
          <Button v-if="currentQuestionIndex > 0" variant="outline" @click="$emit('goToPrevious')">
            <Icons.ChevronLeft class="mr-2 h-4 w-4" />
            Sebelumnya
          </Button>

          <div class="flex space-x-2">
            <Button
              v-if="currentQuestionIndex < sortedQuestionsLength - 1"
              :disabled="userAnswers[currentQuestion.id] === undefined"
              @click="$emit('goToNext')"
            >
              Selanjutnya
              <Icons.ChevronRight class="ml-2 h-4 w-4" />
            </Button>

            <Button
              v-if="currentQuestionIndex === sortedQuestionsLength - 1 && isQuizComplete"
              class="bg-green-600 hover:bg-green-700"
            >
              <Icons.BookCheck class="mr-2 h-4 w-4" />
              Tandai Selesai
            </Button>
          </div>
        </div>
      </CardFooter>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

import type { Question } from '@/types/question';

interface QuestionDisplayProps {
  sortedQuestionsLength: number;
  currentQuestionIndex: number;
  currentQuestion: Question;
  userAnswers: Record<number, number>;
  isQuizComplete: boolean;
}

const { sortedQuestionsLength, currentQuestionIndex, currentQuestion, userAnswers } =
  defineProps<QuestionDisplayProps>();

const emit = defineEmits<{
  selectAnswer: [questionId: number, choiceIndex: number];
  goToPrevious: [];
  goToNext: [];
}>();
</script>
