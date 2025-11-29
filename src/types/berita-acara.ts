export interface BeritaAcara {
  id: number;
  title: string;
  description: string;
  mime_type: string;
  file_name: string;
  size: number; // size in bytes
  created_at: number;
}

export type BeritaAcaraPayload = {
  title: string;
  description: string;
  file: File; // assuming file is uploaded as a File object
};
