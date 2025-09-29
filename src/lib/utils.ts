import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to format timestamp to Indonesian date format
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Helper function to generate initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n: string) => n[0])
    .join('');
};
