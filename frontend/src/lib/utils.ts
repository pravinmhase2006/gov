import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined, fallback = 'TBA'): string {
  if (!date) return fallback;
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return fallback;
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(d);
  } catch {
    return fallback;
  }
}

export function formatTimeRemaining(endDateStr: string | null | undefined): string {
  if (!endDateStr) return '';
  const end = new Date(endDateStr).getTime();
  const now = Date.now();
  const diffMs = end - now;
  if (diffMs <= 0) return 'Expired';
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
  return `${hours} hour${hours > 1 ? 's' : ''} left`;
}

export function truncate(str: string, length = 100): string {
  if (!str || str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}
