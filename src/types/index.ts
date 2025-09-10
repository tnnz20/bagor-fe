import type { Component } from 'vue';

// Base model with common fields
export interface BaseModel {
  isDelete?: boolean;
  created_at: string;
  updated_at: string;
}

//  Menu link type
export interface MenuItem {
  title: string;
  href?: string;
  icon?: string | Component;
  description?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}
