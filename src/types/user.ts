import type { BaseModel, PaginationMeta } from '.';
import type { Department, EmployeeDetail, EmployeeType } from './employee';

// User roles enum
export type UserRole = 'admin' | 'manager' | 'employee';

// User Form
export interface UserCredential {
  username: string;
  password: string;
}

export interface UserRegistration {
  username: string;
  email?: string;
  password: string;
  full_name: string;
  role: UserRole;
  position: string;
  department_code: string;
  employee_type: EmployeeType;
}

// User Model
export interface User extends BaseModel {
  Id: string;
  email: string;
  username: string;
  name: string;
  Role: string;
  is_active: boolean;
}

// Main User interface
export interface UserDetail extends BaseModel {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  is_active: boolean;
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
