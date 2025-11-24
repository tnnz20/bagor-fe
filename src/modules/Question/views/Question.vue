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
      <Button variant="outline" @click="refetch" class="mt-4 cursor-pointer">
        <Icons.RefreshCcw class="mr-2 h-4 w-4" />
        Coba Lagi
      </Button>
    </div>

    <!-- No Questions Found State -->
    <div
      v-else-if="!isLoading && sortedQuestions.length === 0"
      class="flex h-96 w-full flex-col items-center justify-center space-y-4"
    >
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
const localStorage = useLocalStorage('user-answers', {} as Record<number, number>);

const queryIndex = route.query.q ? Number.parseInt(route.query.q as string) : 0;
const slugParam = route.params.slug_param as string;

// Quiz state
const currentQuestionIndex = ref(queryIndex);

// Initialize userAnswers from localStorage if exists, otherwise empty object
const userAnswers = ref<Record<number, number>>(localStorage.value || {});
const showResults = ref(false);

// Fetch Questions
const { data, isLoading, error, refetch } = useQuery({
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
  // Don't treat 404 as error if we want to show "no questions" state
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
    401: 'Anda tidak memiliki akses untuk melihat pertanyaan ini',
    403: 'Akses ditolak',
    404: 'Pertanyaan tidak ditemukan',
    500: 'Server error. Silahkan coba lagi nanti.',
    503: 'Layanan sedang tidak tersedia',
  };

  return messages[err.response?.status] || err.message || 'Terjadi kesalahan yang tidak diketahui';
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

// Submit quiz mutation
const { mutate: submitQuiz, isPending: isSubmitting } = useMutation({
  mutationFn: async ({ percentage }: { percentage: number }) => {
    const scoringStatus = await GetScoringStatus(slugParam);

    if (!scoringStatus.data) {
      throw new Error('Data scoring tidak ditemukan');
    }

    if (!slugParam) {
      throw new Error('Parameter slug tidak ditemukan');
    }

    const { user_id, year, quarter } = scoringStatus.data;

    // Step 2: Update score with survey_score
    await updateScore(user_id, {
      survey_score: percentage,
      year,
      quarter,
    });

    // Step 3: Mark scoring as complete
    await MarkScoringAsComplete(slugParam);

    return { success: true };
  },
  onSuccess: () => {
    // Close the dialog first
    showResults.value = false;

    // Clear user answers from localStorage
    localStorage.value = {};

    // Invalidate employee scores query to refetch updated data
    queryClient.invalidateQueries({ queryKey: ['score'], exact: false });

    toast.success('Penilaian berhasil disimpan');

    // Delay navigation to allow toast to be visible and dialog to close
    setTimeout(() => {
      router.push('/pegawai');
    }, 500);
  },
  onError: (error: any) => {
    console.error('Submit quiz error:', error);
    toast.error(error.message || 'Gagal menyimpan penilaian');
  },
});

const handleSubmitQuiz = (_slug: string, percentage: number) => {
  console.log('handleSubmitQuiz called', { slug: _slug, percentage });
  submitQuiz({ percentage });
};
</script>
