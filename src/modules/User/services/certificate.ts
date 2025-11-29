import ApiClient from '@/api/axios';

import type { Document } from '@/types/document';
import type { BaseApi } from '@/types/index';

// Get certificates of the current logged-in user
export const getMyCertificates = async (): Promise<BaseApi<Document[]>> => {
  const res = await ApiClient.get<BaseApi<Document[]>>(`documents/certificates/me`);
  return res.data;
};

export const uploadUserCertificate = async (formData: FormData): Promise<BaseApi> => {
  const res = await ApiClient.post<BaseApi>(`/documents/certificates`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const deleteUserCertificate = async (certificateId: number): Promise<BaseApi> => {
  const res = await ApiClient.delete<BaseApi>(`/documents/certificates/${certificateId}`);
  return res.data;
};

export const downloadUserCertificate = async (certificateId: number): Promise<Blob> => {
  const res = await ApiClient.get<Blob>(`/documents/certificates/${certificateId}/download`, {
    responseType: 'blob',
  });
  return res.data;
};
