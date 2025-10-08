<template>
  <div class="bg-background relative flex w-full flex-1 flex-col space-y-6 p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Kuis Penilaian</h1>
        <p class="text-muted-foreground">Jawab semua pertanyaan dengan memilih jawaban yang paling tepat</p>
      </div>
      <div class="flex items-center space-x-4">
        <Button v-if="answeredQuestions.length == questions.length" class="bg-green-600 hover:bg-green-700">
          <Icons.BookCheck class="mr-2 h-4 w-4" />
          Tandai Selesai
        </Button>
        <div class="text-muted-foreground text-sm">
          <span class="font-medium">Progress:</span>
          {{ answeredQuestions.length }}/{{ questions.length }}
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <!-- Question Column (Left - 3/4 width) -->
      <div class="lg:col-span-3">
        <QuestionDisplay
          :current-question="currentQuestion"
          :current-question-index="currentQuestionIndex"
          :is-quiz-complete="isQuizComplete"
          :sorted-questions-lenght="sortedQuestions.length"
          :user-answers="userAnswers"
          @go-to-next="goToNext"
          @go-to-previous="goToPrevious"
          @select-answer="selectAnswer"
        />
      </div>

      <!-- Navigation Column (Right - 1/4 width) -->
      <div class="lg:col-span-1">
        <QuestionNavigation
          :current-question-index="currentQuestionIndex"
          :sorted-questions="sortedQuestions"
          :user-answers="userAnswers"
          @go-to-question="goToQuestion"
        />

        <!-- Quiz Info -->
        <QuestionInfo
          :sorted-questions-length="sortedQuestions.length"
          :answered-questions-length="answeredQuestions.length"
        />
      </div>
    </div>

    <!-- Results Modal -->
    <Dialog v-model:open="showResults">
      <DialogContent class="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle class="text-2xl">Hasil Kuis</DialogTitle>
          <DialogDescription> Anda telah menyelesaikan kuis dengan hasil sebagai berikut </DialogDescription>
        </DialogHeader>

        <div class="space-y-6">
          <!-- Score Summary -->
          <div class="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-6 text-center">
            <div class="mb-2 text-4xl font-bold text-green-600">{{ correctAnswers }}/{{ sortedQuestions.length }}</div>
            <div class="text-muted-foreground text-lg">
              Skor: {{ Math.round((correctAnswers / sortedQuestions.length) * 100) }}%
            </div>
            <Badge :variant="getScoreVariant()" class="mt-2 px-3 py-1 text-sm">
              {{ getScoreLabel() }}
            </Badge>
          </div>

          <!-- Question Results -->
          <div class="max-h-60 space-y-3 overflow-y-auto">
            <div
              v-for="(question, index) in sortedQuestions"
              :key="question.id"
              class="flex items-center space-x-3 rounded-lg border p-3"
              :class="{
                'border-green-200 bg-green-50': isAnswerCorrect(question.id),
                'border-red-200 bg-red-50': !isAnswerCorrect(question.id),
              }"
            >
              <div class="flex-shrink-0">
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium"
                  :class="{
                    'bg-green-500 text-white': isAnswerCorrect(question.id),
                    'bg-red-500 text-white': !isAnswerCorrect(question.id),
                  }"
                >
                  {{ index + 1 }}
                </div>
              </div>
              <div class="min-w-0 flex-1">
                <div class="mb-1 flex items-center space-x-2">
                  <Badge variant="outline" class="text-xs">{{ question.category }}</Badge>
                </div>
                <p class="truncate text-sm font-medium">{{ question.quiz }}</p>
                <p class="text-muted-foreground text-xs">
                  Jawaban Anda: {{ getAnswerLabel(userAnswers[question.id]) }}
                  <span v-if="!isAnswerCorrect(question.id)" class="text-red-600">
                    (Benar: {{ getCorrectAnswerLabel(question) }})
                  </span>
                </p>
              </div>
              <Icons.BookCheck v-if="isAnswerCorrect(question.id)" class="h-5 w-5 text-green-500" />
              <Icons.X v-else class="h-5 w-5 text-red-500" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" @click="resetQuiz">
            <Icons.RotateCw class="mr-2 h-4 w-4" />
            Ulangi Kuis
          </Button>
          <Button @click="showResults = false"> Tutup </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useLocalStorage } from '@vueuse/core';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import QuestionDisplay from '../components/QuestionDisplay.vue';
import QuestionInfo from '../components/QuestionInfo.vue';
import QuestionNavigation from '../components/QuestionNavigation.vue';
import { questions } from '../data/questions';

const route = useRoute();
const router = useRouter();
const localStorage = useLocalStorage('user-answers', {} as Record<number, number>);

const queryIndex = route.query.q ? parseInt(route.query.q as string) : 0;
// Quiz state
const currentQuestionIndex = ref(queryIndex);
// Initialize userAnswers from localStorage if exists, otherwise empty object
const userAnswers = ref<Record<number, number>>(localStorage.value || {});
const showResults = ref(false);

// Sort questions by order property
const sortedQuestions = computed(() => [...questions].sort((a, b) => a.order - b.order));

// Computed properties
const currentQuestion = computed(() => sortedQuestions.value[currentQuestionIndex.value]);

const answeredQuestions = computed(() => Object.keys(userAnswers.value).map(id => parseInt(id)));

const isQuizComplete = computed(() => answeredQuestions.value.length === sortedQuestions.value.length);

const correctAnswers = computed(() => {
  return sortedQuestions.value.reduce((count: number, question) => {
    const userAnswer = userAnswers.value[question.id];
    // Find the highest scoring choice as the correct answer
    const correctChoiceIndex = question.choices.reduce(
      (maxIndex, choice, index) => (choice.scores > question.choices[maxIndex].scores ? index : maxIndex),
      0
    );
    return userAnswer === correctChoiceIndex ? count + 1 : count;
  }, 0);
});

// Methods
const selectAnswer = (questionId: number, answerIndex: number) => {
  userAnswers.value[questionId] = answerIndex;
  localStorage.value = userAnswers.value;
};

const goToQuestion = (index: number) => {
  currentQuestionIndex.value = index;
  router.push({ query: { q: index.toString() } });
};

const goToNext = () => {
  if (currentQuestionIndex.value < sortedQuestions.value.length - 1) {
    currentQuestionIndex.value++;
    router.push({ query: { q: currentQuestionIndex.value.toString() } });
  }
};

const goToPrevious = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    router.push({ query: { q: currentQuestionIndex.value.toString() } });
  }
};

const isAnswerCorrect = (questionId: number) => {
  const question = sortedQuestions.value.find(q => q.id === questionId);
  if (!question) return false;
  // Find the highest scoring choice as the correct answer
  const correctChoiceIndex = question.choices.reduce(
    (maxIndex, choice, index) => (choice.scores > question.choices[maxIndex].scores ? index : maxIndex),
    0
  );
  return userAnswers.value[questionId] === correctChoiceIndex;
};

const getAnswerLabel = (answerIndex: number) => {
  return String.fromCharCode(65 + answerIndex); // A, B, C, D
};

const getCorrectAnswerLabel = (question: any) => {
  const correctChoiceIndex = question.choices.reduce(
    (maxIndex: number, choice: any, index: number) =>
      choice.scores > question.choices[maxIndex].scores ? index : maxIndex,
    0
  );
  return String.fromCharCode(65 + correctChoiceIndex);
};

const getScoreVariant = () => {
  const percentage = (correctAnswers.value / sortedQuestions.value.length) * 100;
  if (percentage >= 80) return 'default';
  if (percentage >= 60) return 'secondary';
  return 'destructive';
};

const getScoreLabel = () => {
  const percentage = (correctAnswers.value / sortedQuestions.value.length) * 100;
  if (percentage >= 80) return 'Excellent';
  if (percentage >= 60) return 'Good';
  if (percentage >= 40) return 'Fair';
  return 'Poor';
};

const resetQuiz = () => {
  currentQuestionIndex.value = 0;
  userAnswers.value = {};
  localStorage.value = {};
  showResults.value = false;
};
</script>
