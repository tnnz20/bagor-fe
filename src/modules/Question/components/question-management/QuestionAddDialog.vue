<template>
  <Dialog v-model:open="AddDialogModel">
    <DialogContent class="max-h-[90vh] overflow-y-auto p-12 sm:max-w-[850px]">
      <DialogHeader>
        <DialogTitle>Tambah Pertanyaan Baru</DialogTitle>
        <DialogDescription> Tambahkan pertanyaan baru beserta pilihan jawabannya </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit" class="space-y-6">
        <!-- Category -->
        <div class="space-y-2">
          <Label for="category">Kategori</Label>
          <Input id="category" v-model="category" placeholder="Contoh: Kesehatan, Pendidikan" />
          <p v-if="errors.category" class="text-sm text-red-500">{{ errors.category }}</p>
        </div>

        <!-- Question Text -->
        <div class="space-y-2">
          <Label for="question_text">Pertanyaan</Label>
          <Textarea
            id="question_text"
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
            <Label for="choices-section">Pilihan Jawaban</Label>
            <Button class="cursor-pointer" type="button" variant="outline" size="sm" @click="addChoice">
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
                      <Label :for="`choice_text_${index}`">Teks Jawaban</Label>
                      <Input
                        :id="`choice_text_${index}`"
                        v-model="choice.choice_text"
                        placeholder="Masukkan teks jawaban..."
                      />
                    </div>
                    <div class="space-y-2">
                      <Label :for="`score_${index}`">Skor</Label>
                      <Input
                        :id="`score_${index}`"
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

        <DialogFooter>
          <Button
            type="button"
            class="cursor-pointer"
            variant="outline"
            @click="AddDialogModel = false"
            :disabled="isPending"
          >
            Batal
          </Button>
          <Button type="submit" class="cursor-pointer" :disabled="isPending">
            <Icons.Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
            <Icons.Plus v-else class="mr-2 h-4 w-4" />
            {{ isPending ? 'Menyimpan...' : 'Simpan' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { QuestionSchema } from '@/schemes/question';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';

import { Icons } from '@/components/icons';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { createQuestion } from '../../services/question';

import type { QuestionCreation } from '@/types/question';

const AddDialogModel = defineModel<boolean>('modelValue');
const queryClient = useQueryClient();

const { errors, handleSubmit, defineField, resetForm } = useForm({
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

// Mutation
const { mutate, isPending } = useMutation({
  mutationFn: createQuestion,
  onSuccess: () => {
    toast.success('Pertanyaan berhasil ditambahkan!');
    queryClient.invalidateQueries({ queryKey: ['questions'] });
    resetForm();
    AddDialogModel.value = false;
  },
  onError: (error: any) => {
    toast.error(error?.response?.data?.message || 'Gagal menambahkan pertanyaan');
  },
});

// Methods
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
  const questionData: QuestionCreation = {
    category: values.category,
    question_text: values.question_text,
    choices: values.choices,
  };
  mutate(questionData);
});
</script>
