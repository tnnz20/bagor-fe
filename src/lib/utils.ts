import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to format timestamp to Indonesian date format
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Helper function to generate initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getRoleDefaultRoute = (role: string): string => {
  const roleRoutes: Record<string, string> = {
    admin: '/dashboard', // Admin goes to dashboard home
    manager: '/pegawai', // Manager goes to data pegawai
    director: '/pegawai', // Director goes to data pegawai
    employee: '/saran', // Employee goes to saran
  };

  return roleRoutes[role];
};

export const getCurrentPeriod = () => {
  const today = new Date();
  const currentMonth = today.getMonth(); // Returns 0-11

  return {
    year: today.getFullYear(),
    // Logic from your screenshot:
    // Jan-June (0-5) = 1, July-Dec (6-11) = 2
    quarter: currentMonth <= 5 ? 1 : 2,
  };
};

// Helper function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
