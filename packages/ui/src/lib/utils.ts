import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a locale string.
 */
export function formatDate(
  date: string | Date,
  locales?: string | string[],
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locales, options);
}

export const formatDateLegacy = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  // More robust date parsing could be added here if needed
  if (isNaN(dateObj.getTime())) {
    // Handle invalid date string if necessary, or return original string
    return typeof date === 'string' ? date : 'Invalid Date'; 
  }
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
