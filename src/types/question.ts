import type { BaseModel } from '.';

export interface QuestionCreation {
  category: string;
  question_text: string;
  display_order: number;
  choices: {
    choice_text: string;
    score: number;
  }[];
}

export interface Choice extends BaseModel {
  id: number;
  question_id: number;
  choice_text: string;
  score: number;
}

export interface Question extends BaseModel {
  id: number;
  category: string;
  question_text: string;
  display_order: number;
  choices: Choice[];
}
