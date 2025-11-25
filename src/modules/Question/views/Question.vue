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
    <div v-else-if="isError" class="flex h-96 w-full flex-col items-center justify-center space-y-4">
      <Icons.AlertCircle class="text-destructive h-16 w-16" />
      <div class="text-center">
        <h2 class="text-xl font-semibold">Gagal Memuat Data</h2>
        <p class="text-muted-foreground mt-2">{{ errorMessage }}</p>
      </div>
      <Button variant="outline" @click="refetch" class="mt-4 cursor-pointer">
        <Icons.RefreshCcw class="mr-2 h-4 w-4" />
        Coba Lagi
      </Button>
    </div>

    <!-- Empty State -->
    <div v-else-if="questions.length === 0" class="flex h-96 w-full flex-col items-center justify-center space-y-4">
      <Icons.FileQuestion class="text-muted-foreground h-16 w-16" />
      <div class="text-center">
        <h2 class="text-xl font-semibold">Tidak Ada Pertanyaan</h2>
        <p class="text-muted-foreground mt-2">Belum ada pertanyaan yang tersedia saat ini.</p>
      </div>
      <Button variant="outline" @click="router.push('/')" class="mt-4 cursor-pointer">
        <Icons.ArrowLeft class="mr-2 h-4 w-4" />
        Kembali ke Beranda
      </Button>
    </div>

    <!-- Quiz Content -->
    <template v-else>
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Kuis Penilaian</h1>
          <p class="text-muted-foreground">Jawab semua pertanyaan dengan memilih jawaban yang paling tepat</p>
        </div>
        <div class="flex items-center space-x-4">
          <Button
            v-if="isQuizComplete"
            class="cursor-pointer bg-green-600 hover:bg-green-700"
            @click="showResults = true"
          >
            <Icons.BookCheck class="mr-2 h-4 w-4" />
            Tandai Selesai
          </Button>
          <div class="text-muted-foreground text-sm">
            <span class="font-medium">Progress:</span>
            {{ answeredQuestionsCount }}/{{ questions.length }}
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div class="lg:col-span-3">
          <QuestionDisplay
            :current-question="currentQuestion"
            :current-question-index="currentQuestionIndex"
            :is-quiz-complete="isQuizComplete"
            :sorted-questions-length="questions.length"
            :user-answers="userAnswers"
            @go-to-next="goToNext"
            @go-to-previous="goToPrevious"
            @select-answer="selectAnswer"
          />
        </div>

        <div class="lg:col-span-1">
          <QuestionNavigation
            :current-question-index="currentQuestionIndex"
            :sorted-questions="questions"
            :user-answers="userAnswers"
            @go-to-question="goToQuestion"
          />

          <QuestionInfo
            :sorted-questions-length="questions.length"
            :answered-questions-length="answeredQuestionsCount"
          />
        </div>
      </div>
    </template>

    <QuestionResultDialog
      v-model="showResults"
      :questions="questions"
      :user-answers="userAnswers"
      :slug="slugParam"
      :is-submitting="isSubmitting"
      @reset="resetQuiz"
      @submit="handleSubmitQuiz"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { ERROR_MESSAGES } from '@/constants';
import type { BaseError } from '@/types';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useLocalStorage } from '@vueuse/core';
import { toast } from 'vue-sonner';

import { updateScore } from '@/modules/Employee/services/employee';
import { GetScoringStatus, MarkScoringAsComplete } from '@/modules/Employee/services/scoring';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import QuestionDisplay from '../components/QuestionDisplay.vue';
import QuestionInfo from '../components/QuestionInfo.vue';
import QuestionNavigation from '../components/QuestionNavigation.vue';
import QuestionResultDialog from '../components/QuestionResultDialog.vue';
import { getQuestionList } from '../services/question';

const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();

// --- State ---
const slugParam = route.params.slug_param as string;
const localStorage = useLocalStorage('user-answers', {} as Record<number, number>);
const userAnswers = ref<Record<number, number>>(localStorage.value || {});
const showResults = ref(false);

// --- Query ---
const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['questions'],
  queryFn: () => getQuestionList(),
  placeholderData: keepPreviousData,
  retry: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
});

// --- Computed Props ---
const currentQuestionIndex = computed(() => {
  const q = route.query.q;
  return q ? Number.parseInt(q as string) : 0;
});

const questions = computed(() => data.value?.data || []);

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

const answeredQuestionsCount = computed(() => Object.keys(userAnswers.value).length);

const isQuizComplete = computed(() => {
  return questions.value.length > 0 && answeredQuestionsCount.value === questions.value.length;
});

const errorMessage = computed(() => {
  if (!error.value) return '';

  const err = error.value as BaseError;
  const status = err.response?.status;
  const dataCode = err.response?.data?.code;
  return (
    (status && ERROR_MESSAGES[status]) ||
    (dataCode && ERROR_MESSAGES[dataCode]) ||
    err.message ||
    'Terjadi kesalahan pada server.'
  );
});

// --- Actions ---

const updateRoute = (index: number) => {
  router.push({ query: { ...route.query, q: index.toString() } });
};

const selectAnswer = (questionId: number, answerIndex: number) => {
  userAnswers.value[questionId] = answerIndex;
  localStorage.value = userAnswers.value;
};

const goToQuestion = (index: number) => {
  updateRoute(index);
};

const goToNext = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    updateRoute(currentQuestionIndex.value + 1);
  }
};

const goToPrevious = () => {
  if (currentQuestionIndex.value > 0) {
    updateRoute(currentQuestionIndex.value - 1);
  }
};

const resetQuiz = () => {
  updateRoute(0);
  userAnswers.value = {};
  localStorage.value = {};
  showResults.value = false;
};

// --- Mutation ---

const { mutate: submitQuiz, isPending: isSubmitting } = useMutation({
  mutationFn: async ({ percentage }: { percentage: number }) => {
    if (!slugParam) throw new Error('Parameter slug tidak ditemukan');

    const scoringStatus = await GetScoringStatus(slugParam);
    if (!scoringStatus.data) throw new Error('Data scoring tidak ditemukan');

    const { user_id, year, quarter } = scoringStatus.data;

    await updateScore(user_id, {
      survey_score: percentage,
      year,
      quarter,
    });

    await MarkScoringAsComplete(slugParam);
    return { success: true };
  },
  onSuccess: () => {
    showResults.value = false;
    localStorage.value = {};
    queryClient.invalidateQueries({ queryKey: ['score'] });
    toast.success('Penilaian berhasil disimpan');

    setTimeout(() => {
      router.push('/pegawai');
    }, 500);
  },
  onError: (err: BaseError) => {
    console.error('Failed to submit quiz:', err);
    const errRes = err.response?.data;
    const errorMessage = errRes?.error?.error_description || 'Terjadi kesalahan saat menyimpan penilaian.';
    toast.error('Gagal Menyimpan Penilaian', {
      description: errorMessage,
    });
  },
});

const handleSubmitQuiz = (_slug: string, percentage: number) => {
  submitQuiz({ percentage });
};
</script>
