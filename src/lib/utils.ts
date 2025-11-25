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
    employee: '/saran', // Employee goes to saran
  };

  return roleRoutes[role] || '/saran'; // Default fallback
};
