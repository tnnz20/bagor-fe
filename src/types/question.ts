import type { BaseModel } from '.';

export interface Choice extends BaseModel {
  id: number;
  questionId: number;
  text: string;
  scores: number;
}

export interface Question extends BaseModel {
  id: number;
  category: string;
  order: number;
  quiz: string;
  choices: Choice[];
}
