import ApiClient from '@/api/axios';
import type { BaseApi } from '@/types';

import type { Document } from '@/types/document';

export const getBeritaAcaraList = async (): Promise<BaseApi<Document[]>> => {
  const res = await ApiClient.get<BaseApi<Document[]>>('documents/berita-acara');
  return res.data;
};

export const uploadBeritaAcara = async (formData: FormData): Promise<BaseApi> => {
  const res = await ApiClient.post<BaseApi>('documents/berita-acara', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const deleteBeritaAcara = async (id: number): Promise<BaseApi> => {
  const res = await ApiClient.delete<BaseApi>(`documents/berita-acara/${id}`);
  return res.data;
};

export const downloadBeritaAcara = async (id: number): Promise<Blob> => {
  const res = await ApiClient.get<Blob>(`documents/berita-acara/${id}/download`, {
    responseType: 'blob',
  });
  return res.data;
};
