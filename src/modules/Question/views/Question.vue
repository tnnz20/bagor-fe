<template>
  <div class="bg-background relative flex w-full flex-1 flex-col space-y-6 p-6">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex min-h-96 w-full items-center justify-center">
      <div class="flex flex-col items-center gap-2">
        <Icons.Loader2 class="text-primary h-16 w-16 animate-spin" />
        <p class="text-muted-foreground">Memuat pertanyaan...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="hasError" class="flex h-96 w-full flex-col items-center justify-center space-y-4">
      <Icons.AlertCircle class="text-destructive h-16 w-16" />
      <div class="text-center">
        <h2 class="text-xl font-semibold">Gagal Memuat Data</h2>
        <p class="text-muted-foreground mt-2">{{ errorMessage }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <template v-else>
      <!-- Header Section -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Kuis Penilaian</h1>
          <p class="text-muted-foreground">Jawab semua pertanyaan dengan memilih jawaban yang paling tepat</p>
        </div>
        <div class="flex items-center space-x-4">
          <Button
            v-if="answeredQuestions.length == sortedQuestions.length"
            class="cursor-pointer bg-green-600 hover:bg-green-700"
            @click="showResults = true"
          >
            <Icons.BookCheck class="mr-2 h-4 w-4" />
            Tandai Selesai
          </Button>
          <div class="text-muted-foreground text-sm">
            <span class="font-medium">Progress:</span>
            {{ answeredQuestions.length }}/{{ sortedQuestions.length }}
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
            :sorted-questions-length="sortedQuestions.length"
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
    </template>

    <!-- Results Modal -->
    <QuestionResultDialog
      v-model="showResults"
      :questions="sortedQuestions"
      :user-answers="userAnswers"
      @reset="resetQuiz"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { useLocalStorage } from '@vueuse/core';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import QuestionDisplay from '../components/QuestionDisplay.vue';
import QuestionInfo from '../components/QuestionInfo.vue';
import QuestionNavigation from '../components/QuestionNavigation.vue';
import QuestionResultDialog from '../components/QuestionResultDialog.vue';
import { getQuestionList } from '../services/question';

const route = useRoute();
const router = useRouter();
const localStorage = useLocalStorage('user-answers', {} as Record<number, number>);

const queryIndex = route.query.q ? Number.parseInt(route.query.q as string) : 0;
// Quiz state
const currentQuestionIndex = ref(queryIndex);

// Initialize userAnswers from localStorage if exists, otherwise empty object
const userAnswers = ref<Record<number, number>>(localStorage.value || {});
const showResults = ref(false);

// Fetch Questions
const { data, isLoading, error } = useQuery({
  queryKey: computed(() => ['questions']),
  queryFn: () => getQuestionList(),
  placeholderData: keepPreviousData,
  retry: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
});

const hasError = computed(() => {
  const err = error.value as any;
  if (err?.response?.status === 404) {
    return false;
  }
  return !!error.value;
});

const errorMessage = computed(() => {
  if (!error.value) return '';

  const err = error.value as any;
  const messages: Record<number, string> = {
    400: 'Permintaan tidak valid',
    500: 'Server error. Silahkan coba lagi nanti.',
  };

  return messages[err.response?.status] || err.message || 'Terjadi kesalahan';
});

// Computed properties
const sortedQuestions = computed(() => {
  if (!data.value?.data) return [];
  return data.value.data;
});

const currentQuestion = computed(() => sortedQuestions.value[currentQuestionIndex.value]);

const answeredQuestions = computed(() => Object.keys(userAnswers.value).map(id => Number.parseInt(id)));

const isQuizComplete = computed(() => answeredQuestions.value.length === sortedQuestions.value.length);

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

const resetQuiz = () => {
  currentQuestionIndex.value = 0;
  userAnswers.value = {};
  localStorage.value = {};
  showResults.value = false;
};
</script>
