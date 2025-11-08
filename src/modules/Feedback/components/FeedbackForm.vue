<template>
  <Card>
    <CardHeader>
      <CardTitle>Bantu Kami Menjadi Lebih Baik</CardTitle>
      <CardDescription>
        Bagaimana pengalaman Anda menggunakan sistem ini? Kami ingin mendengar langsung dari Anda agar kami bisa
        memberikan layanan yang lebih baik lagi.
      </CardDescription>
    </CardHeader>
    <form @submit="onSubmit">
      <CardContent class="grid gap-6">
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="area">Kategori Saran</Label>
            <Select v-model="category" id="area">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Pilih Kategori Saran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="category in feedbackCategories" :key="category.value" :value="category.value">
                  {{ category.label }}
                </SelectItem>
              </SelectContent>
            </Select>
            <p v-if="errors.category" class="text-destructive text-sm">{{ errors.category }}</p>
          </div>
        </div>
        <div class="grid gap-2">
          <Label for="subjek">Subjek</Label>
          <Input id="subjek" v-model="subject" placeholder="Saran saya..." />
          <p v-if="errors.subject" class="text-destructive text-sm">{{ errors.subject }}</p>
        </div>
        <div class="grid gap-2">
          <Label for="description">Deskripsi</Label>
          <Textarea
            id="description"
            v-model="message"
            placeholder="Silakan sertakan semua informasi yang relevan dengan masalah Anda."
            class="h-[100px]"
          />
          <p v-if="errors.message" class="text-destructive text-sm">{{ errors.message }}</p>
        </div>
      </CardContent>
      <CardFooter class="mt-4 flex justify-end">
        <Button type="submit" :disabled="isPending">
          {{ isPending ? 'Mengirim...' : 'Kirim' }}
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createFeedback } from '../services/feedback';

import { feedbackCategories } from '@/types/feedback';
import type { FeedbackCategory, FeedbackSubmission } from '@/types/feedback';

const FEEDBACK_CATEGORIES = [
  'Tampilan & Desain',
  'Fitur & Fungsi',
  'Konten & Informasi',
  'Kinerja & Performa',
  'Keamanan & Privasi',
  'Saran Umum',
] as const;

// Zod validation schema
const formSchema = z.object({
  category: z.enum(FEEDBACK_CATEGORIES, {
    required_error: 'Kategori harus dipilih',
  }),
  subject: z.string().min(5, 'Subjek minimal 5 karakter').max(100, 'Subjek maksimal 100 karakter'),
  message: z.string().min(10, 'Deskripsi minimal 10 karakter').max(1000, 'Deskripsi maksimal 1000 karakter'),
});

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: toTypedSchema(formSchema),
});

// Define form fields
const [category] = defineField('category');
const [subject] = defineField('subject');
const [message] = defineField('message');

// Mutation for creating feedback
const { mutate: submitFeedback, isPending } = useMutation({
  mutationFn: (feedbackData: FeedbackSubmission) => createFeedback(feedbackData),
  onSuccess: () => {
    toast.success('Berhasil!', {
      description: 'Terima kasih atas saran Anda. Kami akan meninjaunya segera.',
    });
    resetForm();
  },
  onError: (error: any) => {
    console.error('Failed to submit feedback:', error);
    const errorMessage = error?.response?.data?.message || error?.message || 'Terjadi kesalahan saat mengirim saran.';
    toast.error('Gagal Mengirim Saran', {
      description: errorMessage,
    });
  },
});

// Form submission handler
const onSubmit = handleSubmit(values => {
  const feedbackData: FeedbackSubmission = {
    category: values.category as FeedbackCategory,
    subject: values.subject,
    message: values.message,
  };

  submitFeedback(feedbackData);
});
</script>
