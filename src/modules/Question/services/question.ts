import ApiClient from '@/api/axios';
import type { BaseApi } from '@/types';

import type { Question, QuestionCreation } from '@/types/question';

export const createQuestion = async (questionData: QuestionCreation) => {
  const res = await ApiClient.post<BaseApi>('/questions', questionData);
  return res.data;
};

export const getQuestionList = async (): Promise<BaseApi<Question[]>> => {
  const res = await ApiClient.get<BaseApi<Question[]>>('/questions');
  return res.data;
};

export const deleteQuestion = async (questionId: number) => {
  const res = await ApiClient.delete<BaseApi>(`/questions/${questionId}`);
  return res.data;
};

export const updateQuestion = async (questionId: number, questionData: QuestionCreation) => {
  const res = await ApiClient.put<BaseApi>(`/questions/${questionId}`, questionData);
  return res.data;
};
