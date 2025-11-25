import type { BaseModel } from '.';

// Feedback Category Type
export type FeedbackCategory =
  | 'Tampilan & Desain'
  | 'Fitur & Fungsi'
  | 'Konten & Informasi'
  | 'Kinerja & Performa'
  | 'Keamanan & Privasi'
  | 'Saran Umum';

// Type-safe category options for selects
export const feedbackCategories: { value: FeedbackCategory; label: string }[] = [
  { value: 'Tampilan & Desain', label: 'Tampilan & Desain' },
  { value: 'Fitur & Fungsi', label: 'Fitur & Fungsi' },
  { value: 'Konten & Informasi', label: 'Konten & Informasi' },
  { value: 'Kinerja & Performa', label: 'Kinerja & Performa' },
  { value: 'Keamanan & Privasi', label: 'Keamanan & Privasi' },
  { value: 'Saran Umum', label: 'Saran Umum' },
] as const;

export interface FeedbackSubmission {
  category: FeedbackCategory;
  subject: string;
  message: string;
}

export interface Feedback extends BaseModel {
  id: string;
  user_id: string;
  sender_name: string;
  category: FeedbackCategory;
  subject: string;
  message: string;
  is_read: boolean;
}
