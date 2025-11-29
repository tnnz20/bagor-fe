import type { Component } from 'vue';

import type { UserRole } from './user';

// Base model with common fields
export interface BaseModel {
  created_at: number;
  updated_at: number;
  is_deleted?: boolean;
}

export type BaseApi<T = undefined> = T extends undefined
  ? { code: number; message: string }
  : { code: number; message: string; data?: T | null; pagination?: PaginationMeta };

export interface BaseError extends Error {
  response?: {
    status: number;
    data: ErrorResponse;
  };
}

export type ErrorResponse = {
  code: number;
  error: ErrorMessage;
};

export type ErrorMessage = {
  error_name: string;
  error_description: string;
};

//  Menu link type
export interface MenuItem {
  title: string;
  href?: string;
  icon?: string | Component;
  role?: UserRole[];
  description?: string;
}

export interface PaginationMeta {
  current_page: number;
  limit: number;
  total_rows?: number;
  total_pages?: number;
}
