export interface Document {
  id: number;
  title: string;
  user_id?: string;
  description: string;
  mime_type: string;
  file_name: string;
  size: number; // size in bytes
  created_at: number;
}

export type DocumentPayload = {
  title: string;
  description: string;
  file: File; // assuming file is uploaded as a File object
};
