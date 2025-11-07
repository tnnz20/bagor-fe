import type { BaseModel, PaginationMeta } from '.';
import type { Department, EmployeeType } from './employee';

// User roles enum for better type safety
export type UserRole = 'admin' | 'manager' | 'employee';

export interface UserCredential {
  username: string;
  password: string;
}

export interface User {
  Id: string;
  email: string;
  username: string;
  name: string;
  Role: string;
  IsActive: boolean;
  CreatedAt: number;
  UpdatedAt: number;
  IsDeleted: boolean;
}

// Main User interface
export interface UserDetail extends BaseModel {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  is_active: boolean;
  created_at: number;
  updated_at: number;
  is_deleted: boolean;
  profile: UserProfile;
  employee_detail: EmployeeDetail;
}

export interface UserProfile {
  full_name: string;
  phone: string;
  gender: string;
  birth_date: number;
  address: string;
  profile_created_at: number;
  profile_updated_at: number;
}

// Employee detail type
export interface EmployeeDetail {
  nip: string;
  department_code: string;
  department: string;
  position: string;
  employee_type: string;
  employee_created_at: number;
  employee_updated_at: number;
}

export interface UserListResponseWithPagination extends PaginationMeta {
  users: UserDetail[];
}

export interface UserTableColumn extends BaseModel {
  id: string;
  name: string;
  department: Department;
  position: string;
  employeeType: EmployeeType;
  role: UserRole;
}

export interface FilterUsers {
  department: string;
  employeeType: string;
  role: string;
  search: string;
}

// User statistics interface
export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  newUsersThisMonth: number;
}
