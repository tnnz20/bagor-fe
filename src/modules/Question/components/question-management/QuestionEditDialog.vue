<template>
  <AlertDialog v-model:open="EditDialogModel">
    <AlertDialogContent class="max-h-[90vh] overflow-y-auto p-12 sm:max-w-[850px]">
      <AlertDialogHeader>
        <AlertDialogTitle>Edit Pertanyaan</AlertDialogTitle>
        <AlertDialogDescription> Perbarui pertanyaan beserta pilihan jawabannya </AlertDialogDescription>
      </AlertDialogHeader>

      <form @submit="onSubmit" class="space-y-6">
        <!-- Category -->
        <div class="space-y-2">
          <Label for="edit_category">Kategori</Label>
          <Input id="edit_category" v-model="category" placeholder="Contoh: Kesehatan, Pendidikan" />
          <p v-if="errors.category" class="text-sm text-red-500">{{ errors.category }}</p>
        </div>

        <!-- Question Text -->
        <div class="space-y-2">
          <Label for="edit_question_text">Pertanyaan</Label>
          <Textarea
            id="edit_question_text"
            v-model="question_text"
            placeholder="Masukkan pertanyaan..."
            rows="4"
            class="resize-none"
          />
          <p v-if="errors.question_text" class="text-sm text-red-500">{{ errors.question_text }}</p>
        </div>

        <!-- Choices -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <Label for="edit-choices-section">Pilihan Jawaban</Label>
            <Button type="button" variant="outline" size="sm" @click="addChoice">
              <Icons.Plus class="mr-2 h-4 w-4" />
              Tambah Jawaban
            </Button>
          </div>

          <div v-if="!choices || choices.length === 0" class="rounded-lg border border-dashed p-6 text-center">
            <p class="text-muted-foreground text-sm">
              Belum ada pilihan jawaban. Klik "Tambah Jawaban" untuk menambahkan.
            </p>
          </div>

          <div v-else class="space-y-3">
            <Card v-for="(choice, index) in choices" :key="index" class="relative">
              <CardContent class="p-4">
                <div class="flex items-start gap-3">
                  <div
                    class="border-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-medium"
                  >
                    {{ String.fromCharCode(65 + index) }}
                  </div>
                  <div class="flex-1 space-y-3">
                    <div class="space-y-2">
                      <Label :for="`edit_choice_text_${index}`">Teks Jawaban</Label>
                      <Input
                        :id="`edit_choice_text_${index}`"
                        v-model="choice.choice_text"
                        placeholder="Masukkan teks jawaban..."
                      />
                    </div>
                    <div class="space-y-2">
                      <Label :for="`edit_score_${index}`">Skor</Label>
                      <Input
                        :id="`edit_score_${index}`"
                        v-model.number="choice.score"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        class="shrink-0 cursor-pointer"
                        @click="removeChoice(index)"
                        :disabled="!choices || choices.length <= 2"
                      >
                        <Icons.Trash2 class="h-4 w-4 text-red-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Hapus pilihan jawaban</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </div>
          <p v-if="errors.choices" class="text-sm text-red-500">{{ errors.choices }}</p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel @click="resetToOriginal" class="cursor-pointer" :disabled="isPending">
            Batal
          </AlertDialogCancel>
          <Button type="submit" class="cursor-pointer" :disabled="isPending">
            <Icons.Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
            <Icons.Edit v-else class="mr-2 h-4 w-4" />
            {{ isPending ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </Button>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { watch } from 'vue';

import { QuestionSchema } from '@/schemes/question';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';

import { Icons } from '@/components/icons';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { updateQuestion } from '../../services/question';

import type { Question, QuestionCreation } from '@/types/question';

interface QuestionEditDialogProps {
  question?: Question | null;
}

const props = defineProps<QuestionEditDialogProps>();
const EditDialogModel = defineModel<boolean>('modelValue');
const queryClient = useQueryClient();

const { errors, handleSubmit, defineField, setValues } = useForm({
  validationSchema: QuestionSchema,
  initialValues: {
    category: '',
    question_text: '',
    choices: [
      { choice_text: '', score: 0 },
      { choice_text: '', score: 0 },
    ],
  },
});

const [category] = defineField('category');
const [question_text] = defineField('question_text');
const [choices] = defineField('choices');

// Watch for question prop changes and populate form
watch(
  () => props.question,
  newQuestion => {
    if (newQuestion) {
      setValues({
        category: newQuestion.category,
        question_text: newQuestion.question_text,
        choices: newQuestion.choices.map(choice => ({
          choice_text: choice.choice_text,
          score: choice.score,
        })),
      });
    }
  },
  { immediate: true }
);

// Mutation
const { mutate, isPending } = useMutation({
  mutationFn: ({ id, data }: { id: number; data: QuestionCreation }) => updateQuestion(id, data),
  onSuccess: () => {
    toast.success('Pertanyaan berhasil diperbarui!');
    queryClient.invalidateQueries({ queryKey: ['questions'] });
    EditDialogModel.value = false;
  },
  onError: (error: any) => {
    toast.error(error?.response?.data?.message || 'Gagal memperbarui pertanyaan');
  },
});

// Methods
const resetToOriginal = () => {
  if (props.question) {
    setValues({
      category: props.question.category,
      question_text: props.question.question_text,
      choices: props.question.choices.map(choice => ({
        choice_text: choice.choice_text,
        score: choice.score,
      })),
    });
  }
  EditDialogModel.value = false;
};

const addChoice = () => {
  if (Array.isArray(choices.value)) {
    choices.value.push({ choice_text: '', score: 0 });
  }
};

const removeChoice = (index: number) => {
  if (Array.isArray(choices.value) && choices.value.length > 2) {
    choices.value.splice(index, 1);
  }
};

const onSubmit = handleSubmit(values => {
  if (!props.question?.id) return;

  const questionData: QuestionCreation = {
    category: values.category,
    question_text: values.question_text,
    choices: values.choices,
  };

  mutate({ id: props.question.id, data: questionData });
});
</script>
