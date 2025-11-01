import type { Component } from 'vue';

import type { UserRole } from './user';

// Base model with common fields
export interface BaseModel {
  deleted_at?: number | null;
  created_at: number;
  updated_at: number;
}

//  Menu link type
export interface MenuItem {
  title: string;
  href?: string;
  icon?: string | Component;
  role: UserRole[];
  description?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}
