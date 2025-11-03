import type { BaseModel } from '.';
import type { Department, EmployeeType } from './employee';

// User roles enum for better type safety
export type UserRole = 'admin' | 'manager' | 'employee';

export interface User {
  Id: string;
  Email: string;
  Username: string;
  Role: string;
  IsActive: boolean;
  CreatedAt: number;
  UpdatedAt: number;
  IsDeleted: boolean;
}

// Main User interface
export interface UserDetail extends BaseModel {
  id: number;
  firstName: string;
  lastName: string;
  name?: string; // Computed from firstName + lastName
  email: string;
  role: UserRole;
  position?: string;
  department: Department;
  employeeType?: EmployeeType;
  isActive: boolean;
  avatar?: string;
}

export interface UserProfile extends UserDetail {
  nip?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
  gender?: string;
}

// User form interface for creating/editing users
export interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  department: Department;
  position?: string;
  employeeType?: EmployeeType;
  isActive: boolean;
}

// User statistics interface
export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  newUsersThisMonth: number;
}
