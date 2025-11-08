import type { Component } from 'vue';

import type { UserRole } from './user';

// Base model with common fields
export interface BaseModel {
  deleted_at?: number | null;
  created_at: number;
  updated_at: number;
  is_deleted?: boolean;
}

export type BaseApi<T = undefined> = T extends undefined
  ? { code: number; message: string }
  : { code: number; message: string; data?: T | null };

//  Menu link type
export interface MenuItem {
  title: string;
  href?: string;
  icon?: string | Component;
  role: UserRole[];
  description?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total_rows?: number;
  total_pages?: number;
}
