import type { BaseModel } from '@/types';

export interface Feedback extends BaseModel {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
}
