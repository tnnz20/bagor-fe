import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod';

export const QuestionSchema = toTypedSchema(
  z.object({
    category: z.string().min(3, 'Kategori harus diisi').max(50, 'Kategori maksimal 50 karakter'),
    question_text: z.string().min(10, 'Pertanyaan minimal 10 karakter').max(500, 'Pertanyaan maksimal 500 karakter'),
    choices: z
      .array(
        z.object({
          choice_text: z.string().min(2, 'Teks jawaban harus diisi'),
          score: z.number().min(0, 'Skor wajib positif').max(100, 'Skor maksimal 100'),
        })
      )
      .min(2, 'Minimal harus ada 2 pilihan jawaban')
      .max(5, 'Maksimal 5 pilihan jawaban'),
  })
);
